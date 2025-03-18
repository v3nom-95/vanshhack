import React from 'react';
import { motion } from 'framer-motion';
import { BlockchainStatusProps } from '@/types/iot';
import { ClipboardCheck, Layers, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlockchainStatus: React.FC<BlockchainStatusProps> = ({ status, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-6 bg-card rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Blockchain Status</h3>
        <div className="text-center text-muted-foreground">
          Loading blockchain status...
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-card rounded-lg shadow-sm"
    >
      <div>
        <h2 className="text-xl font-semibold flex items-center mb-2">
          <Layers className="mr-2 h-5 w-5 text-ecosync-blue-dark" />
          Blockchain Verification
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Immutable record of environmental data and green credits
        </p>
      </div>

      <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-muted/30">
        <div className="text-sm">Network</div>
        <div className="font-medium flex items-center">
          <span className={`h-2 w-2 rounded-full mr-2 ${
            status.syncStatus === 'synced' ? 'bg-green-500' : 
            status.syncStatus === 'syncing' ? 'bg-yellow-500' : 'bg-red-500'
          }`}></span>
          {status.network}
        </div>
      </div>

      <div className="border rounded-lg p-4 mb-4">
        <h3 className="text-sm font-medium mb-3">Latest Transaction</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <div>
              <span className="text-xs text-muted-foreground">Status</span>
              <div className={`text-sm font-medium ${
                status.networkStatus === 'active' ? 'text-green-500' : 
                status.networkStatus === 'maintenance' ? 'text-yellow-500' : 'text-red-500'
              }`}>
                {status.networkStatus.charAt(0).toUpperCase() + status.networkStatus.slice(1)}
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Time</span>
              <div className="text-sm">
                {status.lastTransaction.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <ClipboardCheck className="h-4 w-4 mr-1 text-green-500" />
          <span className="text-sm">{status.totalTransactions} total transactions</span>
        </div>
        <div className={`text-xs px-2 py-1 rounded-full ${
          status.syncStatus === 'synced' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
          status.syncStatus === 'syncing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : 
          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
        }`}>
          {status.syncStatus.charAt(0).toUpperCase() + status.syncStatus.slice(1)}
        </div>
      </div>

      <Button variant="outline" className="w-full flex items-center justify-center">
        <RefreshCw className="h-4 w-4 mr-2" />
        Verify on Blockchain Explorer
      </Button>
    </motion.div>
  );
};

export default BlockchainStatus;
