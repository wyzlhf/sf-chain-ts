import {INITIAL_BALANCE} from "../config";
import {ChainUtil} from "../chain-util";
import {ec} from "elliptic";
export class Wallet{
    balance:number
    keyPair:ec.KeyPair
    publicKey:string
    constructor() {
        this.balance=INITIAL_BALANCE
        this.keyPair=ChainUtil.genKeyPair()
        this.publicKey=this.keyPair.getPublic(false,'hex')
    }
    public toString():string{
        return `Wallet-
        publicKey:${this.publicKey.toString()}
        balance  :${this.balance}
        keyPari  :${this.keyPair.getPrivate()}`
    }
}