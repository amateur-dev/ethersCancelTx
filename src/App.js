import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import Web3 from "web3";
import { ethers } from 'ethers';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Web3Modal from "web3modal";

import "./App.css";

const providerOptions = {
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: false, // optional
  providerOptions, // required
  theme: {
    background: "rgb(39, 49, 56)",
    main: "rgb(199, 199, 199)",
    secondary: "rgb(136, 136, 136)",
    border: "rgba(195, 195, 195, 0.14)",
    hover: "rgb(16, 26, 32)"
  }
})


function App() {
  const [accounts, setAccounts] = useState();
  const [web3, setWeb3] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [nonce, setNonce] = useState(null);
  
  const disconnect = () => {
    web3Modal.clearCachedProvider();
    setAccounts(null);
    setNonce(null);
    localStorage.clear();
    
  }

  useEffect(()=>{
    if(localStorage.getItem("accounts")) {
      getweb3function();
    }
  },[])

  useEffect(()=>{
  },[accounts])



  async function getweb3function() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      setWeb3(web3);
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      localStorage.setItem("accounts", accounts);
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
  if (localStorage.getItem("accounts") == null || undefined) {
    return (
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">Welcome To ETH Cancel Tx Provider</h1>
        </Jumbotron>
        <Button onClick={() => {getweb3function()}}>
          Connect Accounts
      </Button>
      </Container>
    )
  } else {
    return (
      <Container className="p-3">
        <p>Thank you for connecting your account</p>
        <p>Your current account is {(localStorage.getItem("accounts"))}</p>
        {
          <p>The nonce of your last confirmed tx is {nonce}</p>
        }
        <Button onClick={() => disconnect()}>
          Disconnect
        </Button>
      </Container>
    )
  }
}

export default App;
