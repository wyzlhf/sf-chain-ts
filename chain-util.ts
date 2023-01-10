import {ec} from "elliptic";
import {v4 as uuidv4} from 'uuid'
const ecs=new ec('secp256k1')

export class ChainUtil{
    public static genKeyPair():ec.KeyPair{
        return ecs.genKeyPair()
    }
    public static id():string{
        return uuidv4()
    }
}