import {Block} from "./block";
import {Transaction} from "../wallet/transaction";

export class Blockchain {
    chain: Block[]

    constructor() {
        this.chain = [Block.genesis()]
    }

    addBlock(data: Transaction[]): Block {
        const block = Block.mineBlock(this.chain[this.chain.length - 1], data)
        this.chain.push(block)
        return block
    }
    isValidChain(chain:Block[]):boolean{
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())){
            return false
        }
        for(let i:number=1;i<chain.length;i++){
            const block:Block=chain[i]
            const lastBlock:Block=chain[i-1]

            if(block.lastHash!==lastBlock.hash || block.hash!==Block.blockHash(block)){
                return false
            }
        }
        return true
    }
    replaceChain(newChain:Block[]):void{
        if(newChain.length<=this.chain.length){
            console.log('Received chain is not longer than the current chain.')
            return
        }else if(!this.isValidChain(newChain)){
            console.log('The received chain is not valid.')
            return;
        }
        console.log('Replacing blockchain with the new chain.')
        this.chain=newChain
    }
}