import React from 'react';
import { motion } from 'framer-motion';
import { IoTDataFeedProps } from '@/types/iot';

const IoTDataFeed: React.FC<IoTDataFeedProps> = ({
  airQuality,
  temperature,
  humidity,
  energyUsage,
  waterUsage,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="p-6 bg-card rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Sensor Data</h3>
        <div className="text-center text-muted-foreground">
          Loading sensor data...
        </div>
      </div>
    );
  }

  const getStatusColor = (value: number, threshold: number) => {
    if (value <= threshold * 0.7) return 'text-green-500';
    if (value <= threshold * 0.9) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-card rounded-lg shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-4">Real-time Sensor Data</h3>
      
      <div className="space-y-6">
        {/* Air Quality Section */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Air Quality</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">AQI</p>
              <p className={`text-xl font-semibold ${getStatusColor(airQuality, 100)}`}>
                {airQuality.toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        {/* Temperature Section */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Temperature</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current</p>
              <p className={`text-xl font-semibold ${getStatusColor(temperature, 30)}`}>
                {temperature.toFixed(1)}°C
              </p>
            </div>
          </div>
        </div>

        {/* Humidity Section */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Humidity</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current</p>
              <p className={`text-xl font-semibold ${getStatusColor(humidity, 60)}`}>
                {humidity.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Energy Usage Section */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Energy Usage</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current</p>
              <p className={`text-xl font-semibold ${getStatusColor(energyUsage, 3000)}`}>
                {energyUsage.toFixed(1)} kWh
              </p>
            </div>
          </div>
        </div>

        {/* Water Usage Section */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Water Usage</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current</p>
              <p className={`text-xl font-semibold ${getStatusColor(waterUsage, 1500)}`}>
                {waterUsage.toFixed(1)} L
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IoTDataFeed;
