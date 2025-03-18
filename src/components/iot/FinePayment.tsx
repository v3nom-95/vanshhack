import React, { useState } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { Button } from '@/components/ui/button';
import { FineAssessment } from '@/types/iot';
import { ethers } from 'ethers';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface FinePaymentProps {
  fine: FineAssessment;
  onPaymentComplete: () => void;
}

const FinePayment: React.FC<FinePaymentProps> = ({ fine, onPaymentComplete }) => {
  const { provider, signer, isConnected } = useWeb3();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!provider || !signer) {
      setError('Please connect your wallet first');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setIsSuccess(false);
    setTransactionHash(null);

    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to make payments');
      }

      // Request account access if not already connected
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (err) {
        throw new Error('Please approve the connection request in MetaMask');
      }

      // Convert fine amount to Wei (assuming fine amount is in ETH)
      const amountInWei = ethers.utils.parseEther(fine.amount.toString());

      // Create transaction object
      const tx = {
        to: import.meta.env.VITE_FINE_PAYMENT_CONTRACT_ADDRESS,
        value: amountInWei,
        data: ethers.utils.defaultAbiCoder.encode(
          ['string', 'string', 'uint256'],
          [fine.reason, fine.category, fine.amount]
        ),
      };

      // Get gas estimate
      const gasEstimate = await provider.estimateGas(tx);
      const gasPrice = await provider.getGasPrice();
      
      // Add 20% buffer to gas estimate
      const gasLimit = gasEstimate.mul(120).div(100);

      // Send transaction with gas parameters
      const transaction = await signer.sendTransaction({
        ...tx,
        gasLimit,
        gasPrice: gasPrice.mul(120).div(100), // Add 20% to gas price for faster processing
      });
      
      // Store transaction hash
      setTransactionHash(transaction.hash);
      
      // Wait for transaction to be mined
      const receipt = await transaction.wait();
      
      if (receipt.status === 1) {
        // Show success state
        setIsSuccess(true);
        
        // Wait for 2 seconds to show success message
        setTimeout(() => {
          // Call onPaymentComplete callback to remove the fine
          onPaymentComplete();
        }, 2000);
      } else {
        throw new Error('Transaction failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      if (err instanceof Error) {
        if (err.message.includes('User rejected')) {
          setError('Payment was rejected in MetaMask');
        } else if (err.message.includes('insufficient funds')) {
          setError('Insufficient funds in your wallet');
        } else if (err.message.includes('network')) {
          setError('Please check your network connection and try again');
        } else if (err.message.includes('nonce')) {
          setError('Transaction nonce error. Please try again');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to process payment');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Fine Details</h3>
          <p className="text-sm text-gray-600">{fine.reason}</p>
          <p className="text-sm text-gray-600">Amount: {fine.amount} ETH</p>
          <p className="text-sm text-gray-600">Category: {fine.category}</p>
          {transactionHash && (
            <p className="text-sm text-blue-600 mt-2">
              Transaction Hash: {transactionHash.slice(0, 6)}...{transactionHash.slice(-4)}
            </p>
          )}
        </div>
        {isSuccess ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <span>Payment Successful!</span>
          </div>
        ) : (
          <Button
            onClick={handlePayment}
            disabled={isProcessing || !isConnected}
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
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-2 rounded">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default FinePayment; 