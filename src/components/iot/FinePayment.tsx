import React, { useState } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { Button } from '@/components/ui/button';
import { FineAssessment } from '@/types/iot';
import { ethers } from 'ethers';
import { Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';

interface FinePaymentProps {
  fine: FineAssessment;
  onPaymentComplete: () => void;
}

const FinePayment: React.FC<FinePaymentProps> = ({ fine, onPaymentComplete }) => {
  const { account, provider, signer } = useWeb3();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  // Ensure fine amount is capped at $50
  const cappedAmount = Math.min(fine.amount, 50);

  const handlePayment = async () => {
    if (!provider || !signer || !account) {
      setError('Please connect your wallet to make a payment');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      // Convert USD amount to Wei (1 USD = 1e18 Wei)
      const amountInWei = ethers.utils.parseEther(cappedAmount.toString());

      // Create transaction data
      const txData = {
        to: import.meta.env.VITE_TREASURY_ADDRESS,
        value: amountInWei,
        from: account
      };

      // Send transaction
      const tx = await signer.sendTransaction(txData);
      setTransactionHash(tx.hash);

      // Wait for transaction to be mined
      await tx.wait();
      onPaymentComplete();
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Pay Fine</h2>
        <button
          onClick={onPaymentComplete}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Fine Details</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500 dark:text-gray-400">Category:</span>{' '}
              {fine.category.charAt(0).toUpperCase() + fine.category.slice(1)}
            </p>
            <p>
              <span className="text-gray-500 dark:text-gray-400">Amount:</span>{' '}
              <span className="font-medium">${cappedAmount.toFixed(2)}</span>
              {fine.amount > 50 && (
                <span className="ml-1 text-xs text-yellow-600 dark:text-yellow-400">
                  (Capped from ${fine.amount.toFixed(2)})
                </span>
              )}
            </p>
            <p>
              <span className="text-gray-500 dark:text-gray-400">Due Date:</span>{' '}
              {new Date(fine.dueDate).toLocaleDateString()}
            </p>
            <p>
              <span className="text-gray-500 dark:text-gray-400">Reason:</span>{' '}
              {fine.reason}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {transactionHash && (
          <div className="bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm">
            Transaction successful! Hash: {transactionHash.slice(0, 6)}...{transactionHash.slice(-4)}
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={isProcessing || !account}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
            isProcessing || !account
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isProcessing ? 'Processing...' : !account ? 'Connect Wallet' : 'Pay Fine'}
        </button>
      </div>
    </div>
  );
};

export default FinePayment; 