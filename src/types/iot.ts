export type EntityType = 'company' | 'civilian' | 'city';

export interface SensorReading {
  id: string;
  timestamp: number;
  type: 'airQuality' | 'temperature' | 'humidity' | 'noise' | 'waterQuality' | 'energyConsumption' | 'wasteProduction' | 'carbonEmission';
  value: number;
  unit: string;
  status: 'good' | 'moderate' | 'poor' | 'critical';
}

export interface AggregatedSensorData {
  airQuality: {
    aqi: number;
    pm25: number;
    pm10: number;
    o3: number;
    no2: number;
    so2: number;
    co: number;
  };
  climate: {
    temperature: number;
    humidity: number;
    weatherCondition: string;
  };
  resources: {
    energyConsumption: number;
    waterUsage: number;
    wasteProduction: number;
  };
  emissions: {
    carbonFootprint: number;
    greenhouseGases: number;
  };
  lastUpdated: number;
}

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  description?: string;
}

export interface RecommendationItem {
  title: string;
  description: string;
  impact: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  suggestedActions: string[];
  category: string;
}

export interface FineAssessment {
  amount: number;
  reason: string;
  dueDate: Date;
  appealDeadline: Date;
  regulationCode?: string;
  category: string;
}

export interface IoTDataFeedProps {
  airQuality: number;
  temperature: number;
  humidity: number;
  energyUsage: number;
  waterUsage: number;
  isLoading: boolean;
}

export interface GreenCreditScoreData {
  score: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: Date;
}

export interface GreenCreditScoreProps {
  score: GreenCreditScoreData;
  isLoading: boolean;
}

export interface BlockchainStatusData {
  lastTransaction: Date;
  networkStatus: 'active' | 'inactive' | 'maintenance';
  syncStatus: 'synced' | 'syncing' | 'error';
  transactionCount: number;
  totalTransactions: number;
  network: string;
}

export interface BlockchainStatusProps {
  status: BlockchainStatusData;
  isLoading: boolean;
}

export interface EntitySelectorProps {
  selectedEntityId: string | null;
  onEntitySelect: (entityId: string) => void;
  entityType: EntityType;
  onEntityTypeChange: (type: EntityType) => void;
}

export interface SustainabilityRecommendationsProps {
  recommendations: RecommendationItem[];
  fines: FineAssessment[];
  entityType: EntityType;
  isLoading: boolean;
}
