// import {TransactionPool} from "./transaction-pool";
// import {Wallet} from "./index";
// import {Transaction} from "./transaction";
// import {expect} from "@jest/globals";
//
// describe('TransactionPool',()=>{
//     let tp:TransactionPool,wallet:Wallet,transaction:Transaction
//     beforeEach(()=>{
//         tp=new TransactionPool()
//         wallet=new Wallet()
//         // transaction=Transaction.newTransaction(wallet,'r4nd-4dr455',30) as Transaction
//         // tp.updateOrAddTransaction(transaction)
//         transaction=wallet.createTransaction('r4nd-4dr455',30,tp) as Transaction
//     })
//     it('should add a transaction to the pool', function () {
//         expect(tp.transactions.find(t=>t.id===transaction.id)).toEqual(transaction)
//     });
//     it('should update a transaction in the pool', function () {
//         const oldTransaction=JSON.stringify(transaction)
//         const newTransaction=transaction.update(wallet,'foo-4ddr355',40) as Transaction
//         tp.updateOrAddTransaction(newTransaction)
//         expect(JSON.stringify(tp.transactions.find(t=>t.id===newTransaction.id))).not.toEqual(oldTransaction)
//     });
//     it('should clear transactions', function () {
//         tp.clear()
//         expect(tp.transactions).toEqual([])
//     });
//
//     describe('mixing valid and corrupt transactions',()=>{
//         let validTransactions:Transaction[]
//         beforeEach(()=>{
//             validTransactions=[...tp.transactions]
//             for(let i:number=0;i<6;i++){
//                 wallet=new Wallet()
//                 transaction=wallet.createTransaction('r4nd-4dr355',30,tp) as Transaction
//                 if(i%2===0){
//                     transaction.input!.amount=99999
//                 }else {
//                     validTransactions.push(transaction)
//                 }
//             }
//         })
//         it('should show a difference between valid and corrupt transactions', function () {
//             expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions))
//         });
//         it('should grab valid transactions', function () {
//             expect(tp.validTransactions()).toEqual(validTransactions)
//         });
//     })
// })