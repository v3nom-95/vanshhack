
import React from 'react';
import { SoilData } from '@/types/agriculture';
import GlassCard from '@/components/ui/GlassCard';
import { Leaf } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SoilMonitoringProps {
  soilData: SoilData | null;
  isLoading: boolean;
  compact?: boolean;
}

const SoilMonitoring: React.FC<SoilMonitoringProps> = ({ soilData, isLoading, compact = false }) => {
  if (isLoading) {
    return (
      <GlassCard className="h-full flex items-center justify-center p-6">
        <p className="text-muted-foreground">Loading soil data...</p>
      </GlassCard>
    );
  }

  if (!soilData) {
    return (
      <GlassCard className="h-full flex items-center justify-center p-6">
        <p className="text-muted-foreground">No soil data available</p>
      </GlassCard>
    );
  }

  const getNutrientLabel = (value: number, nutrient: string) => {
    if (nutrient === 'ph') {
      if (value < 5.5) return 'Very Acidic';
      if (value < 6.0) return 'Acidic';
      if (value < 7.0) return 'Slightly Acidic';
      if (value < 7.5) return 'Neutral';
      if (value < 8.0) return 'Slightly Alkaline';
      return 'Alkaline';
    }
    
    if (value < 30) return 'Low';
    if (value < 60) return 'Medium';
    return 'High';
  };

  const getPhColor = (value: number) => {
    if (value < 5.5 || value > 8.0) return 'text-red-500';
    if (value < 6.0 || value > 7.5) return 'text-orange-500';
    return 'text-green-500';
  };

  const getMoistureColor = (value: number) => {
    if (value < 30) return 'text-orange-500';
    if (value > 70) return 'text-blue-500';
    return 'text-green-500';
  };

  const getNutrientColor = (value: number) => {
    if (value < 30) return 'text-orange-500';
    if (value > 60) return 'text-green-500';
    return 'text-blue-500';
  };

  return (
    <GlassCard className={compact ? 'p-4' : 'p-6'}>
      <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-medium mb-4 flex items-center`}>
        <Leaf className="mr-2 h-5 w-5 text-green-600" />
        Soil Monitoring
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
            <div className="text-sm text-muted-foreground">Soil Moisture</div>
            <div className={`text-lg font-semibold ${getMoistureColor(soilData.moisture)}`}>
              {soilData.moisture.toFixed(1)}%
            </div>
            <Progress 
              value={soilData.moisture} 
              max={100}
              className="h-1.5 mt-2" 
            />
          </div>
          
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
            <div className="text-sm text-muted-foreground">Soil Temperature</div>
            <div className="text-lg font-semibold">
              {soilData.temperature.toFixed(1)}°C
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-3">
          <div className="text-sm font-medium mb-2">Soil pH: {soilData.ph.toFixed(1)}</div>
          <div className="relative h-5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="absolute inset-0 flex">
              <div className="w-1/7 h-full bg-red-500"></div>
              <div className="w-1/7 h-full bg-orange-500"></div>
              <div className="w-1/7 h-full bg-yellow-500"></div>
              <div className="w-1/7 h-full bg-green-500"></div>
              <div className="w-1/7 h-full bg-blue-500"></div>
              <div className="w-1/7 h-full bg-indigo-500"></div>
              <div className="w-1/7 h-full bg-violet-500"></div>
            </div>
            <div 
              className="absolute top-0 w-3 h-5 bg-white border"
              style={{ left: `${(soilData.ph / 14) * 100}%`, transform: 'translateX(-50%)' }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>Acidic (4.0)</span>
            <span>Neutral (7.0)</span>
            <span>Alkaline (10.0)</span>
          </div>
          <div className="text-center mt-1 text-sm">
            <span className={getPhColor(soilData.ph)}>
              {getNutrientLabel(soilData.ph, 'ph')}
            </span>
          </div>
        </div>
        
        {!compact && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Nitrogen (N)</span>
                <span className={`text-sm font-medium ${getNutrientColor(soilData.nitrogen)}`}>
                  {getNutrientLabel(soilData.nitrogen, 'n')}
                </span>
              </div>
              <div className="text-lg font-semibold mt-1">
                {soilData.nitrogen.toFixed(1)} ppm
              </div>
              <Progress 
                value={soilData.nitrogen} 
                max={100}
                className="h-1.5 mt-2" 
              />
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Phosphorus (P)</span>
                <span className={`text-sm font-medium ${getNutrientColor(soilData.phosphorus)}`}>
                  {getNutrientLabel(soilData.phosphorus, 'p')}
                </span>
              </div>
              <div className="text-lg font-semibold mt-1">
                {soilData.phosphorus.toFixed(1)} ppm
              </div>
              <Progress 
                value={soilData.phosphorus} 
                max={100}
                className="h-1.5 mt-2" 
              />
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Potassium (K)</span>
                <span className={`text-sm font-medium ${getNutrientColor(soilData.potassium)}`}>
                  {getNutrientLabel(soilData.potassium, 'k')}
                </span>
              </div>
              <div className="text-lg font-semibold mt-1">
                {soilData.potassium.toFixed(1)} ppm
              </div>
              <Progress 
                value={soilData.potassium} 
                max={100}
                className="h-1.5 mt-2" 
              />
            </div>
          </div>
        )}
        
        {!compact && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Organic Matter</div>
              <div className="text-lg font-semibold mt-1">
                {soilData.organicMatter.toFixed(1)}%
              </div>
              <Progress 
                value={soilData.organicMatter} 
                max={10}
                className="h-1.5 mt-2" 
              />
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="text-sm text-muted-foreground">Electrical Conductivity</div>
              <div className="text-lg font-semibold mt-1">
                {soilData.conductivity.toFixed(2)} dS/m
              </div>
            </div>
          </div>
        )}
        
        {compact && (
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Nitrogen</div>
              <div className={`text-sm font-medium ${getNutrientColor(soilData.nitrogen)}`}>
                {soilData.nitrogen.toFixed(1)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Phosphorus</div>
              <div className={`text-sm font-medium ${getNutrientColor(soilData.phosphorus)}`}>
                {soilData.phosphorus.toFixed(1)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Potassium</div>
              <div className={`text-sm font-medium ${getNutrientColor(soilData.potassium)}`}>
                {soilData.potassium.toFixed(1)}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-3 text-xs text-right text-muted-foreground">
        Last updated: {new Date(soilData.lastUpdated).toLocaleString()}
      </div>
    </GlassCard>
  );
};

export default SoilMonitoring;
