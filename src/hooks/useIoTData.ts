import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { AggregatedSensorData, BlockchainStatusData, EntityType, GreenCreditScoreData } from '@/types/iot';
import { fetchEntityData, calculateGreenScore, storeOnBlockchain } from '@/lib/iotService';
import { FineAssessment, RecommendationItem, getSustainabilityRecommendations } from '@/lib/sustainabilityRecommendations';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const useIoTData = (entityType: EntityType, entityId: string, autoFetch: boolean = true) => {
  const [sensorData, setSensorData] = useState<AggregatedSensorData | null>(null);
  const [creditScore, setCreditScore] = useState<GreenCreditScoreData | null>(null);
  const [blockchainStatus, setBlockchainStatus] = useState<BlockchainStatusData | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [fines, setFines] = useState<FineAssessment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const isMounted = useRef(true);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const fetchData = useCallback(async (retryAttempt: number = 0) => {
    if (!entityId || !isMounted.current) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchEntityData(entityType, entityId);
      if (!isMounted.current) return;
      setSensorData(data);
      
      const score = await calculateGreenScore(entityType, data);
      if (!isMounted.current) return;
      setCreditScore(score);
      
      const { recommendations, fines } = await getSustainabilityRecommendations(
        entityType,
        data,
        score
      );
      if (!isMounted.current) return;
      setRecommendations(recommendations);
      setFines(fines);
      
      const status = await storeOnBlockchain(entityType, entityId, data, score);
      if (!isMounted.current) return;
      setBlockchainStatus(status);
      
      setLastUpdated(new Date());
      setIsLoading(false);
      setRetryCount(0);
    } catch (err) {
      if (!isMounted.current) return;
      
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      console.error('Error fetching IoT data:', err);
      
      if (retryAttempt < MAX_RETRIES) {
        const delay = RETRY_DELAY * Math.pow(2, retryAttempt);
        retryTimeoutRef.current = setTimeout(() => {
          if (isMounted.current) {
            setRetryCount(prev => prev + 1);
            fetchData(retryAttempt + 1);
          }
        }, delay);
      } else {
        setError(errorMessage);
        setIsLoading(false);
      }
    }
  }, [entityType, entityId]);

  useEffect(() => {
    isMounted.current = true;
    
    if (autoFetch) {
      fetchData();
    } else {
      setIsLoading(false);
    }
    
    const interval = autoFetch ? setInterval(fetchData, 30000) : null;
    
    return () => {
      isMounted.current = false;
      if (interval) clearInterval(interval);
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, [fetchData, autoFetch]);

  const returnValue = useMemo(() => ({
    sensorData,
    creditScore,
    blockchainStatus,
    recommendations,
    fines,
    isLoading,
    error,
    lastUpdated,
    retryCount,
    refreshData: () => {
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
      fetchData();
    }
  }), [
    sensorData,
    creditScore,
    blockchainStatus,
    recommendations,
    fines,
    isLoading,
    error,
    lastUpdated,
    retryCount,
    fetchData
  ]);

  return returnValue;
};
