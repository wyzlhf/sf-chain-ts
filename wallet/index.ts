import {INITIAL_BALANCE} from "../config";
import {ChainUtil} from "../chain-util";
import {ec} from "elliptic";
import {Transaction} from "./transaction";
import {TransactionPool} from "./transaction-pool";
import {Blockchain} from "../blockchain";

export class Wallet {
    balance: number
    keyPair: ec.KeyPair
    publicKey: string
    address: string

    constructor() {
        this.balance = INITIAL_BALANCE
        this.keyPair = ChainUtil.genKeyPair()
        this.publicKey = this.keyPair.getPublic(false, 'hex')
        this.address = ''
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

    public createTransaction(recipient: string, amount: number,blockchain:Blockchain, transactionPool: TransactionPool): Transaction | undefined {
        this.balance=this.calculateBalance(blockchain)
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

    public calculateBalance(blockchain: Blockchain): number {
        let balance: number = this.balance
        let transactions: Transaction[] = []
        blockchain.chain.forEach(block => block.data.forEach(transaction => {
            transactions.push(transaction)
        }))
        const walletInputTs = transactions.filter(transaction => transaction.input?.address === this.publicKey)
        let startTime = 0
        if (walletInputTs.length > 0) {
            const recentInputT = walletInputTs.reduce(
                (prev, current) => prev.input!.timestamp > current.input!.timestamp ? prev : current
            )
            balance = recentInputT.outputs.find(output => output.address === this.publicKey)!.amount
            startTime = recentInputT.input!.timestamp
        }
        transactions.forEach(transaction => {
            if (transaction.input!.timestamp > startTime) {
                transaction.outputs.find(output => {
                    if (output.address === this.publicKey) {
                        balance += output.amount
                    }
                })
            }
        })
        return balance
    }

    public static blockchainWallet(): Wallet {
        const blockchainWallet = new this()
        blockchainWallet.address = 'blockchain-wallet';
        return blockchainWallet;
    }
}