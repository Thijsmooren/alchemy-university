// const { keccak256 } = require("ethereum-cryptography/keccak");
// const { utf8ToBytes, toHex, hexToBytes } = require("ethereum-cryptography/utils");
// const { secp256k1 } = require("ethereum-cryptography/secp256k1");

// function hashMessage(message) {
//   return keccak256(utf8ToBytes(message));
// }

// export async function signMessage(msg, privateKey) {
//   const hashedMessage = hashMessage(msg);
//   const signature = secp256k1.sign(hashedMessage, privateKey);
//   return {
//     r: toHex(signature.r),
//     s: toHex(signature.s),
//     recovery: signature.recovery
//   };
// }

// export function verifyMessage(msg, signature, publicKey) {
//   const hashedMessage = hashMessage(msg);
//   return secp256k1.verify({
//     r: hexToBytes(signature.r),
//     s: hexToBytes(signature.s),
//     recovery: signature.recovery
//   }, hashedMessage, publicKey);
// }

// function findPrivateKeyByAddress(keyPairs, address) {
//     for (let keyPair of keyPairs) {
//         if (keyPair.address === address) {
//             return keyPair.privateKey; // Returns the private key as a buffer
//         }
//     }
//     return null; // Return null if no key pair matches the address
// }

// module.exports = { findPrivateKeyByAddress, hashMessage, signMessage };