import React from 'react';
import { motion } from 'framer-motion';
import { GreenCreditScoreProps } from '@/types/iot';

const GreenCreditScore: React.FC<GreenCreditScoreProps> = ({ score, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-6 bg-card rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Green Credit Score</h3>
        <div className="text-center text-muted-foreground">
          Loading score...
        </div>
      </div>
    );
  }

  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-500';
    if (value >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-card rounded-lg shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-4">Green Credit Score</h3>
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-8 border-gray-200 dark:border-gray-700 flex items-center justify-center">
            <div className={`text-4xl font-bold ${getScoreColor(score.score)}`}>
              {score.score}
            </div>
          </div>
          <div className={`absolute -top-2 -right-2 text-2xl ${getTrendColor(score.trend)}`}>
            {getTrendIcon(score.trend)}
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground text-center">
          Last updated: {score.lastUpdated.toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
};

export default GreenCreditScore;
