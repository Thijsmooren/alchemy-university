const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/initialize-balance", (req, res) => {
  const { address, balance } = req.body;

  // Set the initial balance for the new address
  balances[address] = balance;
  res.send({ message: "Balance initialized", balance: balances[address] });
});

app.get("/balances", (req, res) => {
  res.send(balances);
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const { keccak256 } = require("ethereum-cryptography/keccak");
// const { utf8ToBytes, hexToBytes, toHex } = require("ethereum-cryptography/utils");
// const secp = require("ethereum-cryptography/secp256k1");
// const hashMessage = require("./serverHelpers.js");
// const port = 3042;

// app.use(cors());
// app.use(express.json());

// const balances = {
//   "0x1": 100,
//   "0x2": 50,
//   "0x3": 75,
// };

// app.get("/balance/:address", (req, res) => {
//   const { address } = req.params;
//   const balance = balances[address] || 0;
//   res.send({ balance });
// });

// app.post("/send", async (req, res) => {
//   const { sender, recipient, amount, signature } = req.body;
//   const message = JSON.stringify({ sender, recipient, amount });
//   const hashedMessage = hashMessage(message);
//   const {r, s, recovery} = signature;
//   console.log(sender);

//   const sig = new secp.secp256k1.Signature(r, s, recovery)

//   const publicKeyRaw = sig.recoverPublicKey(hashedMessage);
//   const publicKey = publicKeyRaw.toHex();
//   const hash = keccak256(publicKeyRaw.slice(1));
//   const derivedAddress = '0x' + toHex(hash.slice(-20));
//   console.log(derivedAddress);


  
//   try {
//     const publicKey = sig.recoverPublicKey(hashedMessage).toHex();
//     const isSigned = secp.secp256k1.verify(sig, hashMessage, publicKey)
    
//     if (sender !== derivedAddress) {
//       return res.status(400).send({ message: "Invalid signature!" });
//     }

//     if (balances[sender] < amount) {
//       return res.status(400).send({ message: "Not enough funds!" });
//     } else {
//       balances[sender] -= amount;
//       balances[recipient] = (balances[recipient] || 0) + amount;
//       res.send({ balance: balances[sender] });
//     }
//   } catch (error) {
//     res.status(400).send({ message: "Signature verification failed!" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Listening on port ${port}!`);
// });

// function setInitialBalance(address) {
//   if (!balances[address]) {
//     balances[address] = 0;
//   }
// }
