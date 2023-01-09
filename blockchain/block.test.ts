import {Block} from "./block";

describe('Block', function () {
    let data:string,lastBlock:Block,block:Block
    beforeEach(()=>{
        data='bar'
        lastBlock=Block.genesis()
        block=Block.mineBlock(lastBlock,data)
    })
    it('should set the `data` to match the input', function () {
        expect(block.data).toEqual(data)
    });
    it('should set the `lastHash` to match the hash of the last block', function () {
        expect(block.lastHash).toEqual(lastBlock.hash)
    });
});