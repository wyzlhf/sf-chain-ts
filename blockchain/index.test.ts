import {Block} from "./block";
import {Blockchain} from "./index";
import {expect} from "@jest/globals";

describe('Blockchain',()=>{
    let bc:Blockchain,bc2:Blockchain
    beforeEach(()=>{
        bc=new Blockchain()
        bc2=new Blockchain()
    })

    it('should start with genesis block', function () {
        expect(bc.chain[0]).toEqual(Block.genesis())
    });
    it('should add a new block', function () {
        const data:string='foo'
        bc.addBlock(data)
        expect(bc.chain[bc.chain.length-1].data).toEqual(data)
    });
    it('should validate a valid chain', function () {
        bc2.addBlock('foo')
        expect(bc.isValidChain(bc2.chain)).toBe(true)
    });
    it('should invalidate a chain with a corrupt genesis block', function () {
        bc2.chain[0].data='Bad data'
        expect(bc.isValidChain(bc2.chain)).toBe(false)
    });
    it('should invalidate a corrupt chain', function () {
        bc2.addBlock('foo')
        bc2.chain[1].data='Not foo'
        expect(bc2.isValidChain(bc2.chain)).toBe(false)
    });
    it('should replace the chain with a valid chain', function () {
        bc2.addBlock('goo')
        bc.replaceChain(bc2.chain)
        expect(bc.chain).toEqual(bc2.chain)
    });
    it('should do not replace the chain with one of less than or equal to length', function () {
        bc.addBlock('foo')
        bc.replaceChain(bc2.chain)
        expect(bc.chain).not.toEqual(bc2.chain)
    });
})