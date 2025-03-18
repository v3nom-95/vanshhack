import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Vehicle {
  id: number;
  type: 'ev' | 'petrol';
  emissions: number; // in gCO2/km
  speed: number;
  lane: number; // 0: left, 1: center, 2: right
}

const SmartRoads = () => {
  const [hoveredVehicle, setHoveredVehicle] = useState<Vehicle | null>(null);

  // Sample vehicles with different emission levels
  const vehicles: Vehicle[] = [
    { id: 1, type: 'ev', emissions: 0, speed: 60, lane: 0 },
    { id: 2, type: 'ev', emissions: 0, speed: 65, lane: 1 },
    { id: 3, type: 'petrol', emissions: 120, speed: 55, lane: 2 },
    { id: 4, type: 'petrol', emissions: 150, speed: 70, lane: 0 },
    { id: 5, type: 'petrol', emissions: 180, speed: 50, lane: 1 },
  ];

  const getEmissionColor = (emissions: number) => {
    if (emissions === 0) return 'bg-green-500';
    if (emissions < 100) return 'bg-yellow-500';
    if (emissions < 150) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-ecosync-green-dark">Smart Roads</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Interactive Roadway Emissions Visualization</h2>
        <p className="text-gray-600 mb-6">
          Hover over vehicles to see their emission levels. The color intensity indicates the amount of carbon emissions:
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Zero Emissions (EV)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span>Low Emissions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span>Medium Emissions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>High Emissions</span>
            </div>
          </div>
        </p>
      </div>

      <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden">
        {/* Road */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-32 bg-gray-800 relative">
            {/* Road lines */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <div className="w-8 h-1 bg-white"></div>
              <div className="w-8 h-1 bg-white"></div>
              <div className="w-8 h-1 bg-white"></div>
            </div>
            {/* Lane dividers */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <div className="w-full h-0.5 bg-white opacity-50"></div>
              <div className="w-full h-0.5 bg-white opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Vehicles */}
        {vehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            className={`absolute h-6 w-6 ${getEmissionColor(vehicle.emissions)} rounded-full cursor-pointer`}
            animate={{
              x: [0, 800, 0],
              y: [200 + (vehicle.lane * 20), 200 + (vehicle.lane * 20), 200 + (vehicle.lane * 20)],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: index
            }}
            onHoverStart={() => setHoveredVehicle(vehicle)}
            onHoverEnd={() => setHoveredVehicle(null)}
          />
        ))}
      </div>

      {/* Vehicle Information Tooltip */}
      <AnimatePresence>
        {hoveredVehicle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg z-50"
          >
            <h3 className="text-lg font-semibold mb-2">
              {hoveredVehicle.type === 'ev' ? 'Electric Vehicle' : 'Petrol Vehicle'}
            </h3>
            <div className="space-y-2">
              <p>Emissions: {hoveredVehicle.emissions} gCO2/km</p>
              <p>Speed: {hoveredVehicle.speed} km/h</p>
              <p>Lane: {hoveredVehicle.lane + 1}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-green-800">Left Lane</h3>
          <p className="text-gray-600">
            Mix of EVs and petrol vehicles with varying emission levels.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Center Lane</h3>
          <p className="text-gray-600">
            Regular traffic lane with both EV and petrol vehicles.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-red-800">Right Lane</h3>
          <p className="text-gray-600">
            Lane with vehicles showing different emission levels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartRoads; 