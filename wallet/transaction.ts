import {ChainUtil} from "../chain-util";
import {Wallet} from "./index";
import {ec} from "elliptic";
import {MINING_REWARD} from "../config";
export interface IOutput{
    amount:number,
    address:string
}
interface IInput{
    timestamp:number,
    amount:number,
    address:string,
    signature:ec.Signature
}
interface ITransaction{
    id:string,
    input:IInput,
    output:IOutput
}
export class Transaction{
    id:string
    input: IInput|null
    outputs:IOutput[]
    constructor() {
        this.id=ChainUtil.id()
        this.input= null
        this.outputs=[]
    }
    public update(senderWallet:Wallet,recipient:string,amount:number):Transaction|undefined{
        const senderOutput=<IOutput>this.outputs.find(output=>output.address===senderWallet.publicKey)
        if(amount>senderOutput.amount){
            console.log(`Amount:${amount} exceeds balance.`)
            return
        }
        senderOutput.amount=senderOutput.amount-amount
        this.outputs.push({amount, address: recipient})
        Transaction.signTransaction(this,senderWallet)
        return this
    }
    public static transactionWithOutputs(senderWallet:Wallet,outputs:IOutput[]):Transaction{
        const transaction=new this()
        transaction.outputs.push(...outputs)
        Transaction.signTransaction(transaction,senderWallet)
        return transaction
    }
    public static newTransaction(senderWallet:Wallet,recipient:string,amount:number):Transaction|undefined{
        // const transaction=new this()
        if(amount>senderWallet.balance){
            console.log(`Amount:${amount} exceeds balance.`)
            return
        }
        // transaction.outputs.push(...[
        //     {amount:senderWallet.balance-amount,address:senderWallet.publicKey},
        //     {amount,address: recipient}
        // ])
        // Transaction.signTransaction(transaction,senderWallet)
        // return transaction
        return Transaction.transactionWithOutputs(senderWallet,[
            {amount:senderWallet.balance-amount,address:senderWallet.publicKey},
            {amount,address: recipient}
        ])
    }
    public static rewardTransaction(minerWallet:Wallet,blockchainWallet:Wallet){
        return Transaction.transactionWithOutputs(blockchainWallet,[{
            amount:MINING_REWARD,address:minerWallet.publicKey
        }])
    }
    public static signTransaction(transaction:Transaction,senderWallet:Wallet):void{
        transaction.input={
            timestamp:Date.now(),
            amount:senderWallet.balance,
            address:senderWallet.publicKey,
            signature:senderWallet.sign(ChainUtil.hash(transaction.outputs))
        }
    }
    public static verifyTransaction(transaction:Transaction):boolean{
        return ChainUtil.verifySignature(
            transaction.input?.address as string,
            transaction.input?.signature as ec.Signature,
            ChainUtil.hash(transaction.outputs)
        )
    }
}