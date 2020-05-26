import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import { ethers } from 'ethers';


import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, provider: null, nonce: null, signer: null};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts });
      let provider = new ethers.providers.Web3Provider(web3.currentProvider);
      
      var signer = provider.getSigner();
      this.setState({provider, signer})
      let nonce = await provider.getTransactionCount(accounts[0]);
      this.setState({nonce})
      let signature = await signer.signMessage("Hello world");
      console.log(signature);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3 and accounts</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <div>You account is {this.state.accounts}</div>
        <div>{this.state.nonce}</div>
      </div>
    );
  }
}

export default App;
