// import {Block} from "./block";
// import {SHA256} from "crypto-ts";
// import sha256 from 'crypto-js/sha256'
// import SHA256 from "crypto-js/sha256";
// const block=new Block(123456789123,'bar','zoo','baz')
// console.log(block.toString())
// console.log(Block.genesis().toString())
// const fooBlock=Block.mineBlock(Block.genesis(),'foo')
// console.log(fooBlock.toString())
// console.log(SHA256('123').toString())
// import {Blockchain} from "./blockchain";
//
// const bc:Blockchain=new Blockchain()
// for(let i=0;i<10;i++){
//     console.log(bc.addBlock(`foo ${i}`).toString())
// }

import {Wallet} from "./wallet";
const wallet=new Wallet()
console.log(wallet.toString())