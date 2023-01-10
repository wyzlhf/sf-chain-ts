import {Wallet} from "./index";
import {Transaction} from "./transaction";
import {expect} from "@jest/globals";

describe('Transaction',()=>{
    let transaction:Transaction|undefined,wallet:Wallet,recipient:string,amount:number
    beforeEach(()=>{
        wallet=new Wallet()
        amount=50
        recipient='r3c1p13nt'
        transaction=Transaction.newTransaction(wallet,recipient,amount)
    })

    // it('should output the `amount` subtracted from the wallet balance', function () {
    //     expect(transaction.outputs.find(output=>output.address===wallet.publicKey).amount).toEqual(wallet.balance-amount)
    // });
    // it('should output the `amount` added to the recipient', function () {
    //     expect(transaction.outputs.find(output=>output.address===recipient).amount).toEqual(amount)
    // });

    describe('transaction with an amount that exceeds the balance',()=>{
        beforeEach(()=>{
            amount=50000
            transaction=Transaction.newTransaction(wallet,recipient,amount)
        })

        it('should not create the transaction', function () {
            expect(transaction).toEqual(undefined)
        });
    })
})