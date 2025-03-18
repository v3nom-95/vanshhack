
import { AggregatedSensorData, EntityType, GreenCreditScoreData } from '@/types/iot';
import { generateRecommendations } from './aiService';

interface RecommendationResponse {
  recommendations: RecommendationItem[];
  fines: FineAssessment[];
}

export interface RecommendationItem {
  category: 'airQuality' | 'energyEfficiency' | 'waterConservation' | 'wasteManagement' | 'carbonFootprint';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: string;
  suggestedActions: string[];
}

export interface FineAssessment {
  category: 'airQuality' | 'energyEfficiency' | 'waterConservation' | 'wasteManagement' | 'carbonFootprint';
  amount: number;
  reason: string;
  regulationCode?: string;
  dueDate: Date;
  appealDeadline: Date;
}

export async function getSustainabilityRecommendations(
  entityType: EntityType,
  sensorData: AggregatedSensorData | null,
  creditScore: GreenCreditScoreData | null
): Promise<RecommendationResponse> {
  if (!sensorData || !creditScore) {
    return { recommendations: [], fines: [] };
  }

  // In a real application, this would call an AI service to generate personalized recommendations
  // For now, we'll simulate the AI response based on the entity type and credit score
  
  // For demo purposes, we're using simulated recommendations and fines
  // In a real app, this would connect to an actual AI model for analysis
  try {
    const aiRecommendations = await generateRecommendations(entityType, sensorData, creditScore);
    return aiRecommendations;
  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    return generateFallbackRecommendations(entityType, sensorData, creditScore);
  }
}

function generateFallbackRecommendations(
  entityType: EntityType,
  sensorData: AggregatedSensorData,
  creditScore: GreenCreditScoreData
): RecommendationResponse {
  const recommendations: RecommendationItem[] = [];
  const fines: FineAssessment[] = [];
  
  // Generate recommendations based on the lowest-scoring categories
  const categories = Object.entries(creditScore.categories)
    .map(([key, value]) => ({ 
      category: key as keyof GreenCreditScoreData['categories'], 
      score: value 
    }))
    .sort((a, b) => a.score - b.score);
  
  // Add recommendations for the lowest scoring categories
  categories.slice(0, 3).forEach(({ category, score }) => {
    const severity = score < 30 ? 'critical' : score < 50 ? 'high' : score < 70 ? 'medium' : 'low';
    
    recommendations.push(getRecommendationForCategory(entityType, category, severity, sensorData));
    
    // Only add fines for poor performances (lower than 40)
    if (score < 40) {
      fines.push(generateFineForCategory(entityType, category, score, sensorData));
    }
  });
  
  return { recommendations, fines };
}

