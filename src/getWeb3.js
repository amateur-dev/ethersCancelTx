import Web3 from "web3";
import Web3Modal from "web3modal";

import Torus from "@toruslabs/torus-embed";

const providerOptions = {
  torus: {
    package: Torus, // required
    options: {
      networkParams: {
      },
      config: {
      }
    }
  }
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: false, // optional
  providerOptions // required
});

const getWeb3 = async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Acccounts now exposed
      return (web3);
    } catch (error) {
      throw (error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    return web3;
  }
}


export default getWeb3;
