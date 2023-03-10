import {Wallet} from "./index";
import {TransactionPool} from "./transaction-pool";
import {Transaction} from "./transaction";
import {expect} from "@jest/globals";
import {Blockchain} from "../blockchain";

describe('Wallet',()=>{
    let wallet:Wallet,tp:TransactionPool,bc:Blockchain
    beforeEach(()=>{
        wallet=new Wallet()
        tp=new TransactionPool()
        bc=new Blockchain()
    })
    describe('creating a transaction',()=>{
        let transaction:Transaction,sendAmount:number,recipient:string
        beforeEach(()=>{
            sendAmount=50
            recipient='r4nd0m-4ddr355'
            transaction=wallet.createTransaction(recipient,sendAmount,bc,tp) as Transaction
        })
        describe('and doing the same transaction',()=>{
            beforeEach(()=>{
                wallet.createTransaction(recipient,sendAmount,bc,tp)
            })
            it('should double the `sendAmount` subtracted from the wallet balance', function () {
                expect(transaction.outputs.find(output=>output.address===wallet.publicKey)?.amount)
                    .toEqual(wallet.balance-sendAmount*2)
            });
            it('should clone the `sendAmount` output for the recipient', function () {
                expect(transaction.outputs.filter(output=>output.address===recipient).map(output=>output.amount))
                    .toEqual([sendAmount,sendAmount])
            });
        })
    })
})