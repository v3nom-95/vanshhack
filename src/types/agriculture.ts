
// Agriculture System Types

export type FarmEntityType = 'farmland' | 'greenhouse' | 'orchard' | 'livestock';

export interface SoilData {
  moisture: number;
  temperature: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  conductivity: number;
  lastUpdated: number;
}

export interface ClimateData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  solarRadiation: number;
  weatherCondition: string;
  forecast: {
    date: string;
    condition: string;
    minTemp: number;
    maxTemp: number;
    rainfall: number;
  }[];
  lastUpdated: number;
}

export interface FarmData {
  id: string;
  name: string;
  type: FarmEntityType;
  size: number; // in acres
  location: {
    latitude: number;
    longitude: number;
    region: string;
  };
  mainCrops: string[];
  waterSource: string[];
  irrigationSystem: string;
  lastHarvest?: {
    date: string;
    yield: number;
    quality: number;
  };
}

export interface ZeroWasteScoreData {
  overall: number;
  categories: {
    waterEfficiency: number;
    soilHealth: number;
    biodiversity: number;
    energyUse: number;
    wasteManagement: number;
    carbonFootprint: number;
  };
  trend: 'improving' | 'stable' | 'declining';
  ranking: number;
  totalFarms: number;
}

export interface AgricultureRecommendation {
  category: keyof ZeroWasteScoreData['categories'];
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: string;
  suggestedActions: string[];
  implementationCost: 'low' | 'medium' | 'high';
  estimatedReturn: string;
}

export interface CropSuggestion {
  name: string;
  suitabilityScore: number;
  waterRequirements: number;
  growthPeriod: number;
  expectedYield: number;
  idealPlantingDate: string;
  description: string;
  benefits: string[];
  rotationGroup: string;
  companionPlants: string[];
}
