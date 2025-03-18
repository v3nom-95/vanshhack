
import React from 'react';
import { ClimateData } from '@/types/agriculture';
import GlassCard from '@/components/ui/GlassCard';
import { CloudRain, Sun, Droplet, Wind, Thermometer } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ClimateMonitoringProps {
  climateData: ClimateData | null;
  isLoading: boolean;
  compact?: boolean;
}

const ClimateMonitoring: React.FC<ClimateMonitoringProps> = ({ climateData, isLoading, compact = false }) => {
  if (isLoading) {
    return (
      <GlassCard className="h-full flex items-center justify-center p-6">
        <p className="text-muted-foreground">Loading climate data...</p>
      </GlassCard>
    );
  }

  if (!climateData) {
    return (
      <GlassCard className="h-full flex items-center justify-center p-6">
        <p className="text-muted-foreground">No climate data available</p>
      </GlassCard>
    );
  }

  // Weather icon mapping
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'partly cloudy':
        return <Sun className="h-6 w-6 text-orange-400" />;
      case 'cloudy':
        return <CloudRain className="h-6 w-6 text-gray-500" />;
      case 'light rain':
      case 'rain':
      case 'stormy':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'foggy':
        return <CloudRain className="h-6 w-6 text-gray-400" />;
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  return (
    <GlassCard className={compact ? 'p-4' : 'p-6'}>
      <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-medium mb-4 flex items-center`}>
        <CloudRain className="mr-2 h-5 w-5 text-blue-600" />
        Climate Monitoring
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex flex-col items-center justify-center">
            <Thermometer className="h-6 w-6 mb-1 text-red-500" />
            <div className="text-xs text-muted-foreground">Temperature</div>
            <div className="text-lg font-semibold">
              {climateData.temperature.toFixed(1)}°C
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex flex-col items-center justify-center">
            <Droplet className="h-6 w-6 mb-1 text-blue-500" />
            <div className="text-xs text-muted-foreground">Humidity</div>
            <div className="text-lg font-semibold">
              {climateData.humidity.toFixed(1)}%
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex flex-col items-center justify-center">
            <CloudRain className="h-6 w-6 mb-1 text-blue-600" />
            <div className="text-xs text-muted-foreground">Rainfall</div>
            <div className="text-lg font-semibold">
              {climateData.rainfall.toFixed(1)} mm
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex flex-col items-center justify-center">
            <Wind className="h-6 w-6 mb-1 text-gray-500" />
            <div className="text-xs text-muted-foreground">Wind Speed</div>
            <div className="text-lg font-semibold">
              {climateData.windSpeed.toFixed(1)} km/h
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border p-3">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-medium">Current Weather</div>
            <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
              {getWeatherIcon(climateData.weatherCondition)}
              <span className="ml-2 text-sm">{climateData.weatherCondition}</span>
            </div>
          </div>
          
          {!compact && (
            <div>
              <div className="text-sm font-medium mb-2">Solar Radiation</div>
              <div className="text-lg mb-1">{climateData.solarRadiation.toFixed(0)} W/m²</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-yellow-400 h-2.5 rounded-full" 
                  style={{ width: `${Math.min(100, (climateData.solarRadiation / 1000) * 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        {!compact && (
          <div className="border rounded-lg p-3">
            <div className="text-sm font-medium mb-3">5-Day Forecast</div>
            <div className="grid grid-cols-5 gap-1">
              {climateData.forecast.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-xs text-muted-foreground">{day.date.split('-')[2]}</div>
                  {getWeatherIcon(day.condition)}
                  <div className="text-xs mt-1">
                    {day.minTemp.toFixed(0)}° - {day.maxTemp.toFixed(0)}°
                  </div>
                  <div className="text-xs text-blue-500">{day.rainfall > 0.5 ? `${day.rainfall.toFixed(1)}mm` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!compact && (
          <div className="border rounded-lg p-3">
            <div className="text-sm font-medium mb-2">Temperature & Rainfall Forecast</div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={climateData.forecast}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Area yAxisId="left" type="monotone" dataKey="maxTemp" stroke="#FF9500" fill="#FFC078" name="Max Temp (°C)" />
                  <Area yAxisId="left" type="monotone" dataKey="minTemp" stroke="#4DABF7" fill="#74C0FC" name="Min Temp (°C)" />
                  <Bar yAxisId="right" dataKey="rainfall" fill="#228BE6" name="Rainfall (mm)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {compact && climateData.forecast.length > 0 && (
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">Tomorrow:</div>
            <div className="flex items-center">
              {getWeatherIcon(climateData.forecast[0].condition)}
              <span className="text-xs ml-1">
                {climateData.forecast[0].minTemp.toFixed(0)}° - {climateData.forecast[0].maxTemp.toFixed(0)}°
              </span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-3 text-xs text-right text-muted-foreground">
        Last updated: {new Date(climateData.lastUpdated).toLocaleString()}
      </div>
    </GlassCard>
  );
};

export default ClimateMonitoring;
