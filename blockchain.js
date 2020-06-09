const sha256 = require('crypto-js/sha256')

class Block{
    constructor(index, data, timestamp, prevHash = ''){
        this.index = index,
        this.data = data,
        this.prevHash = prevHash,
        this.timestamp = timestamp,
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return sha256(this.index + this.timestamp + this.data.toString() + this.prevHash).toString()
    }
}


class blockChain{
    constructor() {
        this.chain = [this.genesisBlock()]
    }

    genesisBlock() {
        return new Block(0, 'Genesis Block', '09/06/2020', '')
    }

    lastBlock() {
        return this.chain[this.chain.length-1]
    }

    addBlock(newBlock) {
        newBlock.prevHash = this.lastBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }

    isValid() {
        for (let index = 1; index < this.chain.length; index++) {
            if (this.chain[index].prevHash != this.chain[index-1].hash){
                return false
            }             
        }
        return true
    }
}

var blockchain = new blockChain()

console.log(blockchain);

blockchain.addBlock(new Block(blockchain.chain.length, "add block", '09/06/2020', ''));
console.log(blockchain.isValid());
console.table(blockchain);
console.log(blockchain)

blockchain.addBlock(new Block(blockchain.chain.length, "add block 2", '09/06/2020', ''));
console.log(blockchain.isValid());
console.table(blockchain);
console.log(blockchain.chain)


//console.log(new Block(0, "test block", '09/06/2020', ''))