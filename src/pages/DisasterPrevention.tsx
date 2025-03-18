import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { AlertTriangle, ChevronRight, TrendingUp, Activity, AlertCircle } from 'lucide-react';

interface DisasterMetrics {
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  seismicActivity: number;
  floodRisk: number;
}

interface DisasterAlert {
  id: string;
  location: string;
  type: 'earthquake' | 'flood' | 'storm' | 'fire';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  coordinates: [number, number];
}

const DisasterPrevention: React.FC = () => {
  const [metrics, setMetrics] = useState<DisasterMetrics>({
    temperature: 25,
    humidity: 65,
    windSpeed: 12,
    rainfall: 0,
    seismicActivity: 0,
    floodRisk: 0
  });

  const [historicalData, setHistoricalData] = useState<DisasterMetrics[]>([]);
  const [alerts, setAlerts] = useState<DisasterAlert[]>([]);

  useEffect(() => {
    const fetchData = () => {
      // Simulate real-time data updates
      setMetrics(prev => ({
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: prev.humidity + (Math.random() - 0.5) * 5,
        windSpeed: prev.windSpeed + (Math.random() - 0.5) * 3,
        rainfall: prev.rainfall + (Math.random() - 0.5) * 1,
        seismicActivity: prev.seismicActivity + (Math.random() - 0.5) * 0.5,
        floodRisk: prev.floodRisk + (Math.random() - 0.5) * 0.3
      }));

      // Update historical data
      setHistoricalData(prev => {
        const newData = [...prev, metrics];
        return newData.slice(-20); // Keep last 20 data points
      });

      // Simulate new alerts
      if (Math.random() < 0.1) { // 10% chance of new alert
        const newAlert: DisasterAlert = {
          id: Math.random().toString(36).substr(2, 9),
          location: ['Tokyo', 'New York', 'London', 'Paris', 'Sydney'][Math.floor(Math.random() * 5)],
          type: ['earthquake', 'flood', 'storm', 'fire'][Math.floor(Math.random() * 4)] as DisasterAlert['type'],
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as DisasterAlert['severity'],
          description: 'Potential disaster detected in the area',
          timestamp: new Date().toISOString(),
          coordinates: [Math.random() * 360 - 180, Math.random() * 180 - 90]
        };
        setAlerts(prev => [...prev, newAlert].slice(-5)); // Keep last 5 alerts
      }
    };

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [metrics]);

  const getSeverityColor = (severity: DisasterAlert['severity']) => {
    switch (severity) {
      case 'low': return '#4CAF50';
      case 'medium': return '#FFC107';
      case 'high': return '#FF9800';
      case 'critical': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Disaster Prevention</h1>
        <Button variant="outline">
          View All Alerts
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Temperature</h3>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold">{metrics.temperature.toFixed(1)}°C</div>
          <div className="text-sm text-gray-500 mt-2">Current temperature</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Humidity</h3>
            <Activity className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold">{metrics.humidity.toFixed(1)}%</div>
          <div className="text-sm text-gray-500 mt-2">Current humidity</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Wind Speed</h3>
            <Activity className="h-5 w-5 text-purple-500" />
          </div>
          <div className="text-3xl font-bold">{metrics.windSpeed.toFixed(1)} km/h</div>
          <div className="text-sm text-gray-500 mt-2">Current wind speed</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Historical Data</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
                <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
                <Line type="monotone" dataKey="windSpeed" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Disaster Risk Assessment</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Earthquake', value: metrics.seismicActivity },
                { name: 'Flood', value: metrics.floodRisk },
                { name: 'Storm', value: metrics.windSpeed / 10 },
                { name: 'Fire', value: metrics.temperature / 5 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Global Disaster Map</h3>
        <div className="h-[400px] relative bg-gray-50 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/world-map.svg" 
              alt="World Map" 
              className="w-full h-full object-contain opacity-50"
            />
          </div>
          <div className="relative z-10 h-full">
            {alerts.map(alert => (
              <div
                key={alert.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${((alert.coordinates[0] + 180) / 360) * 100}%`,
                  top: `${((90 - alert.coordinates[1]) / 180) * 100}%`,
                }}
                onClick={(event: React.MouseEvent) => {
                  const popup = document.createElement('div');
                  popup.className = 'fixed bg-white p-4 rounded-lg shadow-lg z-50 max-w-xs';
                  popup.style.left = `${event.clientX}px`;
                  popup.style.top = `${event.clientY}px`;
                  popup.innerHTML = `
                    <div class="flex items-center gap-2 mb-2">
                      <div class="w-3 h-3 rounded-full" style="background-color: ${getSeverityColor(alert.severity)}"></div>
                      <h4 class="font-bold">${alert.location}</h4>
                    </div>
                    <div class="space-y-1">
                      <p class="text-sm"><span class="font-medium">Type:</span> ${alert.type}</p>
                      <p class="text-sm"><span class="font-medium">Severity:</span> ${alert.severity}</p>
                      <p class="text-sm">${alert.description}</p>
                      <p class="text-xs text-gray-500">${new Date(alert.timestamp).toLocaleString()}</p>
                    </div>
                  `;
                  document.body.appendChild(popup);
                  setTimeout(() => popup.remove(), 3000);
                }}
              >
                <div className="relative">
                  <div 
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ 
                      backgroundColor: getSeverityColor(alert.severity),
                      opacity: 0.3
                    }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-white"
                    style={{ backgroundColor: getSeverityColor(alert.severity) }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
            <div className="text-sm font-medium mb-2">Alert Severity</div>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#4CAF50] mr-2"></div>
                <span className="text-xs">Low</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#FFC107] mr-2"></div>
                <span className="text-xs">Medium</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#FF9800] mr-2"></div>
                <span className="text-xs">High</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#F44336] mr-2"></div>
                <span className="text-xs">Critical</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Active Alerts</h3>
        {alerts.map(alert => (
          <Card key={alert.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <AlertCircle className="h-5 w-5" style={{ color: getSeverityColor(alert.severity) }} />
                <div>
                  <div className="font-semibold">{alert.location}</div>
                  <div className="text-sm text-gray-500">{alert.type}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(alert.timestamp).toLocaleTimeString()}
              </div>
            </div>
            <div className="mt-2 text-sm">{alert.description}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DisasterPrevention; 