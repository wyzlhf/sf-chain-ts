import express from "express"
import {Blockchain} from "../blockchain";
import bodyParser from "body-parser";
import {P2pServer} from "./p2p-server";

const HTTP_PORT=process.env.HTTP_PORT||3001

const app=express()
const bc=new Blockchain()
const p2pServer=new P2pServer(bc)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/blocks', (req,res)=>{
    res.json(bc.chain)
})
app.post('/mine',(req,res)=>{
    const block=bc.addBlock(req.body.data)
    console.log(`New block added:${block.toString()}`)
    res.redirect('/blocks')
})

app.listen(HTTP_PORT,():void=>{
    console.log(`Listening on port ${HTTP_PORT}`)
})
p2pServer.listen()