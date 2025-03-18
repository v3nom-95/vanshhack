import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

interface Web3ContextType {
  account: string | null;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
  error: string | null;
}

const Web3Context = createContext<Web3ContextType>({
  account: null,
  provider: null,
  signer: null,
  connect: async () => {},
  disconnect: () => {},
  isConnected: false,
  error: null,
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to connect your wallet");
      }

      // Check if MetaMask is installed
      if (!window.ethereum.isMetaMask) {
        throw new Error("Please install MetaMask to connect your wallet");
      }

      // Force MetaMask to show the login popup by disconnecting first
      try {
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
      } catch (err) {
        // Ignore any errors from the disconnect attempt
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Request account access with force flag
      await provider.send("eth_requestAccounts", []);
      
      // Get the signer and account
      const signer = provider.getSigner();
      const account = await signer.getAddress();

      // Set up event listeners for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnect();
        } else {
          setAccount(accounts[0]);
        }
      });

      // Set up event listener for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      setProvider(provider);
      setSigner(signer);
      setAccount(account);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('User rejected')) {
          setError("Please approve the connection request in MetaMask");
        } else if (err.message.includes('already pending')) {
          setError("Please check MetaMask for pending connection request");
        } else {
          setError(err.message);
        }
      } else {
        setError("Failed to connect wallet");
      }
    }
  };

  const disconnect = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
  };

  useEffect(() => {
    // Check if already connected
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.listAccounts().then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setProvider(provider);
          setSigner(provider.getSigner());
        }
      });
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        signer,
        connect,
        disconnect,
        isConnected: !!account,
        error,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}; 