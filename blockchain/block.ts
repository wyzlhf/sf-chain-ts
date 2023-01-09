import SHA256 from "crypto-js/sha256";

// interface Block{
//     index:number
//     timestamp:number
//     data:string
//     nonce:number
//     hash:string
//     previousBlockHash:string
// }
export class Block{
    // readonly hash:string
    readonly timestamp:number
    readonly lastHash:string
    readonly hash:string
    data:string

    constructor(
        // readonly index:number,
        timestamp:number,
        lastHash:string,
        hash:string,
        data:string
    ) {
        this.timestamp=timestamp
        this.lastHash=lastHash
        this.hash=hash
        this.data=data
    }
    public toString():string{
        return `Block -
        Timestamp:${this.timestamp}
        Last Hash:${this.lastHash.substring(0,10)}
        Hash     :${this.hash.substring(0,10)}
        Data     :${this.data}`
    }
    public static genesis():Block{
        return new this(0,'-----','f1r57-h45h','[]')
    }
    public static mineBlock(lastBlock:Block,data:string):Block{
        const timestamp:number=Date.now()
        const lastHash:string=lastBlock.hash
        const hash:string=Block.hash(timestamp,lastHash,data)

        return new this(timestamp,lastHash,hash,data)
    }
    private static hash(timestamp:number,lastHash:string,data:string):string{
        return SHA256(`${timestamp}${lastHash}${data}`).toString()
    }
    public static blockHash(block:Block):string{
        const {timestamp,lastHash,data}=block
        return this.hash(timestamp,lastHash,data)
    }
}
