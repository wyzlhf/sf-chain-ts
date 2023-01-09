import WebSocket from "ws";
import {Blockchain} from "../blockchain";

const P2P_PORT: number = Number(process.env.P2P_PORT) || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []

export class P2pServer {
    readonly blockchain: Blockchain
    sockets: WebSocket.WebSocket[]

    constructor(blockchain: Blockchain) {
        this.blockchain = blockchain
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
            this.blockchain.replaceChain(data)
        })
    }

    private sendChain(socket: WebSocket.WebSocket) {
        socket.send(JSON.stringify(this.blockchain.chain))
    }
    public syncChains(){
        this.sockets.forEach(socket=>{this.sendChain(socket)})
    }
}