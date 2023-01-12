import {Wallet} from "./index";
import {Transaction} from "./transaction";
import {expect} from "@jest/globals";
import {MINING_REWARD} from "../config";

describe('Transaction',()=>{
    let transaction:Transaction,wallet:Wallet,recipient:string,amount:number
    beforeEach(()=>{
        wallet=new Wallet()
        amount=50
        recipient='r3c1p13nt'
        transaction=Transaction.newTransaction(wallet,recipient,amount) as Transaction
    })

    it('should output the `amount` subtracted from the wallet balance', function () {
        expect(transaction?.outputs.find(output=>output.address===wallet.publicKey)?.amount).toEqual(wallet.balance-amount)
    });
    it('should output the `amount` added to the recipient', function () {
        expect(transaction?.outputs.find(output=>output.address===recipient)?.amount).toEqual(amount)
    });
    it('should output the `amount` added to the recipient', function () {
        expect(transaction?.input?.amount).toEqual(wallet.balance)
    });
    it('should input the balance of the wallet', function () {
        expect(transaction?.input?.amount).toEqual(wallet.balance)
    });
    it('should validte a transaction', function () {
        expect(Transaction.verifyTransaction(<Transaction>transaction)).toBe(true)
    });
    it('should invalidate a corrupt transaction', function () {
        transaction!.outputs[0].amount = 50000
        expect(Transaction.verifyTransaction(<Transaction>transaction)).toBe(false)

    });

    describe('transaction with an amount that exceeds the balance',()=>{
        beforeEach(()=>{
            amount=50000
            transaction=Transaction.newTransaction(wallet,recipient,amount) as Transaction
        })

        it('should not create the transaction', function () {
            expect(transaction).toEqual(undefined)
        });
    })

    describe('and updating a transaction',()=>{
        let nextAmount:number,nextRecipient:string
        beforeEach(()=>{
            nextAmount=20
            nextRecipient='n3xt-4ddr355'
            transaction=transaction.update(wallet,nextRecipient,nextAmount) as Transaction
        })
        it(`should subtract the next amount from the sender's output`, function () {
            expect(transaction?.outputs.find(output=>output.address===wallet.publicKey)?.amount).toEqual(wallet.balance-amount-nextAmount)
        });
        it('should output an amount for the next recipient', function () {
            expect(transaction?.outputs.find(output=>output.address===nextRecipient)?.amount).toEqual(nextAmount)
        });
    })

    describe('creating a reward transaction',()=>{
        beforeEach(()=>{
            transaction=Transaction.rewardTransaction(wallet,Wallet.blockchainWallet())
        })
        it(`should reward the miner's wallet`, function () {
            // expect(transaction?.outputs.find(output=>output.address===wallet.publicKey).amount).toEqual(MINING_REWARD)
            expect(transaction.outputs.find(output=>output.address===wallet.publicKey)!.amount).toEqual(MINING_REWARD)
        });
    })
})