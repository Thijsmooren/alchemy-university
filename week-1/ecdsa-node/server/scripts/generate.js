const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const fs = require('fs');


function generateKeyPairs() {
    let keyPairs = [];
    for (let i = 0; i < 10 ; i++) {
        let privateKey = secp.secp256k1.utils.randomPrivateKey();
        let publicKey = secp.secp256k1.getPublicKey(privateKey);
        let hash = keccak256(publicKey.slice(1));
        let address = '0x' + toHex(hash.slice(-20));

        let keyPair = {
            privateKey: privateKey,
            publicKey: publicKey,
            address: address
        };
        keyPairs.push(keyPair);
    }

    return keyPairs;
};

function generateBalances(keyPairs) {
    let balances = {};

    keyPairs.forEach((pair, index) => {
        balances[pair.address] = (index + 1)*100;
    });


    return balances;
}

// function displayKeyPairs() {
//     keyPairs.forEach((pair, index) => {
//         console.log(`Private Key ${index +1}: ${toHex(pair.privateKey)}`);
//         console.log(`Public Key ${index +1}: ${toHex(pair.publicKey)}`);
//         console.log(`Address ${index +1}: ${toHex(pair.address)}`)
//     });
// }

function saveKeyPairsToFile(keyPairs) {
    let content = '';
    keyPairs.forEach((pair, index) => {
        content += `Private Key ${index +1}: ${toHex(pair.privateKey)}\n`;
        content += `Public Key ${index +1}: ${toHex(pair.publicKey)}\n`;
        content += `Address ${index +1}: ${pair.address}\n`;
        content +='\n';
    });

    fs.writeFile('keyPairs.txt', content, (err) => {
        if (err) throw err;
        console.log('The file has been saved');
    })
}


module.exports = { generateKeyPairs, generateBalances, saveKeyPairsToFile };