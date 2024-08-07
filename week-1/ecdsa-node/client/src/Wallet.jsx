import server from "./server";
import React, { useState, useEffect } from "react";
import { generateKeyPair } from "./clientHelpers";

function Wallet({ address, setAddress, balance, setBalance }) {
  const [privateKey, setPrivateKey] = useState("");
  const [keyPairs, setKeyPairs] = useState([]); // State to store all generated keypairs
  const [balances, setBalances] = useState({}); // State to store balances for each keypair

  useEffect(() => {
    // Fetch all balances from the server when the component mounts
    fetchBalances();
  }, []);

  const fetchBalances = async () => {
    try {
      const response = await server.get("/balances");
      setBalances(response.data);
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  };

  const onGenerateKeyPair = async () => {
    const keyPair = generateKeyPair();
    setPrivateKey(keyPair.privateKey);
    setAddress(keyPair.address);
    const randomBalance = Math.floor(Math.random() * 901) + 100;
    setBalance(randomBalance);
  
    const newKeyPairs = [...keyPairs, keyPair];
    setKeyPairs(newKeyPairs);
    localStorage.setItem("keyPairs", JSON.stringify(newKeyPairs));
  
    const updatedBalances = {
      ...balances,
      [keyPair.address]: randomBalance,
    };
    setBalances(updatedBalances);
  
    // Send the new address and balance to the server
    await server.post("/initialize-balance", {
      address: keyPair.address,
      balance: randomBalance,
    });

    // Fetch updated balances
    await fetchBalances();
  };

    // Function to clear all wallets
  const clearWallets = () => {
    localStorage.removeItem('keyPairs'); // Remove from localStorage
    setKeyPairs([]); // Reset state
    setBalances({});
    setPrivateKey("");
    setAddress("");
    setBalance(0);
    console.log('All wallets cleared');
  };


  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>

      <button onClick={onGenerateKeyPair}>Generate Keypair</button>

      <button onClick={clearWallets} style={{ marginTop: '10px', backgroundColor: '#ff6b6b', color: 'white' }}>
        Clear All Wallets
       </button>

       {privateKey && (
        <div>
          <h2>Private Key</h2>
          <p className="keys">{privateKey}</p> {/* Apply the CSS class here */}
        </div>
      )}

<div>
        <h2>Addresses and balances</h2>
        <ul>
          {Object.entries(balances).map(([address, balance]) => (
            <li key={address}>
              <p className="keys">Address: {address}</p>
              <p className="keys">Balance: {balance}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Wallet;






// function Wallet({ address, setAddress, balance, setBalance }) {
//   const [privateKey, setPrivateKey] = useState("");
//   const [keyPairs, setKeyPairs] = useState([]); // State to store all generated keypairs
//   const [balances, setBalances] = useState({}); // State to store balances for each keypair

//   useEffect(() => {
//     const storedKeyPairs = JSON.parse(localStorage.getItem('keyPairs')) || [];
//     setKeyPairs(storedKeyPairs);
//   }, []);

//   const onGenerateKeyPair = () => {
//     const keyPair = generateKeyPair();
//     setPrivateKey(keyPair.privateKey);
//     setAddress(keyPair.address);
//     const randomBalance = Math.floor(Math.random() * 901) + 100;
//     setBalance(randomBalance);

//     const newKeyPairs = [...keyPairs, keyPair];
//     setKeyPairs(newKeyPairs);
//     localStorage.setItem('keyPairs', JSON.stringify(newKeyPairs));

//     const updatedBalances = {
//       ...balances,
//       [keyPair.address]: randomBalance
//     };
//     setBalances(updatedBalances);
//   };

//   // Function to clear all wallets
//   const clearWallets = () => {
//     localStorage.removeItem('keyPairs'); // Remove from localStorage
//     setKeyPairs([]); // Reset state
//     setBalances({});
//     setPrivateKey("");
//     setAddress("");
//     setBalance(0);
//     console.log('All wallets cleared');
//   };

//   async function onChange(evt) {
//     const address = evt.target.value;
//     setAddress(address);

//     if (address) {
//       const { data: { balance } } = await server.get(`balance/${address}`);
//       setBalance(balance);
//     } else {
//       setBalance(0);
//     }
//   }

//   return (
//     <div className="container wallet">
//       <h1>Your Wallet</h1>

//       <label>
//         Wallet Address
//         <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
//       </label>

//       <div className="balance">Balance: {balance}</div>

//       <button onClick={onGenerateKeyPair}>Generate Keypair</button>

//       <button onClick={clearWallets} style={{ marginTop: '10px', backgroundColor: '#ff6b6b', color: 'white' }}>
//         Clear All Wallets
//       </button>

//       {privateKey && (
//         <div>
//           <h2>Private Key</h2>
//           <p className="keys">{privateKey}</p> {/* Apply the CSS class here */}
//         </div>
//       )}

//       <div>
//         <h2>All KeyPairs</h2>
//         <ul>
//           {keyPairs.map((kp, index) => (
//             <li key={index}>
//               <p className="keys">Address: {kp.address}</p>
//               <p className="keys">Balance: {balances[kp.address]}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Wallet;
