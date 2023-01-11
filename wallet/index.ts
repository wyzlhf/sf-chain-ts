import {INITIAL_BALANCE} from "../config";
import {ChainUtil} from "../chain-util";
import {BNInput, ec} from "elliptic";
import {Output} from "./transaction";
// import BNInput from ""
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
    public sign(dataHash:string):ec.Signature{
        return this.keyPair.sign(dataHash)
    }
}