
import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Droplet, Calendar, ArrowRight, ThumbsUp } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CropSuggestion, FarmData } from '@/types/agriculture';

interface CropPlannerProps {
  cropSuggestions: CropSuggestion[];
  farmData: FarmData | null;
  isLoading: boolean;
}

const CropPlanner: React.FC<CropPlannerProps> = ({ cropSuggestions, farmData, isLoading }) => {
  if (isLoading) {
    return (
      <GlassCard className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading crop suggestions...</p>
      </GlassCard>
    );
  }

  if (!cropSuggestions.length || !farmData) {
    return (
      <GlassCard className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">No crop suggestions available</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5">
      <h3 className="text-xl font-semibold flex items-center mb-4">
        <Sprout className="mr-2 h-5 w-5 text-green-600" />
        AI-Powered Crop Suggestions
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Sustainable crop recommendations based on your soil conditions, climate, and farm type
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cropSuggestions.map((crop, index) => (
          <motion.div
            key={crop.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border rounded-lg overflow-hidden"
          >
            <div className="p-4 border-b bg-green-50 dark:bg-green-900/20">
              <div className="flex justify-between items-start">
                <h4 className="text-lg font-medium">{crop.name}</h4>
                <Badge 
                  className={`${
                    crop.suitabilityScore >= 80 ? 'bg-green-500' : 
                    crop.suitabilityScore >= 60 ? 'bg-blue-500' : 
                    crop.suitabilityScore >= 40 ? 'bg-amber-500' : 
                    'bg-red-500'
                  }`}
                >
                  {crop.suitabilityScore.toFixed(0)}% Match
                </Badge>
              </div>
              
              <div className="mt-2">
                <Progress 
                  value={crop.suitabilityScore} 
                  className={`h-2 ${
                    crop.suitabilityScore >= 80 ? 'bg-green-500' : 
                    crop.suitabilityScore >= 60 ? 'bg-blue-500' : 
                    crop.suitabilityScore >= 40 ? 'bg-amber-500' : 
                    'bg-red-500'
                  }`} 
                />
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-sm mb-4">{crop.description}</p>
              
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                <div className="flex items-center">
                  <Droplet className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-muted-foreground">Water: </span>
                  <span className="ml-1 font-medium">
                    {crop.waterRequirements < 30 ? 'Low' : crop.waterRequirements < 50 ? 'Medium' : 'High'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-muted-foreground">Growth: </span>
                  <span className="ml-1 font-medium">{crop.growthPeriod} days</span>
                </div>
                
                <div className="flex items-center col-span-2">
                  <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-muted-foreground">Plant by: </span>
                  <span className="ml-1 font-medium">{crop.idealPlantingDate}</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t">
                <div className="text-xs font-medium mb-1">Key Benefits:</div>
                <ul className="text-xs text-muted-foreground">
                  {crop.benefits.slice(0, 2).map((benefit, i) => (
                    <li key={i} className="flex items-start my-1">
                      <ArrowRight className="h-3 w-3 text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-5 text-sm text-muted-foreground text-right">
        <p>Recommendations based on AI analysis of soil, climate, and farm conditions</p>
      </div>
    </GlassCard>
  );
};

export default CropPlanner;
