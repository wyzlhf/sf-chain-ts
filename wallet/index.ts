import {INITIAL_BALANCE} from "../config";
import {ChainUtil} from "../chain-util";
import {ec} from "elliptic";
import {Transaction} from "./transaction";
import {TransactionPool} from "./transaction-pool";

export class Wallet {
    balance: number
    keyPair: ec.KeyPair
    publicKey: string
    address:string

    constructor() {
        this.balance = INITIAL_BALANCE
        this.keyPair = ChainUtil.genKeyPair()
        this.publicKey = this.keyPair.getPublic(false, 'hex')
        this.address=''
    }

    public toString(): string {
        return `Wallet-
        publicKey:${this.publicKey.toString()}
        balance  :${this.balance}
        keyPari  :${this.keyPair.getPrivate()}`
    }

    public sign(dataHash: string): ec.Signature {
        return this.keyPair.sign(dataHash)
    }

    public createTransaction(recipient: string, amount: number, transactionPool: TransactionPool): Transaction | undefined {
        if (amount > this.balance) {
            console.log(`Amount: ${amount} exceeds current balance:${this.balance}`)
            return
        }
        let transaction = transactionPool.existingTransaction(this.publicKey)
        if (transaction) {
            transaction.update(this, recipient, amount)
        } else {
            transaction = Transaction.newTransaction(this, recipient, amount) as Transaction
            transactionPool.updateOrAddTransaction(transaction)
        }
        return transaction
    }

    public static blockchainWallet(): Wallet {
        const blockchainWallet = new this()
        blockchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;
    }
}