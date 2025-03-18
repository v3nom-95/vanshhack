
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, AlertCircle, ArrowRight, DollarSign } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AgricultureRecommendation, FarmData, FarmEntityType } from '@/types/agriculture';

interface AgricultureRecommendationsProps {
  recommendations: AgricultureRecommendation[];
  farmData: FarmData | null;
  entityType: FarmEntityType;
  isLoading: boolean;
}

const AgricultureRecommendations: React.FC<AgricultureRecommendationsProps> = ({
  recommendations,
  farmData,
  entityType,
  isLoading
}) => {
  if (isLoading) {
    return (
      <GlassCard className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading recommendations...</p>
      </GlassCard>
    );
  }

  if (!recommendations.length || !farmData) {
    return (
      <GlassCard className="h-full flex flex-col items-center justify-center p-8 text-center">
        <Lightbulb className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Recommendations Needed</h3>
        <p className="text-muted-foreground">
          Great job! Your agricultural practices are excellent. 
          Keep up the good work to maintain your sustainability score.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
            Zero Waste Farming Recommendations
          </h2>
          <p className="text-sm text-muted-foreground">
            AI-generated recommendations to improve your farm's sustainability
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Improvement Actions</h3>
          <Accordion type="single" collapsible className="space-y-2">
            {recommendations.map((rec, index) => (
              <motion.div
                key={`${rec.category}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="border rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                    <div className="flex items-center text-left">
                      <Badge 
                        className={`mr-3 ${
                          rec.severity === 'critical' ? 'bg-red-500' : 
                          rec.severity === 'high' ? 'bg-orange-500' : 
                          rec.severity === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                        }`}
                      >
                        {rec.severity.toUpperCase()}
                      </Badge>
                      <span>{rec.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 pb-4">
                    <p className="mb-3">{rec.description}</p>
                    <div className="mb-3">
                      <span className="text-sm font-medium">Environmental Impact:</span>
                      <p className="text-sm text-muted-foreground">{rec.impact}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">Implementation Cost:</span>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${rec.implementationCost === 'low' ? 'border-green-500 text-green-600' : 
                            rec.implementationCost === 'medium' ? 'border-amber-500 text-amber-600' : 
                            'border-red-500 text-red-600'}
                          `}
                        >
                          {rec.implementationCost.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">Estimated Return:</span>
                        <Badge variant="outline" className="border-green-500 text-green-600">
                          {rec.estimatedReturn}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">Recommended Actions:</span>
                      <ul className="mt-2 space-y-2">
                        {rec.suggestedActions.map((action, i) => (
                          <li key={i} className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span className="text-sm">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <div className="pt-2 border-t mt-4">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-green-600" />
            Available Incentives & Programs
          </h3>
          
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">Sustainable Agriculture Incentive Program</h4>
                <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                  UP TO $15,000
                </Badge>
              </div>
              
              <p className="text-sm mb-3">
                Government-funded program providing financial support for implementing
                sustainable farming practices on working lands.
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <span className="block font-medium">Application Deadline:</span>
                  July 31, 2023
                </div>
                <div>
                  <span className="block font-medium">Eligibility:</span>
                  {entityType === 'farmland' || entityType === 'orchard' ? 'Eligible' : 'Partially Eligible'}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">Zero Waste Agriculture Tax Credit</h4>
                <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                  TAX CREDIT
                </Badge>
              </div>
              
              <p className="text-sm mb-3">
                Tax incentives for farms implementing zero waste practices including 
                composting, precision agriculture, and water recycling systems.
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <span className="block font-medium">Credit Amount:</span>
                  Up to 25% of qualified expenses
                </div>
                <div>
                  <span className="block font-medium">Eligibility:</span>
                  All farm types eligible
                </div>
              </div>
            </motion.div>
            
            <div className="text-center pt-2">
              <p className="text-sm text-muted-foreground">
                Contact your local USDA office or visit <span className="text-blue-600 cursor-pointer">agriculture.gov/incentives</span> for details
              </p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default AgricultureRecommendations;
