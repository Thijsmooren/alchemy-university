import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { secp256k1 } from "ethereum-cryptography/secp256k1";

function hashMessage(message) {
    return keccak256(utf8ToBytes(message));
}

export async function signMessage(msg, privateKey) {
    const hashedMessage = hashMessage(msg);
    return secp256k1.sign(hashedMessage, privateKey, { recovered: true });
}

export function addressFromPublicKey(publicKey) {
    const hash = keccak256(publicKey.slice(1));
    return '0x' + toHex(hash.slice(-20));
}

export function generateKeyPair() {
    const privateKey = secp256k1.utils.randomPrivateKey();
    const publicKey = secp256k1.getPublicKey(privateKey);
    const address = addressFromPublicKey(publicKey)
    const keyPair = {
      privateKey: toHex(privateKey),
      publicKey: toHex(publicKey),
      address: address
    };
    return keyPair;
  }

// export function generateKeyPair() {
//     let privateKey = secp.utils.randomPrivateKey();
//     let publicKey = secp.getPublicKey(privateKey);
//     let hash = keccak256(publicKey.slice(1));
//     let address = '0x' + toHex(hash.slice(-20));
//     let keyPair = {
//         privateKey: privateKey,
//         publicKey: publicKey,
//         address: address
//         };
//     return keyPair;
// }

export function findPrivateKeyByAddress(keyPairs, address) {
    for (let keyPair of keyPairs) {
        if (keyPair.address === address) {
            return keyPair.privateKey; // Returns the private key as a buffer
        }
    }
    return null; // Return null if no key pair matches the address
}

// export function generateKeyPairs() {
//     let keyPairs = [];
//     for (let i = 0; i < 10 ; i++) {
//         let privateKey = secp.utils.randomPrivateKey();
//         let publicKey = secp.getPublicKey(privateKey);
//         let hash = keccak256(publicKey.slice(1));
//         let address = '0x' + toHex(hash.slice(-20));

//         let keyPair = {
//             privateKey: privateKey,
//             publicKey: publicKey,
//             address: address
//         };
//         keyPairs.push(keyPair);
//     }

//     return keyPairs;
// }






// export function generateBalances(keyPairs) {
//     let balances = {};

//     keyPairs.forEach((pair, index) => {
//         balances[pair.address] = (index + 1) * 100;
//     });

//     return balances;
// }


// module.exports = hashMessage;