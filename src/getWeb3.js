import Web3 from "web3";
import Web3Modal from "web3modal";

import Torus from "@toruslabs/torus-embed";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Portis from "@portis/web3";
import Authereum from "authereum";

require('dotenv').config()




const getWeb3 = async () => {
  
  const providerOptions = {
    authereum: {
      package: Authereum // required
    },
    portis: {
      package: Portis, // required
      options: {
        id: process.env.REACT_APP_PORTIS_APIKEY // required
      }
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: process.env.REACT_APP_INFURA_APIKEY // required
      }
    },
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
    providerOptions, // required
    theme: {
      background: "rgb(39, 49, 56)",
      main: "rgb(199, 199, 199)",
      secondary: "rgb(136, 136, 136)",
      border: "rgba(195, 195, 195, 0.14)",
      hover: "rgb(16, 26, 32)"
    }
  })

  // Modern dapp browsers...
  if (window.ethereum) {
    if (web3Modal.cachedProvider) {
      console.log("trying")
      await web3Modal.connect();
    }
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
