import { useState } from "react";
import server from "./server";
import { findPrivateKeyByAddress, signMessage } from "./clientHelpers";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;

// import React, { useState } from "react";
// import server from "./server";
// import { findPrivateKeyByAddress, signMessage } from "./clientHelpers";

// function Transfer({ address, setBalance }) {
//   const [sendAmount, setSendAmount] = useState("");
//   const [recipient, setRecipient] = useState("");

//   // Correctly pass the event to the function
//   const setValue = (setter) => (evt) => setter(evt.target.value);

//   async function transfer(evt) {
//     evt.preventDefault(); // Ensure the event is passed here

//     const keyPairs = JSON.parse(localStorage.getItem('keyPairs')) || [];
//     if (keyPairs.length === 0) {
//       alert("No key pairs found. Please generate a keypair first.");
//       return;
//     }

//     const privateKey = findPrivateKeyByAddress(keyPairs, address);
//     if (!privateKey) {
//       alert("Private key not found for the given address.");
//       return;
//     }

//     const message = JSON.stringify({ sender: address, recipient, amount: parseInt(sendAmount) });

//     const signature = await signMessage(message, privateKey, { recovered: Boolean = true});

//     try {
//       const { data: { balance } } = await server.post(`send`, {
//         sender: address,
//         recipient,
//         amount: parseInt(sendAmount),
//         signature: signature
//       });
//       setBalance(balance);
//     } catch (ex) {
//       alert(ex.response.data.message);
//     }
//   }

//   return (
//     <form className="container transfer" onSubmit={transfer}>
//       <h1>Send Transaction</h1>

//       <label>
//         Send Amount
//         <input
//           placeholder="1, 2, 3..."
//           value={sendAmount}
//           onChange={setValue(setSendAmount)} // Ensure event is handled correctly
//         ></input>
//       </label>

//       <label>
//         Recipient
//         <input
//           placeholder="Type an address, for example: 0x2"
//           value={recipient}
//           onChange={setValue(setRecipient)} // Ensure event is handled correctly
//         ></input>
//       </label>

//       <input type="submit" className="button" value="Transfer" />
//     </form>
//   );
// }

// export default Transfer;