function getRecommendationForCategory(
  entityType: EntityType,
  category: keyof GreenCreditScoreData['categories'],
  severity: 'low' | 'medium' | 'high' | 'critical',
  sensorData: AggregatedSensorData
): RecommendationItem {
  switch (category) {
    case 'airQuality':
      return {
        category: 'airQuality',
        severity,
        title: 'Improve Air Quality',
        description: `Your air quality score is concerning. Current AQI is ${sensorData.airQuality.aqi.toFixed(1)}.`,
        impact: 'Poor air quality affects respiratory health and contributes to environmental degradation.',
        suggestedActions: [
          entityType === 'company' ? 'Install advanced air filtration systems' : 
          entityType === 'city' ? 'Implement vehicle emission restrictions in high-pollution zones' :
          'Use air purifiers and reduce use of aerosol products',
          entityType === 'company' ? 'Conduct regular emissions audits' :
          entityType === 'city' ? 'Expand green spaces and urban forests' :
          'Reduce fireplace usage and opt for electric heating',
          'Transition to low-emission vehicles and promote carpooling'
        ]
      };
    case 'energyEfficiency':
      return {
        category: 'energyEfficiency',
        severity,
        title: 'Reduce Energy Consumption',
        description: `Your energy efficiency is suboptimal. Current consumption is ${sensorData.resources.energyConsumption.toFixed(1)} kWh.`,
        impact: 'Excessive energy use increases carbon footprint and contributes to climate change.',
        suggestedActions: [
          entityType === 'company' ? 'Implement smart building systems with automated efficiency controls' :
          entityType === 'city' ? 'Upgrade to smart grid technology and LED street lighting' :
          'Switch to energy-efficient appliances and LED lighting',
          entityType === 'company' ? 'Conduct an energy audit and address inefficiencies' :
          entityType === 'city' ? 'Provide tax incentives for renewable energy adoption' :
          'Install programmable thermostats and improve insulation',
          'Invest in renewable energy sources like solar panels'
        ]
      };
    case 'waterConservation':
      return {
        category: 'waterConservation',
        severity,
        title: 'Conserve Water Resources',
        description: `Your water usage is higher than recommended. Current usage is ${sensorData.resources.waterUsage.toFixed(1)} m³.`,
        impact: 'Water wastage depletes natural resources and increases utility costs.',
        suggestedActions: [
          entityType === 'company' ? 'Implement water recycling systems for industrial processes' :
          entityType === 'city' ? 'Upgrade water infrastructure to reduce leakage and wastage' :
          'Install low-flow fixtures and water-efficient appliances',
          entityType === 'company' ? 'Harvest rainwater for landscape irrigation' :
          entityType === 'city' ? 'Implement drought-resistant landscaping in public spaces' :
          'Collect rainwater for garden use and reduce shower time',
          'Monitor and fix water leaks promptly'
        ]
      };
    case 'wasteManagement':
      return {
        category: 'wasteManagement',
        severity,
        title: 'Improve Waste Management',
        description: `Your waste production is concerning. Current production is ${sensorData.resources.wasteProduction.toFixed(1)} kg.`,
        impact: 'Improper waste management contributes to landfill overflow and pollution.',
        suggestedActions: [
          entityType === 'company' ? 'Implement a comprehensive recycling program and reduce packaging' :
          entityType === 'city' ? 'Expand recycling facilities and implement composting programs' :
          'Practice proper waste segregation and composting',
          entityType === 'company' ? 'Adopt circular economy principles in product design' :
          entityType === 'city' ? 'Implement pay-as-you-throw waste collection policies' :
          'Reduce single-use plastics and buy products with less packaging',
          'Donate usable items instead of discarding them'
        ]
      };
    case 'carbonFootprint':
      return {
        category: 'carbonFootprint',
        severity,
        title: 'Reduce Carbon Emissions',
        description: `Your carbon footprint is higher than recommended. Current emissions are ${sensorData.emissions.carbonFootprint.toFixed(1)} kg CO₂.`,
        impact: 'High carbon emissions accelerate climate change and contribute to global warming.',
        suggestedActions: [
          entityType === 'company' ? 'Set science-based emissions reduction targets' :
          entityType === 'city' ? 'Expand public transportation and bicycle infrastructure' :
          'Reduce car usage and consider electric vehicles',
          entityType === 'company' ? 'Switch to renewable energy sources for operations' :
          entityType === 'city' ? 'Implement a carbon offset program for municipal activities' :
          'Choose locally produced goods to reduce transportation emissions',
          'Plant trees and support reforestation initiatives'
        ]
      };
    default:
      return {
        category: 'airQuality',
        severity: 'medium',
        title: 'General Environmental Improvement',
        description: 'Your environmental performance needs attention.',
        impact: 'Poor environmental practices contribute to climate change and pollution.',
        suggestedActions: [
          'Conduct a comprehensive environmental audit',
          'Develop a sustainability action plan',
          'Educate stakeholders about environmental best practices'
        ]
      };
  }
}

function generateFineForCategory(
  entityType: EntityType,
  category: keyof GreenCreditScoreData['categories'],
  score: number,
  sensorData: AggregatedSensorData
): FineAssessment {
  // Only companies and cities can be fined (not civilians)
  const baseAmount = entityType === 'company' ? 5000 : entityType === 'city' ? 20000 : 100;
  
  // Calculate fine amount based on score (lower score = higher fine)
  const multiplier = (40 - score) / 10; // For scores below 40
  const amount = Math.round(baseAmount * Math.max(1, multiplier));
  
  // Set due dates
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 30);
  
  const appealDeadline = new Date();
  appealDeadline.setDate(appealDeadline.getDate() + 14);

  // Generate fine details based on category
  switch (category) {
    case 'airQuality':
      return {
        category: 'airQuality',
        amount,
        reason: `Violation of air quality standards. AQI exceeds permissible limits at ${sensorData.airQuality.aqi.toFixed(1)}.`,
        regulationCode: 'EPA-AQ-2023-42',
        dueDate,
        appealDeadline
      };
    case 'energyEfficiency':
      return {
        category: 'energyEfficiency',
        amount,
        reason: `Excessive energy consumption of ${sensorData.resources.energyConsumption.toFixed(1)} kWh exceeds efficiency standards.`,
        regulationCode: 'DOE-EE-2023-18',
        dueDate,
        appealDeadline
      };
    case 'waterConservation':
      return {
        category: 'waterConservation',
        amount,
        reason: `Water usage of ${sensorData.resources.waterUsage.toFixed(1)} m³ exceeds conservation guidelines.`,
        regulationCode: 'EPA-WC-2023-33',
        dueDate,
        appealDeadline
      };
    case 'wasteManagement':
      return {
        category: 'wasteManagement',
        amount,
        reason: `Improper waste management with ${sensorData.resources.wasteProduction.toFixed(1)} kg of waste exceeding disposal limits.`,
        regulationCode: 'EPA-WM-2023-27',
        dueDate,
        appealDeadline
      };
    case 'carbonFootprint':
      return {
        category: 'carbonFootprint',
        amount,
        reason: `Carbon emissions of ${sensorData.emissions.carbonFootprint.toFixed(1)} kg CO₂ exceed carbon tax thresholds.`,
        regulationCode: 'CARB-CE-2023-51',
        dueDate,
        appealDeadline
      };
    default:
      return {
        category: 'airQuality',
        amount,
        reason: 'General environmental compliance failure.',
        regulationCode: 'EPA-GEN-2023-01',
        dueDate,
        appealDeadline
      };
  }
}
