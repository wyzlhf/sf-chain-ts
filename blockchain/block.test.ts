import {Block} from "./block";
import {DIFFICULTY} from "../config";
import {data} from "../struct";
import {Transaction} from "../wallet/transaction";

describe('Block', function () {
    let data:string,lastBlock:Block,block:Block
    beforeEach(()=>{
        // data='bar'
        let data:Transaction[]=[]
        lastBlock=Block.genesis()
        block=Block.mineBlock(lastBlock,data)
    })
    it('should set the `data` to match the input', function () {
        expect(block.data).toEqual(data)
    });
    it('should set the `lastHash` to match the hash of the last block', function () {
        expect(block.lastHash).toEqual(lastBlock.hash)
    });
    it('should generate a hash that matches the difficulty', function () {
        expect(block.hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty))
        console.log(block.toString())
    });
    it('should lower the difficulty for slowly mined blocks', function () {
        expect(Block.adjustDifficulty(block,block.timestamp+36000)).toEqual(block.difficulty-1)
    });
    it('should raise the difficulty for quickly mined blocks', function () {
        expect(Block.adjustDifficulty(block,block.timestamp+1)).toEqual(block.difficulty+1)
    });
});