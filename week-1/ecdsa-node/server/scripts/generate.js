const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const fs = require('fs');


let keyPairs = [];

function generateKeyPairs() {
    for (let i = 0; i < 10 ; i++) {
        let privateKey = secp.secp256k1.utils.randomPrivateKey();
        let publicKey = secp.secp256k1.getPublicKey(privateKey);
        let address = keccak256(publicKey.slice(1)).slice(keccak256(publicKey.slice(1)).length-20);

    let keyPair = {
        privateKey :privateKey,
        publicKey : publicKey,
        address: address
    };
    keyPairs.push(keyPair);
    }
};

function displayKeyPairs() {
    keyPairs.forEach((pair, index) => {
        console.log(`Private Key ${index +1}: ${toHex(pair.privateKey)}`);
        console.log(`Public Key ${index +1}: ${toHex(pair.publicKey)}`);
        console.log(`Address ${index +1}: ${toHex(pair.address)}`)
    });
}

function saveKeyPairsToFile() {
    let content = '';
    keyPairs.forEach((pair, index) => {
        content += `Private Key ${index +1}: ${toHex(pair.privateKey)}\n`;
        content += `Public Key ${index +1}: ${toHex(pair.publicKey)}\n`;
        content += `Address ${index +1}: ${toHex(pair.address)}\n`;
        content +='\n';
    });

    fs.writeFile('keyPairs.txt', content, (err) => {
        if (err) throw err;
        console.log('The file has been saved');
    })
}

generateKeyPairs();
displayKeyPairs();
saveKeyPairsToFile();