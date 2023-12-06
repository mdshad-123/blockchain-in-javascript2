const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {
    constructor({ timestamp, prevhash, hash, nonce, dificulty, data }) {
        this.timestamp = timestamp;
        this.prevhash = prevhash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.dificulty = dificulty;
    }
    static genesis() {
        return new this(GENESIS_DATA);
    }
    static mineBlock({ prevBlock, data }) {
        let hash, timestamp;
        const prevhash = prevBlock.hash;
        const { dificulty } = prevBlock;

        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            hash = cryptoHash(timestamp, prevhash, nonce, dificulty, data)
        } while (hash.substring(0, dificulty) !== '0'.repeat(dificulty));
        return new this({
            timestamp,
            prevhash,
            nonce,
            dificulty,
            data,
            hash
        });
    }
}

const block1 = new Block({
    timestamp: '12/10/14',
    prevhash: '0',
    hash: '0x1234',
    data: 'shad'
});


//console.log(block1);
//console.log(block2);

const genesisBlock = Block.genesis();
//console.log(genesisBlock);

//const result = Block.mineBlock({ prevBlock: block1, data: 'ram ' });
//console.log(result);


module.exports = Block;