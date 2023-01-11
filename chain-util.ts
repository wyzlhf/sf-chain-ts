import {ec} from "elliptic";
import {v4 as uuidv4} from 'uuid'
import SHA256 from "crypto-js/sha256";
const ecs=new ec('secp256k1')

export class ChainUtil{
    public static genKeyPair():ec.KeyPair{
        return ecs.genKeyPair()
    }
    public static id():string{
        return uuidv4()
    }
    public static hash(data:any):string{
        return SHA256(JSON.stringify(data)).toString()
    }
    public static verifySignature(publicKey:string,signature:ec.Signature,dataHash:string):boolean{
        return ecs.keyFromPublic(publicKey,'hex').verify(dataHash,signature)
    }
}