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
        throw new Error("Please install MetaMask or another Web3 wallet");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const account = await signer.getAddress();

      setProvider(provider);
      setSigner(signer);
      setAccount(account);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect wallet");
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