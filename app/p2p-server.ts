import WebSocket from "ws";
import {Blockchain} from "../blockchain";
import {TransactionPool} from "../wallet/transaction-pool";
import {Transaction} from "../wallet/transaction";

const P2P_PORT: number = Number(process.env.P2P_PORT) || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []
const MESSAGE_TYPES:{[index:string]:string}={
    chain:'CHAIN',
    transaction:'TRANSACTION'
}

export class P2pServer {
    readonly blockchain: Blockchain
    sockets: WebSocket.WebSocket[]
    transactionPool:TransactionPool

    constructor(blockchain: Blockchain,transactionPool:TransactionPool) {
        this.blockchain = blockchain
        this.transactionPool=transactionPool
        this.sockets = []
    }

    public listen(): void {
        const server = new WebSocket.Server({port: P2P_PORT})
        server.on('connection', socket => {
            this.connectSocket(socket)
        })
        this.connectToPeers()
        console.log(`Listening for peer-to-peer connections on:${P2P_PORT}`)
    }

    private connectSocket(socket: WebSocket.WebSocket) {
        this.sockets.push(socket)
        console.log('Socket connected.')
        this.messageHandler(socket)
        // socket.send(JSON.stringify(this.blockchain.chain))
        this.sendChain(socket)
    }

    private connectToPeers() {
        peers.forEach(peer => {
            const socket = new WebSocket(peer)
            socket.on('open', () => {
                this.connectSocket(socket)
            })
        })
    }

    private messageHandler(socket: WebSocket.WebSocket) {
        socket.on('message',(message:WebSocket.RawData)=>{
            const data=JSON.parse(String(message))
            // console.log('data',data)
            // this.blockchain.replaceChain(data)
            switch (data.type){
                case MESSAGE_TYPES.chain:
                    this.blockchain.replaceChain(data.chain)
                    break
                case MESSAGE_TYPES.transaction:
                    this.transactionPool.updateOrAddTransaction(data.transaction)
                    break
            }
        })
    }

    private sendChain(socket: WebSocket.WebSocket) {
        socket.send(JSON.stringify({
            type:MESSAGE_TYPES.chain,
            chain:this.blockchain.chain
        }))
    }
    public syncChains(){
        this.sockets.forEach(socket=>{this.sendChain(socket)})
    }
    public broadcastTransaction(transaction:Transaction):void{
        this.sockets.forEach(socket=>this.sendTransaction(socket,transaction))
    }

    private sendTransaction(socket: WebSocket.WebSocket,transaction:Transaction) {
        socket.send(JSON.stringify({
            type:MESSAGE_TYPES.transaction,
            transaction
        }))
    }
}