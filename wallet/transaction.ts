import {ChainUtil} from "../chain-util";
import {Wallet} from "./index";
// interface Output{
//     [amount: string]:number,
//     address:string
// }
interface Output{
    amount:number,
    address:string
}
export class Transaction{
    id:string
    input:string
    outputs:Output[]
    constructor() {
        this.id=ChainUtil.id()
        this.input=''
        this.outputs=[]
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
        return transaction
    }
}