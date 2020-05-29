import React from 'react'
import { useWallet, UseWalletProvider } from 'use-wallet'

function App() {
  const wallet = useWallet()
  const blockNumber = wallet.getBlockNumber()

  return (
    <>
      <h1>Wallet</h1>
      {wallet.connected ? (
        <div>
          <div>Account: {wallet.account}</div>
          <div>Balance: {wallet.balance}</div>
          <button onClick={() => wallet.deactivate()}>disconnect</button>
        </div>
      ) : (
        <div>
          Connect:
          <button onClick={() => wallet.activate()}>MetaMask</button>
        </div>
      )}
    </>
  )
}

// Wrap everything in <UseWalletProvider />
export default () => (
  <UseWalletProvider
    chainId={1}
    connectors={{
    }}
  >
    <App />
  </UseWalletProvider>
)