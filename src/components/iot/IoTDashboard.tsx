import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EntityType, GreenCreditScoreData, BlockchainStatusData } from '@/types/iot';
import EntitySelector from './EntitySelector';
import IoTDataFeed from './IoTDataFeed';
import GreenCreditScore from './GreenCreditScore';
import BlockchainStatus from './BlockchainStatus';
import SustainabilityRecommendations from './SustainabilityRecommendations';

interface DashboardData {
  airQuality: number;
  temperature: number;
  humidity: number;
  energyUsage: number;
  waterUsage: number;
  score: {
    score: number;
    trend: 'up' | 'down' | 'stable';
    lastUpdated: Date;
  };
  blockchainStatus: BlockchainStatusData;
  recommendations: Array<{
    title: string;
    description: string;
    impact: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    suggestedActions: string[];
    category: string;
  }>;
  fines: Array<{
    amount: number;
    reason: string;
    dueDate: Date;
    appealDeadline: Date;
    regulationCode?: string;
    category: string;
  }>;
}

const IoTDashboard: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [entityType, setEntityType] = useState<EntityType>('company');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData>({
    airQuality: 85,
    temperature: 22,
    humidity: 45,
    energyUsage: 2500,
    waterUsage: 1200,
    score: {
      score: 92,
      trend: 'up',
      lastUpdated: new Date(),
    },
    blockchainStatus: {
      lastTransaction: new Date(),
      networkStatus: 'active',
      syncStatus: 'synced',
      transactionCount: 156,
      totalTransactions: 1234,
      network: 'EcoChain',
    },
    recommendations: [
      {
        title: 'Optimize Energy Usage',
        description: 'Your energy consumption is 15% above the recommended level.',
        impact: 'Reducing energy usage by 15% could save $3,000 annually and reduce carbon emissions.',
        severity: 'high',
        suggestedActions: [
          'Install LED lighting',
          'Implement smart thermostats',
          'Schedule HVAC maintenance',
        ],
        category: 'energy',
      },
    ],
    fines: [
      {
        amount: 2500,
        reason: 'Exceeded monthly water usage limits',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        appealDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        regulationCode: 'WATER-2024-001',
        category: 'water',
      },
    ],
  });

  // Update data every 5 seconds
  useEffect(() => {
    if (!selectedEntity) return;

    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        airQuality: Math.floor(Math.random() * (150 - 50 + 1)) + 50,
        temperature: Math.floor(Math.random() * (28 - 18 + 1)) + 18,
        humidity: Math.floor(Math.random() * (65 - 35 + 1)) + 35,
        energyUsage: Math.floor(Math.random() * (3000 - 2000 + 1)) + 2000,
        waterUsage: Math.floor(Math.random() * (1500 - 1000 + 1)) + 1000,
        score: {
          score: Math.max(0, Math.min(100, prevData.score.score + (Math.random() > 0.5 ? 1 : -1))),
          trend: Math.random() > 0.5 ? 'up' : 'down',
          lastUpdated: new Date(),
        },
        blockchainStatus: {
          ...prevData.blockchainStatus,
          lastTransaction: new Date(),
          transactionCount: prevData.blockchainStatus.transactionCount + Math.floor(Math.random() * 5) + 1,
          totalTransactions: prevData.blockchainStatus.totalTransactions + Math.floor(Math.random() * 5) + 1,
          syncStatus: Math.random() > 0.9 ? 'syncing' : 'synced',
          networkStatus: Math.random() > 0.95 ? 'maintenance' : 'active',
        },
        recommendations: prevData.recommendations.map(rec => 
          Math.random() > 0.7 ? {
            ...rec,
            severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as 'low' | 'medium' | 'high' | 'critical',
            suggestedActions: [
              'Install LED lighting',
              'Implement smart thermostats',
              'Schedule HVAC maintenance',
              'Upgrade insulation',
              'Install solar panels',
            ].sort(() => Math.random() - 0.5).slice(0, 3),
          } : rec
        ),
        fines: prevData.fines.map(fine =>
          Math.random() > 0.8 ? {
            ...fine,
            amount: Math.floor(Math.random() * 4000) + 1000,
            dueDate: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
            appealDeadline: new Date(Date.now() + Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000),
          } : fine
        ),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedEntity]);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedEntity) return;

      setIsLoading(true);
      setError(null);

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Fetching data for entity:', selectedEntity);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedEntity]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">IoT Dashboard</h1>
          <EntitySelector
            selectedEntityId={selectedEntity}
            onEntitySelect={setSelectedEntity}
            entityType={entityType}
            onEntityTypeChange={setEntityType}
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 p-4 rounded-lg">
            {error}
          </div>
        )}

        {!selectedEntity ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Please select an entity to view its data and recommendations.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <IoTDataFeed
              airQuality={data.airQuality}
              temperature={data.temperature}
              humidity={data.humidity}
              energyUsage={data.energyUsage}
              waterUsage={data.waterUsage}
              isLoading={isLoading}
            />

            <GreenCreditScore
              score={data.score}
              isLoading={isLoading}
            />

            <BlockchainStatus
              status={data.blockchainStatus}
              isLoading={isLoading}
            />

            <div className="md:col-span-2 lg:col-span-3">
              <SustainabilityRecommendations
                recommendations={data.recommendations}
                fines={data.fines}
                entityType={entityType}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default IoTDashboard; 