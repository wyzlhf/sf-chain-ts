import {Transaction} from "./transaction";

export class TransactionPool{
    transactions:Transaction[]
    constructor() {
        this.transactions=[]
    }
    updateOrAddTransaction(transaction:Transaction):void{
        let transactionWitId=this.transactions.find(t=>t.id===transaction.id)
        if(transactionWitId){
            this.transactions[this.transactions.indexOf(transactionWitId)]=transaction
        }else {
            this.transactions.push(transaction)
        }
    }
}