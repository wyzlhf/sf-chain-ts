// import SHA256 from "crypto-js/sha256";
import {DIFFICULTY, MINE_RATE} from "../config";
import {ChainUtil} from "../chain-util";
import {Transaction} from "../wallet/transaction";

export class Block {
    readonly timestamp: number
    readonly lastHash: string
    readonly hash: string
    // data: string
    data:Transaction[]
    nonce: number
    difficulty: number

    constructor(
        // readonly index:number,
        timestamp: number,
        lastHash: string,
        hash: string,
        // data: string,
        data:Transaction[],
        nonce: number,
        difficulty: number
    ) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        // this.data = data
        this.data=data
        this.nonce = nonce
        this.difficulty=difficulty||DIFFICULTY
    }

    public toString(): string {
        return `Block -
        Timestamp :${this.timestamp}
        Last Hash :${this.lastHash.substring(0, 10)}
        Hash      :${this.hash.substring(0, 10)}
        Nonce     :${this.nonce}
        Difficulty:${this.difficulty}
        Data      :${this.data}`
    }

    public static genesis(): Block {
        const data:Transaction[]=[]
        return new this(0, '-----', 'f1r57-h45h', data, 0,DIFFICULTY)
    }

    public static mineBlock(lastBlock: Block, data: Transaction[]): Block {
        let hash: string
        let timestamp: number
        // const timestamp:number=Date.now()
        const lastHash: string = lastBlock.hash
        let {difficulty}=lastBlock
        let nonce: number = 0

        do {
            nonce++
            timestamp = Date.now()
            difficulty=Block.adjustDifficulty(lastBlock,timestamp)
            hash = Block.hash(timestamp, lastHash, data, nonce,difficulty)
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

        return new this(timestamp, lastHash, hash, data, nonce,difficulty)
    }

    private static hash(timestamp: number, lastHash: string, data: Transaction[], nonce: number,difficulty:number): string {
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString()
    }

    public static blockHash(block: Block): string {
        const {timestamp, lastHash, data, nonce,difficulty} = block
        return this.hash(timestamp, lastHash, data, nonce,difficulty)
    }

    public static adjustDifficulty(lastBlock: Block, currentTime: number):number {
        let {difficulty}=lastBlock
        difficulty=lastBlock.timestamp+MINE_RATE>currentTime?difficulty+1:difficulty-1
        return difficulty;
    }
}
