import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Droplet, 
  Thermometer, 
  Sun, 
  Leaf, 
  AlertCircle,
  Brain,
  TrendingUp,
  Sprout,
  LineChart,
  BarChart
} from 'lucide-react';
import { SensorReading } from '@/types/iot';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar } from 'recharts';

interface AgricultureMetrics {
  soilMoisture: number;
  temperature: number;
  lightIntensity: number;
  soilHealth: number;
  waterEfficiency: number;
  cropHealth: number;
  lastUpdate?: Date;
}

interface AIRecommendation {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  priority: number;
  category: 'water' | 'soil' | 'light' | 'general';
}

interface HistoricalData {
  timestamp: string;
  soilMoisture: number;
  temperature: number;
  lightIntensity: number;
  soilHealth: number;
  waterEfficiency: number;
  cropHealth: number;
}

const ZeroWasteAgriculture: React.FC = () => {
  const [metrics, setMetrics] = useState<AgricultureMetrics>({
    soilMoisture: 0,
    temperature: 0,
    lightIntensity: 0,
    soilHealth: 0,
    waterEfficiency: 0,
    cropHealth: 0,
  });

  const [displayMetrics, setDisplayMetrics] = useState<AgricultureMetrics>({
    soilMoisture: 0,
    temperature: 0,
    lightIntensity: 0,
    soilHealth: 0,
    waterEfficiency: 0,
    cropHealth: 0,
  });

  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const MAX_HISTORY_POINTS = 20;

  // Add soil moisture specific constants
  const SOIL_MOISTURE_RANGE = {
    min: 20,  // Minimum acceptable moisture
    optimal: 60,  // Optimal moisture level
    max: 80,  // Maximum acceptable moisture
    critical: 15  // Critical level requiring immediate action
  };

  // Enhanced smooth transition function for soil moisture
  const smoothTransition = useCallback((current: number, target: number, speed: number = 0.1) => {
    const diff = target - current;
    const newValue = current + diff * speed;
    return Math.max(0, Math.min(100, newValue)); // Ensure value stays within bounds
  }, []);

  // Validate soil moisture value
  const validateSoilMoisture = useCallback((value: number) => {
    if (value < SOIL_MOISTURE_RANGE.critical) {
      return {
        isValid: false,
        status: 'critical',
        message: 'Critical: Soil moisture dangerously low'
      };
    }
    if (value < SOIL_MOISTURE_RANGE.min) {
      return {
        isValid: false,
        status: 'warning',
        message: 'Warning: Soil moisture below optimal range'
      };
    }
    if (value > SOIL_MOISTURE_RANGE.max) {
      return {
        isValid: false,
        status: 'warning',
        message: 'Warning: Soil moisture above optimal range'
      };
    }
    return {
      isValid: true,
      status: 'optimal',
      message: 'Soil moisture within optimal range'
    };
  }, []);

  // Update display metrics with smooth transitions
  useEffect(() => {
    const updateDisplay = () => {
      setDisplayMetrics(prev => ({
        soilMoisture: smoothTransition(prev.soilMoisture, metrics.soilMoisture),
        temperature: smoothTransition(prev.temperature, metrics.temperature),
        lightIntensity: smoothTransition(prev.lightIntensity, metrics.lightIntensity),
        soilHealth: smoothTransition(prev.soilHealth, metrics.soilHealth),
        waterEfficiency: smoothTransition(prev.waterEfficiency, metrics.waterEfficiency),
        cropHealth: smoothTransition(prev.cropHealth, metrics.cropHealth),
      }));
    };

    const interval = setInterval(updateDisplay, 30); // Increased from 50ms to 30ms for faster updates
    return () => clearInterval(interval);
  }, [metrics, smoothTransition]);

  const generateAIRecommendations = useCallback((data: AgricultureMetrics, previous: AgricultureMetrics) => {
    const newRecommendations: AIRecommendation[] = [];

    // Water-related recommendations with hysteresis
    if (data.soilMoisture < 30 && data.soilMoisture < previous.soilMoisture) {
      newRecommendations.push({
        title: 'Low Soil Moisture Alert',
        description: 'Soil moisture is below optimal levels. Consider implementing drip irrigation or adjusting watering schedule.',
        impact: 'high',
        priority: 1,
        category: 'water',
      });
    }

    if (data.waterEfficiency < 70 && data.waterEfficiency < previous.waterEfficiency) {
      newRecommendations.push({
        title: 'Improve Water Efficiency',
        description: 'Current water usage efficiency is below target. Consider implementing smart irrigation systems.',
        impact: 'medium',
        priority: 2,
        category: 'water',
      });
    }

    // Temperature-related recommendations with hysteresis
    if (data.temperature > 30 && data.temperature > previous.temperature) {
      newRecommendations.push({
        title: 'High Temperature Warning',
        description: 'Temperature exceeds optimal range. Consider implementing shade structures or adjusting planting schedule.',
        impact: 'high',
        priority: 1,
        category: 'general',
      });
    }

    // Soil health recommendations with hysteresis
    if (data.soilHealth < 60 && data.soilHealth < previous.soilHealth) {
      newRecommendations.push({
        title: 'Soil Health Improvement Needed',
        description: 'Soil health indicators suggest nutrient deficiency. Consider organic composting and crop rotation.',
        impact: 'high',
        priority: 1,
        category: 'soil',
      });
    }

    // Light-related recommendations with hysteresis
    if (data.lightIntensity < 500 && data.lightIntensity < previous.lightIntensity) {
      newRecommendations.push({
        title: 'Low Light Conditions',
        description: 'Light intensity is below optimal levels. Consider adjusting plant spacing or implementing reflective materials.',
        impact: 'medium',
        priority: 2,
        category: 'light',
      });
    }

    // Crop health recommendations with hysteresis
    if (data.cropHealth < 70 && data.cropHealth < previous.cropHealth) {
      newRecommendations.push({
        title: 'Crop Health Alert',
        description: 'Crop health indicators suggest potential issues. Consider implementing integrated pest management.',
        impact: 'high',
        priority: 1,
        category: 'general',
      });
    }

    setRecommendations(newRecommendations);
  }, []);

  // Simulated real-time sensor data updates with gradual changes
  useEffect(() => {
    let previousMetrics = { ...metrics };

    const generateNewValue = (current: number, min: number, max: number, changeRate: number = 0.1) => {
      const change = (Math.random() - 0.5) * changeRate;
      return Math.max(min, Math.min(max, current + change));
    };

    const fetchSensorData = async () => {
      try {
        // Generate new soil moisture with more realistic changes
        const newSoilMoisture = generateNewValue(
          previousMetrics.soilMoisture,
          SOIL_MOISTURE_RANGE.min,
          SOIL_MOISTURE_RANGE.max,
          1.5  // Reduced change rate for more stable readings
        );

        const newMetrics = {
          soilMoisture: newSoilMoisture,
          temperature: generateNewValue(previousMetrics.temperature, 15, 35, 0.5),
          lightIntensity: generateNewValue(previousMetrics.lightIntensity, 0, 1000, 20),
          soilHealth: generateNewValue(previousMetrics.soilHealth, 0, 100, 1),
          waterEfficiency: generateNewValue(previousMetrics.waterEfficiency, 0, 100, 1),
          cropHealth: generateNewValue(previousMetrics.cropHealth, 0, 100, 1),
          lastUpdate: new Date()
        };

        // Update historical data
        const timestamp = new Date().toLocaleTimeString();
        setHistoricalData(prev => {
          const newData = [...prev, { timestamp, ...newMetrics }];
          return newData.slice(-MAX_HISTORY_POINTS);
        });

        generateAIRecommendations(newMetrics, previousMetrics);
        previousMetrics = newMetrics;
        setMetrics(newMetrics);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchSensorData();

    // Set up polling every 3 seconds for more frequent updates
    const interval = setInterval(fetchSensorData, 3000);

    return () => clearInterval(interval);
  }, [generateAIRecommendations]);

  const getMetricColor = (value: number) => {
    if (value >= 80) return 'text-green-500';
    if (value >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Get soil moisture status
  const getSoilMoistureStatus = useCallback(() => {
    return validateSoilMoisture(displayMetrics.soilMoisture);
  }, [displayMetrics.soilMoisture, validateSoilMoisture]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Zero Waste Agriculture</h1>
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-blue-500" />
          <span className="text-sm text-gray-500">AI-Powered Insights</span>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
            <Droplet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{displayMetrics.soilMoisture.toFixed(1)}%</div>
                <div className={`text-sm ${getSoilMoistureStatus().status === 'critical' ? 'text-red-500' : 
                  getSoilMoistureStatus().status === 'warning' ? 'text-yellow-500' : 'text-green-500'}`}>
                  {getSoilMoistureStatus().message}
                </div>
              </div>
              <Progress 
                value={displayMetrics.soilMoisture} 
                className={`mt-2 ${
                  getSoilMoistureStatus().status === 'critical' ? 'bg-red-100' :
                  getSoilMoistureStatus().status === 'warning' ? 'bg-yellow-100' :
                  'bg-green-100'
                }`}
              />
              <div className="text-xs text-gray-500">
                Last updated: {metrics.lastUpdate?.toLocaleTimeString()}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayMetrics.temperature.toFixed(1)}°C</div>
            <Progress value={(displayMetrics.temperature / 40) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Light Intensity</CardTitle>
            <Sun className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayMetrics.lightIntensity.toFixed(0)} lux</div>
            <Progress value={(displayMetrics.lightIntensity / 1000) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Health</CardTitle>
            <Leaf className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayMetrics.soilHealth.toFixed(1)}%</div>
            <Progress value={displayMetrics.soilHealth} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayMetrics.waterEfficiency.toFixed(1)}%</div>
            <Progress value={displayMetrics.waterEfficiency} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crop Health</CardTitle>
            <Sprout className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayMetrics.cropHealth.toFixed(1)}%</div>
            <Progress value={displayMetrics.cropHealth} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Historical Data Charts */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Historical Data Analysis</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temperature and Soil Moisture Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-blue-500" />
                Temperature & Soil Moisture Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="temperature"
                      stroke="#ef4444"
                      name="Temperature (°C)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="soilMoisture"
                      stroke="#3b82f6"
                      name="Soil Moisture (%)"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Health Metrics Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-green-500" />
                Health Metrics Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="soilHealth" fill="#22c55e" name="Soil Health (%)" />
                    <Bar dataKey="cropHealth" fill="#84cc16" name="Crop Health (%)" />
                    <Bar dataKey="waterEfficiency" fill="#3b82f6" name="Water Efficiency (%)" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">AI-Powered Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, index) => (
            <Card key={index} className={`border-l-4 ${
              rec.impact === 'high' ? 'border-red-500' :
              rec.impact === 'medium' ? 'border-yellow-500' :
              'border-green-500'
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                  <AlertCircle className={`h-5 w-5 ${
                    rec.impact === 'high' ? 'text-red-500' :
                    rec.impact === 'medium' ? 'text-yellow-500' :
                    'text-green-500'
                  }`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{rec.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Priority: {rec.priority}</span>
                  <span className="text-sm text-gray-500">Category: {rec.category}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ZeroWasteAgriculture; 