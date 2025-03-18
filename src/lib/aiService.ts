
import { AggregatedSensorData, EntityType, GreenCreditScoreData } from '@/types/iot';
import { RecommendationItem, FineAssessment } from './sustainabilityRecommendations';

// In a real application, this would use actual AI models for analyzing data and generating recommendations
// For demo purposes, we're simulating AI responses
export async function generateRecommendations(
  entityType: EntityType,
  sensorData: AggregatedSensorData,
  creditScore: GreenCreditScoreData
): Promise<{ recommendations: RecommendationItem[], fines: FineAssessment[] }> {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate recommendations using a rules-based approach (in a real app, this would use ML models)
  const recommendations: RecommendationItem[] = [];
  const fines: FineAssessment[] = [];
  
  // Analyze air quality
  if (sensorData.airQuality.aqi > 100) {
    const severity = sensorData.airQuality.aqi > 150 ? 'critical' : 
                     sensorData.airQuality.aqi > 120 ? 'high' : 'medium';
    
    recommendations.push({
      category: 'airQuality',
      severity,
      title: 'Air Quality Improvement Required',
      description: `Air quality index of ${sensorData.airQuality.aqi.toFixed(1)} exceeds healthy standards.`,
      impact: 'Elevated pollution levels can cause respiratory issues and harm vulnerable populations.',
      suggestedActions: getAIGeneratedActions(entityType, 'airQuality', severity, sensorData)
    });
    
    // Only fine for high AQI if it's a company or city
    if (severity === 'critical' && entityType !== 'civilian') {
      fines.push(generateAIFine(entityType, 'airQuality', creditScore.categories.airQuality, sensorData));
    }
  }
  
  // Analyze energy consumption
  const energyThreshold = entityType === 'company' ? 2000 : entityType === 'city' ? 5000 : 300;
  if (sensorData.resources.energyConsumption > energyThreshold) {
    const excessPercentage = (sensorData.resources.energyConsumption / energyThreshold - 1) * 100;
    const severity = excessPercentage > 50 ? 'critical' : 
                     excessPercentage > 30 ? 'high' : 
                     excessPercentage > 10 ? 'medium' : 'low';
    
    recommendations.push({
      category: 'energyEfficiency',
      severity,
      title: 'Reduce Energy Consumption',
      description: `Energy usage of ${sensorData.resources.energyConsumption.toFixed(1)} kWh is ${excessPercentage.toFixed(0)}% above recommended levels.`,
      impact: 'Excessive energy consumption increases greenhouse gas emissions and operational costs.',
      suggestedActions: getAIGeneratedActions(entityType, 'energyEfficiency', severity, sensorData)
    });
    
    if (severity === 'critical' || severity === 'high') {
      fines.push(generateAIFine(entityType, 'energyEfficiency', creditScore.categories.energyEfficiency, sensorData));
    }
  }
  
  // Analyze water usage
  const waterThreshold = entityType === 'company' ? 200 : entityType === 'city' ? 500 : 30;
  if (sensorData.resources.waterUsage > waterThreshold) {
    const excessPercentage = (sensorData.resources.waterUsage / waterThreshold - 1) * 100;
    const severity = excessPercentage > 50 ? 'critical' : 
                     excessPercentage > 30 ? 'high' : 
                     excessPercentage > 10 ? 'medium' : 'low';
    
    recommendations.push({
      category: 'waterConservation',
      severity,
      title: 'Water Conservation Required',
      description: `Water consumption of ${sensorData.resources.waterUsage.toFixed(1)} m³ is ${excessPercentage.toFixed(0)}% above sustainable levels.`,
      impact: 'Excessive water use strains local resources and ecosystems.',
      suggestedActions: getAIGeneratedActions(entityType, 'waterConservation', severity, sensorData)
    });
    
    if (severity === 'critical' && entityType !== 'civilian') {
      fines.push(generateAIFine(entityType, 'waterConservation', creditScore.categories.waterConservation, sensorData));
    }
  }
  
  // Analyze waste production
  const wasteThreshold = entityType === 'company' ? 500 : entityType === 'city' ? 2000 : 30;
  if (sensorData.resources.wasteProduction > wasteThreshold) {
    const excessPercentage = (sensorData.resources.wasteProduction / wasteThreshold - 1) * 100;
    const severity = excessPercentage > 50 ? 'critical' : 
                     excessPercentage > 30 ? 'high' : 
                     excessPercentage > 10 ? 'medium' : 'low';
    
    recommendations.push({
      category: 'wasteManagement',
      severity,
      title: 'Waste Reduction Required',
      description: `Waste production of ${sensorData.resources.wasteProduction.toFixed(1)} kg is ${excessPercentage.toFixed(0)}% above recommended levels.`,
      impact: 'Excessive waste contributes to landfill overuse and environmental contamination.',
      suggestedActions: getAIGeneratedActions(entityType, 'wasteManagement', severity, sensorData)
    });
    
    if ((severity === 'critical' || severity === 'high') && entityType !== 'civilian') {
      fines.push(generateAIFine(entityType, 'wasteManagement', creditScore.categories.wasteManagement, sensorData));
    }
  }
  
  // Analyze carbon emissions
  const carbonThreshold = entityType === 'company' ? 1200 : entityType === 'city' ? 5000 : 60;
  if (sensorData.emissions.carbonFootprint > carbonThreshold) {
    const excessPercentage = (sensorData.emissions.carbonFootprint / carbonThreshold - 1) * 100;
    const severity = excessPercentage > 50 ? 'critical' : 
                     excessPercentage > 30 ? 'high' : 
                     excessPercentage > 10 ? 'medium' : 'low';
    
    recommendations.push({
      category: 'carbonFootprint',
      severity,
      title: 'Carbon Emission Reduction Required',
      description: `Carbon footprint of ${sensorData.emissions.carbonFootprint.toFixed(1)} kg CO₂ is ${excessPercentage.toFixed(0)}% above sustainable levels.`,
      impact: 'High carbon emissions contribute significantly to climate change and global warming.',
      suggestedActions: getAIGeneratedActions(entityType, 'carbonFootprint', severity, sensorData)
    });
    
    if ((severity === 'critical' || severity === 'high') && entityType !== 'civilian') {
      fines.push(generateAIFine(entityType, 'carbonFootprint', creditScore.categories.carbonFootprint, sensorData));
    }
  }
  
  // Sort recommendations by severity
  recommendations.sort((a, b) => {
    const severityOrder = { critical: 3, high: 2, medium: 1, low: 0 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
  
  return { recommendations, fines };
}

function getAIGeneratedActions(
  entityType: EntityType, 
  category: 'airQuality' | 'energyEfficiency' | 'waterConservation' | 'wasteManagement' | 'carbonFootprint',
  severity: 'low' | 'medium' | 'high' | 'critical',
  sensorData: AggregatedSensorData
): string[] {
  // In a real application, this would use NLP models to generate contextual recommendations
  const actions: Record<typeof category, Record<typeof entityType, string[]>> = {
    airQuality: {
      company: [
        'Install advanced air filtration systems in all facilities',
        'Transition to low-emission manufacturing processes',
        'Implement remote work policies to reduce commuting emissions',
        'Conduct monthly air quality audits and address issues promptly',
        'Create green buffer zones around industrial facilities'
      ],
      city: [
        'Implement car-free zones in high-density urban areas',
        'Expand public transportation network and incentivize its use',
        'Create more urban green spaces to naturally filter air',
        'Enforce stricter emission standards for local businesses',
        'Deploy IoT-based air quality monitoring throughout the city'
      ],
      civilian: [
        'Reduce use of personal vehicles in favor of public transport',
        'Install air purifiers in your home',
        'Avoid burning wood or trash',
        'Choose low-VOC paints and household products',
        'Plant air-filtering plants in and around your home'
      ]
    },
    energyEfficiency: {
      company: [
        'Conduct a comprehensive energy audit across all facilities',
        'Upgrade to energy-efficient equipment and lighting',
        'Implement smart building technology to optimize energy use',
        'Invest in on-site renewable energy generation',
        'Develop an employee energy conservation program'
      ],
      city: [
        'Upgrade all public buildings with energy-efficient systems',
        'Implement smart grid technology throughout the city',
        'Convert all street lighting to LED with smart controls',
        'Offer tax incentives for buildings achieving energy certifications',
        'Develop community solar programs for residents'
      ],
      civilian: [
        'Replace old appliances with energy-efficient models',
        'Install programmable thermostats and smart power strips',
        'Improve home insulation and seal air leaks',
        'Switch to LED lighting throughout your home',
        'Consider installing residential solar panels'
      ]
    },
    waterConservation: {
      company: [
        'Implement water recycling systems for industrial processes',
        'Install water-efficient fixtures in all facilities',
        'Conduct regular inspections for leaks and water waste',
        'Redesign landscaping to use drought-resistant plants',
        'Harvest rainwater for non-potable uses'
      ],
      city: [
        'Upgrade water infrastructure to reduce leakage',
        'Implement tiered water pricing to discourage waste',
        'Develop water reclamation facilities for irrigation use',
        'Create public education campaigns on water conservation',
        'Retrofit public spaces with water-efficient fixtures'
      ],
      civilian: [
        'Install low-flow fixtures in bathrooms and kitchen',
        'Fix leaking pipes and faucets promptly',
        'Collect rainwater for garden use',
        'Take shorter showers and only run full loads in appliances',
        'Convert to drought-resistant landscaping'
      ]
    },
    wasteManagement: {
      company: [
        'Implement a zero-waste program across all operations',
        'Redesign products and packaging to minimize waste',
        'Establish comprehensive recycling and composting programs',
        'Partner with waste-to-energy facilities for non-recyclable waste',
        'Train employees on proper waste reduction procedures'
      ],
      city: [
        'Implement city-wide composting programs',
        'Establish recycling facilities for all types of materials',
        'Ban single-use plastics in city operations',
        'Create incentives for businesses that reduce waste',
        'Develop waste-to-energy facilities to reduce landfill use'
      ],
      civilian: [
        'Practice comprehensive recycling and composting',
        'Reduce purchase of single-use items',
        'Buy in bulk to reduce packaging waste',
        'Donate or repurpose items instead of discarding them',
        'Compost food scraps at home'
      ]
    },
    carbonFootprint: {
      company: [
        'Set science-based emission reduction targets',
        'Transition vehicle fleet to electric or hybrid models',
        'Offset unavoidable emissions through verified carbon projects',
        'Optimize supply chain logistics to reduce transportation emissions',
        'Switch to renewable energy sources for all operations'
      ],
      city: [
        'Develop a comprehensive climate action plan',
        'Transition municipal vehicles to zero-emission alternatives',
        'Expand bicycle infrastructure and pedestrian zones',
        'Implement building codes requiring low-carbon construction',
        'Invest in renewable energy projects for municipal operations'
      ],
      civilian: [
        'Reduce meat consumption in favor of plant-based options',
        'Choose public transportation, biking, or walking when possible',
        'Purchase carbon offsets for unavoidable emissions',
        'Buy locally produced goods to reduce transportation emissions',
        'Improve home energy efficiency to reduce heating/cooling needs'
      ]
    }
  };
  
  // Select 3-5 most relevant actions based on severity
  const actionCount = severity === 'critical' ? 5 : severity === 'high' ? 4 : severity === 'medium' ? 3 : 2;
  return actions[category][entityType].slice(0, actionCount);
}

function generateAIFine(
  entityType: EntityType,
  category: 'airQuality' | 'energyEfficiency' | 'waterConservation' | 'wasteManagement' | 'carbonFootprint',
  categoryScore: number,
  sensorData: AggregatedSensorData
): FineAssessment {
  // Only companies and cities can be fined (not civilians)
  if (entityType === 'civilian') {
    // Return a warning rather than a fine for civilians
    return {
      category,
      amount: 0,
      reason: `WARNING ONLY: Your ${category} performance requires immediate attention.`,
      dueDate: new Date(),
      appealDeadline: new Date()
    };
  }
  
  // Base fine amount depends on entity type
  const baseAmount = entityType === 'company' ? 10000 : 25000;
  
  // Calculate fine amount based on category score (lower score = higher fine)
  // and the severity of the violation
  const scoreFactor = Math.max(0, (50 - categoryScore) / 50); // 0 for score=50, 1 for score=0
  
  let violationSeverity = 1.0;
  
  switch (category) {
    case 'airQuality':
      // Higher AQI = more severe violation
      violationSeverity = Math.min(3.0, sensorData.airQuality.aqi / 100);
      break;
    case 'energyEfficiency':
      // Calculate violation based on threshold
      const energyThreshold = entityType === 'company' ? 2000 : 5000;
      violationSeverity = Math.min(3.0, sensorData.resources.energyConsumption / energyThreshold);
      break;
    case 'waterConservation':
      // Calculate violation based on threshold
      const waterThreshold = entityType === 'company' ? 200 : 500;
      violationSeverity = Math.min(3.0, sensorData.resources.waterUsage / waterThreshold);
      break;
    case 'wasteManagement':
      // Calculate violation based on threshold
      const wasteThreshold = entityType === 'company' ? 500 : 2000;
      violationSeverity = Math.min(3.0, sensorData.resources.wasteProduction / wasteThreshold);
      break;
    case 'carbonFootprint':
      // Calculate violation based on threshold
      const carbonThreshold = entityType === 'company' ? 1200 : 5000;
      violationSeverity = Math.min(3.0, sensorData.emissions.carbonFootprint / carbonThreshold);
      break;
  }
  
  // Calculate final fine amount
  const amount = Math.round(baseAmount * scoreFactor * violationSeverity);
  
  // Generate fine details
  const regulationCodes: Record<typeof category, string> = {
    airQuality: 'EPA-AQ-2023-' + Math.floor(Math.random() * 100),
    energyEfficiency: 'DOE-EE-2023-' + Math.floor(Math.random() * 100),
    waterConservation: 'EPA-WC-2023-' + Math.floor(Math.random() * 100),
    wasteManagement: 'EPA-WM-2023-' + Math.floor(Math.random() * 100),
    carbonFootprint: 'CARB-CE-2023-' + Math.floor(Math.random() * 100)
  };
  
  // Set due dates
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);
  
  const appealDeadline = new Date();
  appealDeadline.setDate(appealDeadline.getDate() + 14);
  
  // Generate reason based on category
  let reason = '';
  switch (category) {
    case 'airQuality':
      reason = `Violation of air quality standards with AQI of ${sensorData.airQuality.aqi.toFixed(1)} exceeding permissible limits.`;
      break;
    case 'energyEfficiency':
      reason = `Excessive energy consumption of ${sensorData.resources.energyConsumption.toFixed(1)} kWh violates efficiency standards.`;
      break;
    case 'waterConservation':
      reason = `Water usage of ${sensorData.resources.waterUsage.toFixed(1)} m³ exceeds conservation requirements.`;
      break;
    case 'wasteManagement':
      reason = `Waste production of ${sensorData.resources.wasteProduction.toFixed(1)} kg violates waste management regulations.`;
      break;
    case 'carbonFootprint':
      reason = `Carbon emissions of ${sensorData.emissions.carbonFootprint.toFixed(1)} kg CO₂ exceed carbon limits.`;
      break;
  }
  
  return {
    category,
    amount,
    reason,
    regulationCode: regulationCodes[category],
    dueDate,
    appealDeadline
  };
}
