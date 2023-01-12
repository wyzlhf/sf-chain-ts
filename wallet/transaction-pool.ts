import {Transaction} from "./transaction";

export class TransactionPool{
    transactions:Transaction[]
    constructor() {
        this.transactions=[]
    }
    public updateOrAddTransaction(transaction:Transaction):void{
        let transactionWitId=this.transactions.find(t=>t.id===transaction.id)
        if(transactionWitId){
            this.transactions[this.transactions.indexOf(transactionWitId)]=transaction
        }else {
            this.transactions.push(transaction)
        }
    }

    public existingTransaction(publicKey: string):Transaction {
        return this.transactions.find(t=>t.input?.address===publicKey) as Transaction
    }

    public validTransactions():Transaction[] {
        return this.transactions.filter(transaction=>{
            const outputTotal=transaction.outputs.reduce((total,output)=>{
                return total+output.amount
            },0)
            if (transaction.input?.amount!==outputTotal){
                console.log(`Invalid transaction from ${transaction.input?.address}`)
                return
            }
            if(!Transaction.verifyTransaction(transaction)){
                console.log(`Invalid signature from ${transaction.input.address}`)
                return;
            }
            return transaction
        })
    }
    public clear():void{
        this.transactions=[]
    }
}