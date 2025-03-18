
import { useState, useEffect, useCallback } from 'react';
import { 
  FarmEntityType, 
  SoilData, 
  ClimateData, 
  FarmData, 
  ZeroWasteScoreData, 
  AgricultureRecommendation, 
  CropSuggestion 
} from '@/types/agriculture';
import { 
  fetchFarmData, 
  fetchSoilData, 
  fetchClimateData, 
  calculateZeroWasteScore, 
  getAgricultureRecommendations, 
  getCropSuggestions,
  storeAgricultureData
} from '@/lib/agricultureService';

export const useAgricultureData = (entityType: FarmEntityType, entityId: string, autoFetch: boolean = true) => {
  const [farmData, setFarmData] = useState<FarmData | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [climateData, setClimateData] = useState<ClimateData | null>(null);
  const [zeroWasteScore, setZeroWasteScore] = useState<ZeroWasteScoreData | null>(null);
  const [recommendations, setRecommendations] = useState<AgricultureRecommendation[]>([]);
  const [cropSuggestions, setCropSuggestions] = useState<CropSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    if (!entityId) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we're using simulated data
      // In a real app, this would connect to actual IoT sensors and AI models
      const farmInfo = await fetchFarmData(entityType, entityId);
      setFarmData(farmInfo);
      
      const soil = await fetchSoilData(entityType, entityId);
      setSoilData(soil);
      
      const climate = await fetchClimateData(entityType, entityId);
      setClimateData(climate);
      
      // Calculate zero waste score using our AI model
      const score = await calculateZeroWasteScore(entityType, farmInfo, soil, climate);
      setZeroWasteScore(score);
      
      // Get AI-generated recommendations for improving farm sustainability
      const recs = await getAgricultureRecommendations(entityType, farmInfo, soil, climate, score);
      setRecommendations(recs);
      
      // Get AI-suggested crops based on soil, climate and sustainability
      const crops = await getCropSuggestions(entityType, farmInfo, soil, climate, score);
      setCropSuggestions(crops);
      
      // Store the data on blockchain with cryptographic identity
      await storeAgricultureData(entityType, entityId, {
        farmData: farmInfo,
        soilData: soil,
        climateData: climate,
        zeroWasteScore: score
      });
      
      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching agriculture data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setIsLoading(false);
    }
  }, [entityType, entityId]);

  useEffect(() => {
    let isMounted = true;
    
    if (autoFetch) {
      fetchData();
    } else {
      setIsLoading(false);
    }
    
    // Set up a polling interval to fetch real-time data
    const interval = autoFetch ? setInterval(fetchData, 60000) : null; // Update every 60 seconds
    
    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, [fetchData, autoFetch]);

  // Function to manually refresh data
  const refreshData = async () => {
    await fetchData();
  };

  return { 
    farmData, 
    soilData, 
    climateData, 
    zeroWasteScore, 
    recommendations,
    cropSuggestions,
    isLoading, 
    error,
    lastUpdated,
    refreshData
  };
};
