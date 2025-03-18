import React, { useState } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { Button } from '@/components/ui/button';
import { FineAssessment } from '@/types/iot';
import { ethers } from 'ethers';
import { Loader2 } from 'lucide-react';

interface FinePaymentProps {
  fine: FineAssessment;
  onPaymentComplete: () => void;
}

const FinePayment: React.FC<FinePaymentProps> = ({ fine, onPaymentComplete }) => {
  const { provider, signer, isConnected } = useWeb3();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!provider || !signer) {
      setError('Please connect your wallet first');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Convert fine amount to Wei (assuming fine amount is in ETH)
      const amountInWei = ethers.utils.parseEther(fine.amount.toString());

      // Create transaction object
      const tx = {
        to: process.env.VITE_FINE_PAYMENT_CONTRACT_ADDRESS,
        value: amountInWei,
      };

      // Send transaction
      const transaction = await signer.sendTransaction(tx);
      
      // Wait for transaction to be mined
      await transaction.wait();

      // Call onPaymentComplete callback
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
      <h3 className="text-xl font-semibold mb-4">Pay Fine</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Amount</h4>
          <p className="text-2xl font-bold">${fine.amount.toLocaleString()}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Reason</h4>
          <p>{fine.reason}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
          <p>{new Date(fine.dueDate).toLocaleDateString()}</p>
        </div>
        
        {fine.regulationCode && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Regulation Code</h4>
            <p>{fine.regulationCode}</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={onPaymentComplete}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          onClick={handlePayment}
          disabled={!isConnected || isProcessing}
          className="flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Pay Fine'
          )}
        </Button>
      </div>
    </div>
  );
};

export default FinePayment; 