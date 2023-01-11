import {ChainUtil} from "../chain-util";
import {Wallet} from "./index";
import {ec} from "elliptic";
export interface Output{
    amount:number,
    address:string
}
interface Input{
    timestamp:number,
    amount:number,
    address:string,
    signature:ec.Signature
}
export class Transaction{
    id:string
    input: Input|null
    outputs:Output[]
    constructor() {
        this.id=ChainUtil.id()
        this.input= null
        this.outputs=[]
    }
    public update(senderWallet:Wallet,recipient:string,amount:number):Transaction|undefined{
        const senderOutput=<Output>this.outputs.find(output=>output.address===senderWallet.publicKey)
        if(amount>senderOutput.amount){
            console.log(`Amount:${amount} exceeds balance.`)
            return
        }
        senderOutput.amount=senderOutput.amount-amount
        this.outputs.push({amount, address: recipient})
        Transaction.signTransaction(this,senderWallet)
        return this
    }
    public static newTransaction(senderWallet:Wallet,recipient:string,amount:number):Transaction|undefined{
        const transaction=new this()
        if(amount>senderWallet.balance){
            console.log(`Amount:${amount} exceeds balance.`)
            return
        }
        transaction.outputs.push(...[
            {amount:senderWallet.balance-amount,address:senderWallet.publicKey},
            {amount,address: recipient}
        ])
        Transaction.signTransaction(transaction,senderWallet)
        return transaction
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