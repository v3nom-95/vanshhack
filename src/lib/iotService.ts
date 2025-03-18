
import { AggregatedSensorData, BlockchainStatusData, EntityType, GreenCreditScoreData } from '@/types/iot';

// Mock data generator for demo purposes
// In a real application, this would connect to actual IoT sensors and a trained ML model
export const fetchEntityData = async (entityType: EntityType, entityId: string): Promise<AggregatedSensorData> => {
  console.log(`Fetching data for ${entityType} with ID: ${entityId}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate realistic but random data based on entity type
  const baseAQI = entityType === 'company' ? 80 : entityType === 'city' ? 60 : 40;
  const baseEnergy = entityType === 'company' ? 2000 : entityType === 'city' ? 5000 : 200;
  const baseWaste = entityType === 'company' ? 500 : entityType === 'city' ? 2000 : 20;
  const baseCO2 = entityType === 'company' ? 1200 : entityType === 'city' ? 5000 : 50;
  
  // Add some randomness
  const randomFactor = () => 0.8 + Math.random() * 0.4; // Between 0.8 and 1.2
  
  return {
    airQuality: {
      aqi: baseAQI * randomFactor(),
      pm25: (baseAQI / 10) * randomFactor(),
      pm10: (baseAQI / 5) * randomFactor(),
      o3: (baseAQI / 20) * randomFactor(),
      no2: (baseAQI / 15) * randomFactor(),
      so2: (baseAQI / 25) * randomFactor(),
      co: (baseAQI / 8) * randomFactor(),
    },
    climate: {
      temperature: 20 + (Math.random() * 15),
      humidity: 40 + (Math.random() * 40),
      weatherCondition: ['Sunny', 'Cloudy', 'Rainy', 'Windy'][Math.floor(Math.random() * 4)],
    },
    resources: {
      energyConsumption: baseEnergy * randomFactor(),
      waterUsage: (baseEnergy / 10) * randomFactor(),
      wasteProduction: baseWaste * randomFactor(),
    },
    emissions: {
      carbonFootprint: baseCO2 * randomFactor(),
      greenhouseGases: (baseCO2 / 2) * randomFactor(),
    },
    lastUpdated: Date.now(),
  };
};

// ML-based green score calculation
// This is a simplified version - a real implementation would use a trained model
export const calculateGreenScore = async (entityType: EntityType, data: AggregatedSensorData): Promise<GreenCreditScoreData> => {
  console.log(`Calculating green score for ${entityType} with data:`, data);
  
  // Simulate ML processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Calculate individual category scores (0-100, higher is better)
  const airQualityScore = calculateAirQualityScore(data.airQuality);
  const energyScore = calculateEnergyScore(data.resources.energyConsumption, entityType);
  const waterScore = calculateWaterScore(data.resources.waterUsage, entityType);
  const wasteScore = calculateWasteScore(data.resources.wasteProduction, entityType);
  const carbonScore = calculateCarbonScore(data.emissions, entityType);
  
  // Calculate overall score (weighted average)
  const weights = {
    airQuality: 0.25,
    energy: 0.20,
    water: 0.15,
    waste: 0.15,
    carbon: 0.25
  };
  
  const overallScore = Math.round(
    airQualityScore * weights.airQuality +
    energyScore * weights.energy +
    waterScore * weights.water +
    wasteScore * weights.waste +
    carbonScore * weights.carbon
  );
  
  // Generate random ranking data for demo
  const totalEntities = entityType === 'company' ? 500 : entityType === 'city' ? 200 : 10000;
  const ranking = Math.floor(Math.random() * (totalEntities / 3)) + 1;
  
  // Determine trend based on score (random for demo)
  const trendOptions: ['improving', 'stable', 'declining'] = ['improving', 'stable', 'declining'];
  const trend = trendOptions[Math.floor(Math.random() * 3)];
  
  return {
    overall: overallScore,
    categories: {
      airQuality: airQualityScore,
      energyEfficiency: energyScore,
      waterConservation: waterScore,
      wasteManagement: wasteScore,
      carbonFootprint: carbonScore,
    },
    trend,
    ranking,
    totalEntities,
  };
};

// Blockchain integration simulation
export const storeOnBlockchain = async (
  entityType: EntityType, 
  entityId: string, 
  data: AggregatedSensorData, 
  score: GreenCreditScoreData
): Promise<BlockchainStatusData> => {
  console.log(`Storing data for ${entityType} ${entityId} on blockchain`);
  
  // Simulate blockchain transaction delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate fake transaction hash
  const hash = '0x' + Array.from({length: 64}, () => 
    '0123456789abcdef'[Math.floor(Math.random() * 16)]
  ).join('');
  
  // In a real implementation, this would interact with Ethereum or another blockchain
  return {
    lastTransaction: {
      hash,
      timestamp: Date.now(),
      status: 'confirmed',
    },
    totalTransactions: Math.floor(Math.random() * 1000) + 1,
    network: 'Polygon Testnet',
    syncStatus: 'synced',
  };
};

// Helper functions for scoring calculations
function calculateAirQualityScore(airQuality: AggregatedSensorData['airQuality']): number {
  // AQI scoring (lower AQI is better)
  // 0-50: Good (90-100)
  // 51-100: Moderate (70-89)
  // 101-150: Unhealthy for sensitive groups (50-69)
  // 151-200: Unhealthy (30-49)
  // 201-300: Very Unhealthy (10-29)
  // 301+: Hazardous (0-9)
  
  const aqi = airQuality.aqi;
  
  if (aqi <= 50) return 90 + ((50 - aqi) / 50) * 10;
  if (aqi <= 100) return 70 + ((100 - aqi) / 50) * 20;
  if (aqi <= 150) return 50 + ((150 - aqi) / 50) * 20;
  if (aqi <= 200) return 30 + ((200 - aqi) / 50) * 20;
  if (aqi <= 300) return 10 + ((300 - aqi) / 100) * 20;
  return Math.max(0, 10 - ((aqi - 300) / 100) * 10);
}

function calculateEnergyScore(consumption: number, entityType: EntityType): number {
  // Different baselines based on entity type
  let baseline = entityType === 'company' ? 2000 : 
                entityType === 'city' ? 5000 : 200;
  
  // Lower consumption is better
  const ratio = baseline / consumption;
  return Math.min(100, Math.max(0, Math.round(ratio * 70)));
}

function calculateWaterScore(usage: number, entityType: EntityType): number {
  // Different baselines based on entity type
  let baseline = entityType === 'company' ? 200 : 
                entityType === 'city' ? 500 : 20;
  
  // Lower usage is better
  const ratio = baseline / usage;
  return Math.min(100, Math.max(0, Math.round(ratio * 70)));
}

function calculateWasteScore(production: number, entityType: EntityType): number {
  // Different baselines based on entity type
  let baseline = entityType === 'company' ? 500 : 
                entityType === 'city' ? 2000 : 20;
  
  // Lower waste production is better
  const ratio = baseline / production;
  return Math.min(100, Math.max(0, Math.round(ratio * 70)));
}

function calculateCarbonScore(emissions: AggregatedSensorData['emissions'], entityType: EntityType): number {
  // Different baselines based on entity type
  let baseline = entityType === 'company' ? 1200 : 
                entityType === 'city' ? 5000 : 50;
  
  // Lower carbon footprint is better
  const ratio = baseline / emissions.carbonFootprint;
  return Math.min(100, Math.max(0, Math.round(ratio * 70)));
}
