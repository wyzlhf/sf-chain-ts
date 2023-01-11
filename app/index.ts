import express from "express"
import {Blockchain} from "../blockchain";
import bodyParser from "body-parser";
import {P2pServer} from "./p2p-server";
import {Wallet} from "../wallet";
import {TransactionPool} from "../wallet/transaction-pool";

const HTTP_PORT=process.env.HTTP_PORT||3001

const app=express()
const bc=new Blockchain()
const wallet=new Wallet()
const tp=new TransactionPool()
const p2pServer=new P2pServer(bc)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/blocks', (req,res)=>{
    res.json(bc.chain)
})
app.post('/mine',(req,res)=>{
    const block=bc.addBlock(req.body.data)
    console.log(`New block added:${block.toString()}`)
    p2pServer.syncChains()
    res.redirect('/blocks')
})
app.get('/transactions',(req,res)=>{
    res.json(tp.transactions)
})
app.post('/transaction',(req,res)=>{
    const {recipient,amount}=req.body
    const transaction=wallet.createTransaction(recipient,amount,tp)
    res.redirect('/transactions')
})

app.listen(HTTP_PORT,():void=>{
    console.log(`Listening on port ${HTTP_PORT}`)
})
p2pServer.listen()