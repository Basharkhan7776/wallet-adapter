
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { TokenLaunchpad } from '@/components/TokenLaunchpad';
import '@solana/wallet-adapter-react-ui/styles.css';



function App() {
  return (
    <div className='flex py-10 px-44 flex-col justify-center items-center min-h-screen'>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]}>
          <WalletModalProvider>
            <div>
              <h1 className='text-4xl font-bold text-center font-mono'>Token Launchpad</h1>
              <div className='w-full flex justify-end gap-4 items-center p-4'>
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
            </div>
            <TokenLaunchpad />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  )
}


export default App
