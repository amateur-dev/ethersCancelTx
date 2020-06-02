import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import { ethers } from 'ethers';



import "./App.css";

function App() {
  const [accounts, setAccounts] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [nonce, setNonce] = useState(null);

  const disconnect = () => {
    setAccounts(null);
    setNonce(null);

  }

  async function getweb3function() {

        try {

          // Get network provider and web3 instance.
          const web3 = await getWeb3();
          setWeb3(web3);

          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts);

          let provider = new ethers.providers.Web3Provider(web3.currentProvider);
          var signer = provider.getSigner();
          setSigner(signer);
          // Getting the address of the user
          var address = await signer.getAddress();
          setAddress(address);
          // Getting the nonce of the address
          let nonce = await provider.getTransactionCount(accounts[0]);
          setNonce(nonce);
        } catch (error) {
            console.error(error);
        }
      };
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    window.ethereum.autoRefreshOnNetworkChange = false;});

  if (accounts == null) {
    return(
      <div>
      <button onClick={() => getweb3function()}>
        Connect Accounts
      </button>
    </div>
    )
  } else {
    return (
      <div>
        <p>Thank you for connecting your account</p>
        <p>Your current account is {accounts}</p>
        <p>Your current nonce is {nonce}</p>
        <button onClick={() => disconnect()}>
        Disconnect
        </button>
    </div>
    )
  }
}

export default App;
