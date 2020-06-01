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
  
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    
      // Modern dapp browsers...
      if (window.ethereum) {
        console.log(`window.ethereum`);
        console.log(window.ethereum);
        const provider = await web3Modal.connect();  
        const web3 = new Web3(provider);
        window.ethereum.autoRefreshOnNetworkChange = false;
        try {
          
          // Request account access if needed
          await window.ethereum.enable();
          
          
          // Acccounts now exposed
          return (web3);
        } catch (error) {
          throw  (error);
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
      // window.ethereum.autoRefreshOnNetworkChange = false;


export default getWeb3;
