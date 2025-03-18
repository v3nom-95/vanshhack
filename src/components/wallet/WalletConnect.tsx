import React from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';

const WalletConnect: React.FC = () => {
  const { account, connect, disconnect, isConnected, error } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex items-center gap-4">
      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}
      
      {isConnected ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Wallet className="w-4 h-4" />
            <span>{formatAddress(account || '')}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={disconnect}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          onClick={connect}
          className="flex items-center gap-2"
        >
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default WalletConnect; 