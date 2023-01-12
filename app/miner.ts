import {Blockchain} from "../blockchain";
import {TransactionPool} from "../wallet/transaction-pool";
import {Wallet} from "../wallet";
import {P2pServer} from "./p2p-server";
import {Transaction} from "../wallet/transaction";
import {Block} from "../blockchain/block";

export class Miner{
    blockchain:Blockchain
    transactionPool:TransactionPool
    wallet:Wallet
    p2pServer:P2pServer
    constructor(blockchain:Blockchain,transactionPool:TransactionPool,wallet:Wallet,p2pServer:P2pServer) {
        this.blockchain=blockchain
        this.transactionPool=transactionPool
        this.wallet=wallet
        this.p2pServer=p2pServer
    }
    public mine():Block{
        const validTransactions:Transaction[]=this.transactionPool.validTransactions()
        validTransactions.push(
            Transaction.rewardTransaction(this.wallet,Wallet.blockchainWallet())
        )
        const block=this.blockchain.addBlock(validTransactions)
        this.p2pServer.syncChains()
        this.transactionPool.clear()
        this.p2pServer.broadcastClearTransactions()
        return block
    }
}