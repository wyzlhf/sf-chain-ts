import {TransactionPool} from "./transaction-pool";
import {Wallet} from "./index";
import {Transaction} from "./transaction";
import {expect} from "@jest/globals";

describe('TransactionPool',()=>{
    let tp:TransactionPool,wallet:Wallet,transaction:Transaction
    beforeEach(()=>{
        tp=new TransactionPool()
        wallet=new Wallet()
        transaction=Transaction.newTransaction(wallet,'r4nd-4dr455',30) as Transaction
        tp.updateOrAddTransaction(transaction)
    })
    it('should add a transaction to the pool', function () {
        expect(tp.transactions.find(t=>t.id===transaction.id)).toEqual(transaction)
    });
    it('should update a transaction in the pool', function () {
        const oldTransaction=JSON.stringify(transaction)
        const newTransaction=transaction.update(wallet,'foo-4ddr355',40) as Transaction
        tp.updateOrAddTransaction(newTransaction)
        expect(JSON.stringify(tp.transactions.find(t=>t.id===newTransaction.id))).not.toEqual(oldTransaction)
    });
})