
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, Plant, CloudRain, Thermometer, Leaf, LayoutDashboard, History, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from '@/components/ui/GlassCard';
import { useToast } from '@/components/ui/use-toast';
import FarmEntitySelector from '@/components/agriculture/FarmEntitySelector';
import SoilMonitoring from '@/components/agriculture/SoilMonitoring';
import ClimateMonitoring from '@/components/agriculture/ClimateMonitoring';
import AgricultureRecommendations from '@/components/agriculture/AgricultureRecommendations';
import ZeroWasteMetrics from '@/components/agriculture/ZeroWasteMetrics';
import CropPlanner from '@/components/agriculture/CropPlanner';
import { useAgricultureData } from '@/hooks/useAgricultureData';
import { FarmEntityType } from '@/types/agriculture';

const AgricultureSystem: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEntity, setSelectedEntity] = useState<{ type: FarmEntityType; id: string }>({
    type: 'farmland',
    id: 'demo-farm-01'
  });

  const { 
    farmData, 
    soilData, 
    climateData, 
    recommendations, 
    zeroWasteScore,
    cropSuggestions,
    isLoading, 
    error, 
    lastUpdated,
    refreshData 
  } = useAgricultureData(selectedEntity.type, selectedEntity.id);

  const handleEntityChange = (type: FarmEntityType, id: string) => {
    setSelectedEntity({ type, id });
    toast({
      title: "Entity Selected",
      description: `Now viewing data for ${type} ID: ${id}`,
    });
  };

  const handleRefresh = () => {
    refreshData();
    toast({
      title: "Data Refreshed",
      description: "Agricultural monitoring data has been updated.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow container max-w-7xl mx-auto px-4 py-6 md:py-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              <Sprout className="mr-3 h-8 w-8 text-green-600" />
              Zero Waste Agriculture System
            </h1>
            <p className="text-muted-foreground mt-2">
              AI-powered sustainable farming with real-time monitoring and green credit integration
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/iot-dashboard')}
              className="flex items-center"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              EcoSync Dashboard
            </Button>
            
            <Button 
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center"
            >
              <History className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-1">
            <FarmEntitySelector 
              selectedEntity={selectedEntity}
              onEntityChange={handleEntityChange}
            />
          </div>
          
          <div className="lg:col-span-3">
            <ZeroWasteMetrics 
              zeroWasteScore={zeroWasteScore}
              farmData={farmData}
              isLoading={isLoading}
            />
          </div>
        </div>
        
        {error && (
          <GlassCard className="mb-6 p-4 border-red-200 bg-red-50 dark:bg-red-950/20">
            <div className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p>Error loading data: {error}</p>
            </div>
          </GlassCard>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto mb-6">
            <TabsTrigger value="dashboard" className="flex items-center">
              <Plant className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="soil" className="flex items-center">
              <Leaf className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Soil Data</span>
            </TabsTrigger>
            <TabsTrigger value="climate" className="flex items-center">
              <CloudRain className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Climate</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center">
              <Thermometer className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Recommendations</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SoilMonitoring 
                soilData={soilData} 
                isLoading={isLoading} 
                compact={true}
              />
              <ClimateMonitoring 
                climateData={climateData} 
                isLoading={isLoading}
                compact={true}
              />
            </div>
            <CropPlanner 
              cropSuggestions={cropSuggestions}
              farmData={farmData}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="soil" className="space-y-6">
            <SoilMonitoring 
              soilData={soilData} 
              isLoading={isLoading} 
              compact={false}
            />
          </TabsContent>
          
          <TabsContent value="climate" className="space-y-6">
            <ClimateMonitoring 
              climateData={climateData} 
              isLoading={isLoading}
              compact={false}
            />
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-6">
            <AgricultureRecommendations 
              recommendations={recommendations}
              farmData={farmData}
              entityType={selectedEntity.type}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
        
        {lastUpdated && (
          <p className="text-xs text-muted-foreground text-right mt-4">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        )}
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default AgricultureSystem;
