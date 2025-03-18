
import { 
  FarmEntityType, 
  FarmData, 
  SoilData, 
  ClimateData, 
  ZeroWasteScoreData, 
  AgricultureRecommendation,
  CropSuggestion 
} from '@/types/agriculture';

// Mock data generator for demo purposes
// In a real application, this would connect to actual IoT sensors and a trained ML model
export const fetchFarmData = async (entityType: FarmEntityType, entityId: string): Promise<FarmData> => {
  console.log(`Fetching farm data for ${entityType} with ID: ${entityId}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Demo farm data
  const farms: Record<string, FarmData> = {
    'demo-farm-01': {
      id: 'demo-farm-01',
      name: 'Green Valley Farms',
      type: 'farmland',
      size: 150,
      location: {
        latitude: 34.052235,
        longitude: -118.243683,
        region: 'California Central Valley'
      },
      mainCrops: ['Corn', 'Soybeans', 'Wheat'],
      waterSource: ['Groundwater', 'Rainwater harvesting'],
      irrigationSystem: 'Drip irrigation',
      lastHarvest: {
        date: '2023-10-15',
        yield: 85,
        quality: 78
      }
    },
    'demo-farm-02': {
      id: 'demo-farm-02',
      name: 'Sunlight Greenhouses',
      type: 'greenhouse',
      size: 12,
      location: {
        latitude: 37.773972,
        longitude: -122.431297,
        region: 'California Coast'
      },
      mainCrops: ['Tomatoes', 'Cucumbers', 'Peppers', 'Leafy greens'],
      waterSource: ['Municipal', 'Recycled water'],
      irrigationSystem: 'Hydroponics',
      lastHarvest: {
        date: '2023-11-05',
        yield: 92,
        quality: 95
      }
    },
    'demo-farm-03': {
      id: 'demo-farm-03',
      name: 'Fruitful Orchards',
      type: 'orchard',
      size: 75,
      location: {
        latitude: 38.581572,
        longitude: -121.494400,
        region: 'Northern California'
      },
      mainCrops: ['Apples', 'Peaches', 'Pears', 'Cherries'],
      waterSource: ['River', 'Rainwater harvesting'],
      irrigationSystem: 'Micro-sprinklers',
      lastHarvest: {
        date: '2023-09-20',
        yield: 80,
        quality: 88
      }
    },
    'demo-farm-04': {
      id: 'demo-farm-04',
      name: 'Meadow Ranch',
      type: 'livestock',
      size: 320,
      location: {
        latitude: 36.778259,
        longitude: -119.417931,
        region: 'Central California'
      },
      mainCrops: ['Alfalfa', 'Grass pasture'],
      waterSource: ['Groundwater', 'Pond'],
      irrigationSystem: 'Flood irrigation',
      lastHarvest: {
        date: '2023-08-10',
        yield: 72,
        quality: 65
      }
    }
  };
  
  // Return the requested farm or a generic one if not found
  return farms[entityId] || {
    id: entityId,
    name: `Farm ${entityId}`,
    type: entityType,
    size: Math.floor(Math.random() * 200) + 50,
    location: {
      latitude: 36.778259 + (Math.random() * 2 - 1),
      longitude: -119.417931 + (Math.random() * 2 - 1),
      region: 'California'
    },
    mainCrops: ['Corn', 'Wheat'],
    waterSource: ['Groundwater'],
    irrigationSystem: 'Sprinkler'
  };
};

export const fetchSoilData = async (entityType: FarmEntityType, entityId: string): Promise<SoilData> => {
  console.log(`Fetching soil data for ${entityType} with ID: ${entityId}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate realistic but random soil data
  const baselineData: Record<FarmEntityType, Partial<SoilData>> = {
    'farmland': {
      moisture: 45,
      ph: 6.5,
      nitrogen: 35,
      phosphorus: 15,
      potassium: 25
    },
    'greenhouse': {
      moisture: 60,
      ph: 6.8,
      nitrogen: 45,
      phosphorus: 20,
      potassium: 30
    },
    'orchard': {
      moisture: 40,
      ph: 6.3,
      nitrogen: 30,
      phosphorus: 25,
      potassium: 35
    },
    'livestock': {
      moisture: 30,
      ph: 6.0,
      nitrogen: 20,
      phosphorus: 10,
      potassium: 15
    }
  };
  
  const baseline = baselineData[entityType] || baselineData.farmland;
  
  // Add some randomness
  const randomFactor = () => 0.8 + Math.random() * 0.4; // Between 0.8 and 1.2
  
  return {
    moisture: (baseline.moisture || 40) * randomFactor(),
    temperature: 15 + Math.random() * 10,
    ph: (baseline.ph || 6.5) * randomFactor(),
    nitrogen: (baseline.nitrogen || 30) * randomFactor(),
    phosphorus: (baseline.phosphorus || 15) * randomFactor(),
    potassium: (baseline.potassium || 25) * randomFactor(),
    organicMatter: 2 + Math.random() * 4,
    conductivity: 0.2 + Math.random() * 0.8,
    lastUpdated: Date.now()
  };
};

export const fetchClimateData = async (entityType: FarmEntityType, entityId: string): Promise<ClimateData> => {
  console.log(`Fetching climate data for ${entityType} with ID: ${entityId}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Weather conditions array
  const weatherConditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Rain', 'Stormy', 'Foggy'];
  
  // Generate 5-day forecast
  const forecast = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    
    return {
      date: date.toISOString().split('T')[0],
      condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
      minTemp: 10 + Math.random() * 15,
      maxTemp: 20 + Math.random() * 15,
      rainfall: Math.random() < 0.3 ? 0 : Math.random() * 15
    };
  });
  
  return {
    temperature: 15 + Math.random() * 15,
    humidity: 40 + Math.random() * 40,
    rainfall: Math.random() < 0.5 ? 0 : Math.random() * 10,
    windSpeed: Math.random() * 30,
    solarRadiation: 100 + Math.random() * 900,
    weatherCondition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)],
    forecast,
    lastUpdated: Date.now()
  };
};

// AI-based zero waste score calculation
export const calculateZeroWasteScore = async (
  entityType: FarmEntityType, 
  farmData: FarmData, 
  soilData: SoilData, 
  climateData: ClimateData
): Promise<ZeroWasteScoreData> => {
  console.log(`Calculating zero waste score for ${entityType}`);
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Calculate individual category scores (0-100, higher is better)
  const waterEfficiency = calculateWaterEfficiencyScore(entityType, farmData, soilData, climateData);
  const soilHealth = calculateSoilHealthScore(soilData);
  const biodiversity = calculateBiodiversityScore(entityType, farmData);
  const energyUse = calculateEnergyUseScore(entityType, farmData);
  const wasteManagement = calculateWasteManagementScore(entityType, farmData);
  const carbonFootprint = calculateCarbonFootprintScore(entityType, farmData, climateData);
  
  // Calculate overall score (weighted average)
  const weights = {
    waterEfficiency: 0.25,
    soilHealth: 0.2,
    biodiversity: 0.15,
    energyUse: 0.1,
    wasteManagement: 0.15,
    carbonFootprint: 0.15
  };
  
  const overallScore = Math.round(
    waterEfficiency * weights.waterEfficiency +
    soilHealth * weights.soilHealth +
    biodiversity * weights.biodiversity +
    energyUse * weights.energyUse +
    wasteManagement * weights.wasteManagement +
    carbonFootprint * weights.carbonFootprint
  );
  
  // Generate random ranking data for demo
  const totalFarms = Math.floor(Math.random() * 500) + 500;
  const ranking = Math.floor(Math.random() * (totalFarms / 3)) + 1;
  
  // Determine trend based on score (random for demo)
  const trendOptions: ['improving', 'stable', 'declining'] = ['improving', 'stable', 'declining'];
  const trend = trendOptions[Math.floor(Math.random() * 3)];
  
  return {
    overall: overallScore,
    categories: {
      waterEfficiency,
      soilHealth,
      biodiversity,
      energyUse,
      wasteManagement,
      carbonFootprint
    },
    trend,
    ranking,
    totalFarms
  };
};

// AI-generated agricultural recommendations
export const getAgricultureRecommendations = async (
  entityType: FarmEntityType,
  farmData: FarmData,
  soilData: SoilData,
  climateData: ClimateData,
  zeroWasteScore: ZeroWasteScoreData
): Promise<AgricultureRecommendation[]> => {
  console.log(`Generating recommendations for ${entityType}`);
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const recommendations: AgricultureRecommendation[] = [];
  
  // Generate recommendations based on the lowest-scoring categories
  const categories = Object.entries(zeroWasteScore.categories)
    .map(([key, value]) => ({ 
      category: key as keyof ZeroWasteScoreData['categories'], 
      score: value 
    }))
    .sort((a, b) => a.score - b.score);
  
  // Add recommendations for the lowest scoring categories
  categories.slice(0, 3).forEach(({ category, score }) => {
    const severity = score < 30 ? 'critical' : score < 50 ? 'high' : score < 70 ? 'medium' : 'low';
    
    recommendations.push(getRecommendationForCategory(entityType, category, severity, farmData, soilData, climateData));
  });
  
  // Always add a water efficiency recommendation if rainfall is low
  if (climateData.rainfall < 5 && !recommendations.some(r => r.category === 'waterEfficiency')) {
    recommendations.push(getRecommendationForCategory(entityType, 'waterEfficiency', 'medium', farmData, soilData, climateData));
  }
  
  // Add soil health recommendation if pH is outside ideal range
  if ((soilData.ph < 6.0 || soilData.ph > 7.5) && !recommendations.some(r => r.category === 'soilHealth')) {
    recommendations.push(getRecommendationForCategory(entityType, 'soilHealth', 'medium', farmData, soilData, climateData));
  }
  
  return recommendations;
};

// AI-suggested crops based on soil, climate, and sustainability
export const getCropSuggestions = async (
  entityType: FarmEntityType,
  farmData: FarmData,
  soilData: SoilData,
  climateData: ClimateData,
  zeroWasteScore: ZeroWasteScoreData
): Promise<CropSuggestion[]> => {
  console.log(`Generating crop suggestions for ${entityType}`);
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // List of potential crops with their characteristics
  const cropDatabase: Partial<CropSuggestion>[] = [
    {
      name: 'Quinoa',
      waterRequirements: 30,
      growthPeriod: 120,
      expectedYield: 75,
      rotationGroup: 'Pseudo-cereals',
      benefits: ['Drought-resistant', 'High nutrition value', 'Low input requirements'],
      companionPlants: ['Sunflowers', 'Corn']
    },
    {
      name: 'Hemp',
      waterRequirements: 40,
      growthPeriod: 110,
      expectedYield: 85,
      rotationGroup: 'Fiber crops',
      benefits: ['Soil remediation', 'Carbon sequestration', 'Multiple product streams'],
      companionPlants: ['Peas', 'Beans']
    },
    {
      name: 'Legume Cover Crop Mix',
      waterRequirements: 35,
      growthPeriod: 90,
      expectedYield: 0, // Cover crop
      rotationGroup: 'Legumes',
      benefits: ['Nitrogen fixation', 'Erosion prevention', 'Soil structure improvement'],
      companionPlants: ['Most field crops']
    },
    {
      name: 'Sweet Potatoes',
      waterRequirements: 50,
      growthPeriod: 120,
      expectedYield: 90,
      rotationGroup: 'Root vegetables',
      benefits: ['Erosion control', 'Weed suppression', 'High nutrition value'],
      companionPlants: ['Thyme', 'Dill']
    },
    {
      name: 'Amaranth',
      waterRequirements: 25,
      growthPeriod: 75,
      expectedYield: 65,
      rotationGroup: 'Pseudo-cereals',
      benefits: ['Drought-tolerant', 'Heat-tolerant', 'Dual-purpose (grain and greens)'],
      companionPlants: ['Onions', 'Cilantro']
    },
    {
      name: 'Millet',
      waterRequirements: 20,
      growthPeriod: 60,
      expectedYield: 60,
      rotationGroup: 'Cereals',
      benefits: ['Low water needs', 'Short growing season', 'Weed suppressive'],
      companionPlants: ['Sunflowers', 'Legumes']
    },
    {
      name: 'Sorghum',
      waterRequirements: 35,
      growthPeriod: 120,
      expectedYield: 80,
      rotationGroup: 'Cereals',
      benefits: ['Drought-resistant', 'Heat-tolerant', 'Multiple uses'],
      companionPlants: ['Cowpeas', 'Soybeans']
    }
  ];
  
  // Generate suitability scores for each crop based on farm conditions
  const scoredCrops = cropDatabase.map(crop => {
    // Calculate a suitability score based on soil, climate, and farm conditions
    let suitabilityScore = 0;
    
    // Water suitability (higher score for crops with lower water needs in dry areas)
    const waterScore = (100 - (crop.waterRequirements || 50)) * (1 / (climateData.rainfall + 5));
    suitabilityScore += waterScore;
    
    // Soil suitability
    const soilScore = (100 - Math.abs((soilData.ph - 6.5) * 20)); // Ideal pH around 6.5
    suitabilityScore += soilScore;
    
    // Temperature suitability
    const tempIdeal = 22; // Most crops prefer temperatures around 18-26°C
    const tempScore = 100 - Math.abs(climateData.temperature - tempIdeal) * 5;
    suitabilityScore += tempScore;
    
    // Normalize score to 0-100
    suitabilityScore = Math.max(0, Math.min(100, suitabilityScore / 3));
    
    // Generate planting date based on climate
    const now = new Date();
    const plantingDate = new Date(now.getFullYear(), now.getMonth() + 1, 15);
    
    // Generate description
    const moistureDesc = soilData.moisture > 50 ? 'moist' : 'drier';
    const phDesc = soilData.ph < 6.5 ? 'slightly acidic' : soilData.ph > 7 ? 'slightly alkaline' : 'neutral';
    const description = `${crop.name} is well-suited for your ${moistureDesc}, ${phDesc} soil conditions. It requires relatively ${crop.waterRequirements && crop.waterRequirements < 30 ? 'low' : 'moderate'} water and will thrive in your climate zone.`;
    
    return {
      ...crop,
      suitabilityScore,
      idealPlantingDate: plantingDate.toISOString().split('T')[0],
      description
    } as CropSuggestion;
  });
  
  // Sort by suitability score and return top 5
  return scoredCrops
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
    .slice(0, 5);
};

// Blockchain integration for agriculture data
export const storeAgricultureData = async (
  entityType: FarmEntityType,
  entityId: string,
  data: {
    farmData: FarmData;
    soilData: SoilData;
    climateData: ClimateData;
    zeroWasteScore: ZeroWasteScoreData;
  }
) => {
  console.log(`Storing agriculture data for ${entityType} ${entityId} on blockchain`);
  
  // Simulate blockchain transaction delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate fake transaction hash
  const hash = '0x' + Array.from({length: 64}, () => 
    '0123456789abcdef'[Math.floor(Math.random() * 16)]
  ).join('');
  
  console.log(`Agriculture data stored on blockchain. Transaction hash: ${hash}`);
  
  // In a real implementation, this would interact with Ethereum or another blockchain
  return {
    success: true,
    hash,
    timestamp: Date.now()
  };
};

// Helper functions for scoring calculations
function calculateWaterEfficiencyScore(
  entityType: FarmEntityType, 
  farmData: FarmData, 
  soilData: SoilData, 
  climateData: ClimateData
): number {
  // Higher score for more efficient irrigation systems
  let irrigationScore = 0;
  switch (farmData.irrigationSystem.toLowerCase()) {
    case 'drip irrigation':
      irrigationScore = 90;
      break;
    case 'micro-sprinklers':
      irrigationScore = 80;
      break;
    case 'hydroponics':
      irrigationScore = 95;
      break;
    case 'sprinkler':
      irrigationScore = 60;
      break;
    case 'flood irrigation':
      irrigationScore = 30;
      break;
    default:
      irrigationScore = 50;
  }
  
  // Higher score for water source diversity and sustainable sources
  const waterSourceScore = Math.min(100, farmData.waterSource.length * 20 + 
    (farmData.waterSource.includes('Rainwater harvesting') ? 30 : 0) +
    (farmData.waterSource.includes('Recycled water') ? 30 : 0));
  
  // Adjust based on soil moisture and climate
  const soilMoistureAdjustment = soilData.moisture > 60 ? -10 : soilData.moisture < 30 ? -15 : 0;
  const climateAdjustment = climateData.rainfall > 5 ? 10 : -5;
  
  return Math.max(0, Math.min(100, 
    (irrigationScore * 0.5) + 
    (waterSourceScore * 0.4) + 
    soilMoistureAdjustment + 
    climateAdjustment
  ));
}

function calculateSoilHealthScore(soilData: SoilData): number {
  // Higher score for ideal pH (6.0-7.0)
  const phScore = 100 - Math.min(100, Math.abs(soilData.ph - 6.5) * 30);
  
  // Higher score for good nutrient balance
  const nutrientBalance = Math.min(100, 
    (soilData.nitrogen / 40 * 100) * 0.4 + 
    (soilData.phosphorus / 20 * 100) * 0.3 + 
    (soilData.potassium / 30 * 100) * 0.3
  );
  
  // Higher score for good organic matter
  const organicMatterScore = Math.min(100, soilData.organicMatter * 20);
  
  return Math.max(0, Math.min(100, 
    (phScore * 0.3) + 
    (nutrientBalance * 0.4) + 
    (organicMatterScore * 0.3)
  ));
}

function calculateBiodiversityScore(entityType: FarmEntityType, farmData: FarmData): number {
  // Higher score for more crop diversity
  const cropDiversityScore = Math.min(100, farmData.mainCrops.length * 25);
  
  // Different baseline based on farm type
  let baseScore = 50;
  switch (entityType) {
    case 'orchard':
      baseScore = 70; // Orchards often have higher biodiversity
      break;
    case 'greenhouse':
      baseScore = 40; // Greenhouses often have lower biodiversity
      break;
    case 'livestock':
      baseScore = 60; // Livestock farms can have good biodiversity if managed well
      break;
  }
  
  return Math.max(0, Math.min(100, 
    (baseScore * 0.6) + 
    (cropDiversityScore * 0.4)
  ));
}

function calculateEnergyUseScore(entityType: FarmEntityType, farmData: FarmData): number {
  // Different baseline based on farm type
  let baseScore = 60;
  switch (entityType) {
    case 'greenhouse':
      baseScore = 40; // Greenhouses often use more energy
      break;
    case 'farmland':
      baseScore = 70; // Open farmland can use less energy
      break;
    case 'orchard':
      baseScore = 80; // Orchards typically use less energy than annual crops
      break;
    case 'livestock':
      baseScore = 50; // Livestock operations can be energy-intensive
      break;
  }
  
  // Adjust based on irrigation (more efficient systems use less energy)
  let irrigationAdjustment = 0;
  switch (farmData.irrigationSystem.toLowerCase()) {
    case 'drip irrigation':
      irrigationAdjustment = 15;
      break;
    case 'hydroponics':
      irrigationAdjustment = -10; // Can be energy-intensive
      break;
    case 'flood irrigation':
      irrigationAdjustment = -15; // Pumping large volumes of water
      break;
  }
  
  return Math.max(0, Math.min(100, baseScore + irrigationAdjustment));
}

function calculateWasteManagementScore(entityType: FarmEntityType, farmData: FarmData): number {
  // Different baseline based on farm type
  let baseScore = 50;
  switch (entityType) {
    case 'greenhouse':
      baseScore = 70; // Greenhouses can have good waste control
      break;
    case 'farmland':
      baseScore = 60;
      break;
    case 'orchard':
      baseScore = 65;
      break;
    case 'livestock':
      baseScore = 30; // Livestock waste can be challenging
      break;
  }
  
  // Random variation for demo purposes
  // In a real application, this would be based on actual waste management practices
  const randomAdjustment = Math.floor(Math.random() * 30) - 15;
  
  return Math.max(0, Math.min(100, baseScore + randomAdjustment));
}

function calculateCarbonFootprintScore(entityType: FarmEntityType, farmData: FarmData, climateData: ClimateData): number {
  // Different baseline based on farm type
  let baseScore = 50;
  switch (entityType) {
    case 'greenhouse':
      baseScore = 40; // Higher energy use can mean higher carbon footprint
      break;
    case 'farmland':
      baseScore = 60;
      break;
    case 'orchard':
      baseScore = 80; // Perennial crops store more carbon
      break;
    case 'livestock':
      baseScore = 30; // Livestock typically has higher emissions
      break;
  }
  
  // Adjust based on irrigation (more efficient systems have lower carbon footprints)
  let irrigationAdjustment = 0;
  switch (farmData.irrigationSystem.toLowerCase()) {
    case 'drip irrigation':
      irrigationAdjustment = 10;
      break;
    case 'hydroponics':
      irrigationAdjustment = 5;
      break;
    case 'flood irrigation':
      irrigationAdjustment = -15;
      break;
  }
  
  return Math.max(0, Math.min(100, baseScore + irrigationAdjustment));
}

function getRecommendationForCategory(
  entityType: FarmEntityType,
  category: keyof ZeroWasteScoreData['categories'],
  severity: 'low' | 'medium' | 'high' | 'critical',
  farmData: FarmData,
  soilData: SoilData,
  climateData: ClimateData
): AgricultureRecommendation {
  switch (category) {
    case 'waterEfficiency':
      return {
        category: 'waterEfficiency',
        severity,
        title: 'Improve Water Efficiency',
        description: `Your water efficiency score needs improvement. Current irrigation system: ${farmData.irrigationSystem}.`,
        impact: 'Inefficient water use depletes resources and increases costs.',
        implementationCost: severity === 'critical' ? 'high' : severity === 'high' ? 'medium' : 'low',
        estimatedReturn: severity === 'critical' ? '6-12 months' : severity === 'high' ? '1-2 years' : '2-3 years',
        suggestedActions: [
          farmData.irrigationSystem !== 'Drip irrigation' ? 'Install drip irrigation to reduce water use by up to 60%' : 'Optimize existing drip irrigation with soil moisture sensors',
          'Implement rainwater harvesting systems for irrigation',
          'Schedule irrigation based on soil moisture and weather forecasts',
          'Apply mulch to reduce soil water evaporation',
          'Use drought-resistant crop varieties where applicable'
        ]
      };
    case 'soilHealth':
      return {
        category: 'soilHealth',
        severity,
        title: 'Improve Soil Health',
        description: `Your soil health needs attention. Current pH: ${soilData.ph.toFixed(1)}, Organic Matter: ${soilData.organicMatter.toFixed(1)}%.`,
        impact: 'Poor soil health reduces crop yields and increases input requirements.',
        implementationCost: 'medium',
        estimatedReturn: '1-3 years',
        suggestedActions: [
          soilData.ph < 6.0 ? 'Apply lime to increase soil pH' : soilData.ph > 7.0 ? 'Add organic matter to decrease soil pH' : 'Maintain current pH balance',
          soilData.organicMatter < 3.0 ? 'Increase organic matter by incorporating compost and cover crops' : 'Continue building soil organic matter',
          'Implement crop rotation to break pest cycles and improve soil structure',
          'Reduce tillage to protect soil structure and microorganisms',
          'Use biological soil amendments and beneficial microorganisms'
        ]
      };
    case 'biodiversity':
      return {
        category: 'biodiversity',
        severity,
        title: 'Enhance Biodiversity',
        description: `Your farm biodiversity score needs improvement. Current diversity level: ${farmData.mainCrops.length} main crops.`,
        impact: 'Low biodiversity increases pest pressure and reduces ecosystem services.',
        implementationCost: 'low',
        estimatedReturn: '2-4 years',
        suggestedActions: [
          'Plant hedgerows and buffer strips with native plants',
          'Incorporate more crop diversity through intercropping and polycultures',
          'Create habitat areas for beneficial insects and wildlife',
          'Implement integrated pest management to reduce pesticide impact on biodiversity',
          'Install pollinator habitat to support beneficial insects'
        ]
      };
    case 'energyUse':
      return {
        category: 'energyUse',
        severity,
        title: 'Reduce Energy Consumption',
        description: 'Your farm energy efficiency needs improvement.',
        impact: 'High energy use increases carbon footprint and operational costs.',
        implementationCost: 'high',
        estimatedReturn: '3-5 years',
        suggestedActions: [
          'Conduct an energy audit to identify major energy uses',
          'Install renewable energy systems like solar or wind',
          'Upgrade to energy-efficient pumps and equipment',
          'Optimize equipment usage schedules',
          'Implement passive heating and cooling in greenhouses and buildings'
        ]
      };
    case 'wasteManagement':
      return {
        category: 'wasteManagement',
        severity,
        title: 'Improve Waste Management',
        description: 'Your farm waste management practices need attention.',
        impact: 'Poor waste management contributes to pollution and resource loss.',
        implementationCost: 'medium',
        estimatedReturn: '1-3 years',
        suggestedActions: [
          'Implement composting for organic waste recycling',
          'Create a comprehensive recycling system for plastics, paper, and metals',
          'Reuse containers and packaging materials',
          'Convert agricultural waste into value-added products',
          entityType === 'livestock' ? 'Install anaerobic digesters for livestock waste' : 'Utilize crop residues as mulch or animal feed'
        ]
      };
    case 'carbonFootprint':
      return {
        category: 'carbonFootprint',
        severity,
        title: 'Reduce Carbon Footprint',
        description: 'Your farm has opportunities to reduce greenhouse gas emissions.',
        impact: 'High carbon emissions contribute to climate change and may face future regulation.',
        implementationCost: 'medium',
        estimatedReturn: '3-7 years',
        suggestedActions: [
          'Implement conservation tillage or no-till practices to increase soil carbon',
          'Plant trees and perennial crops to sequester carbon',
          'Optimize fertilizer application to reduce nitrous oxide emissions',
          entityType === 'livestock' ? 'Improve livestock feed efficiency and manure management' : 'Reduce fuel use through efficient field operations',
          'Transition to renewable energy sources'
        ]
      };
    default:
      return {
        category: 'soilHealth',
        severity: 'medium',
        title: 'General Farm Sustainability',
        description: 'Your farm has opportunities to improve overall sustainability.',
        impact: 'Improving sustainability can enhance profitability and environmental outcomes.',
        implementationCost: 'medium',
        estimatedReturn: '2-4 years',
        suggestedActions: [
          'Conduct a whole-farm sustainability assessment',
          'Develop a comprehensive sustainability action plan',
          'Explore regenerative agriculture principles',
          'Consider organic certification or other sustainability certifications',
          'Join farmer networks focused on sustainable practices'
        ]
      };
  }
}
