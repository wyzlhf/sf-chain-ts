import {Blockchain} from "../blockchain";
import {TransactionPool} from "../wallet/transaction-pool";
import {Wallet} from "../wallet";
import {P2pServer} from "./p2p-server";

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
    mine(){
        const validTransactions=this.transactionPool.validTransactions()
    }
}