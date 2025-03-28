import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, AlertCircle, BadgeDollarSign } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RecommendationItem, FineAssessment, EntityType } from '@/types/iot';
import FinePayment from './FinePayment';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SustainabilityRecommendationsProps {
  recommendations: RecommendationItem[];
  fines: FineAssessment[];
  entityType: EntityType;
  isLoading: boolean;
}

const SustainabilityRecommendations: React.FC<SustainabilityRecommendationsProps> = ({
  recommendations,
  fines,
  entityType,
  isLoading
}) => {
  const [selectedFine, setSelectedFine] = useState<FineAssessment | null>(null);

  if (isLoading) {
    return (
      <div className="p-6 bg-card rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recommendations & Compliance</h3>
        <div className="text-center text-muted-foreground">
          Loading recommendations...
        </div>
      </div>
    );
  }

  if (recommendations.length === 0 && fines.length === 0) {
    return (
      <div className="p-6 bg-card rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recommendations & Compliance</h3>
        <div className="text-center text-muted-foreground">
          No recommendations or fines available. Please select an entity.
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-500';
      case 'high':
        return 'text-orange-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-green-500';
    }
  };

  const handlePaymentComplete = () => {
    setSelectedFine(null);
  };

  const handleAppeal = (fine: FineAssessment) => {
    // Implementation of handleAppeal function
  };

  const handlePayFine = (fine: FineAssessment) => {
    setSelectedFine(fine);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-card rounded-lg shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-4">Recommendations & Compliance</h3>
      
      <div className="space-y-8">
        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">AI Recommendations</h4>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{rec.title}</h5>
                    <span className={`text-sm font-medium ${getSeverityColor(rec.severity)}`}>
                      {rec.severity.charAt(0).toUpperCase() + rec.severity.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                  <p className="text-sm mb-3">{rec.impact}</p>
                  <div>
                    <h6 className="text-sm font-medium mb-2">Suggested Actions:</h6>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {rec.suggestedActions.map((action, i) => (
                        <li key={i}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compliance Fines */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Compliance Fines</h3>
            <Badge variant="destructive" className="animate-pulse">
              {fines.length} Active Fines
            </Badge>
          </div>
          
          <div className="grid gap-4">
            {fines.map((fine) => {
              // Ensure fine amount is capped at $50
              const cappedAmount = Math.min(fine.amount, 50);
              
              return (
                <Card key={fine.category} className="relative overflow-hidden">
                  <CardHeader className="space-y-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {fine.category.charAt(0).toUpperCase() + fine.category.slice(1)} Violation
                      </CardTitle>
                      <Badge variant="destructive" className="animate-pulse">
                        ${cappedAmount.toFixed(2)}
                        {fine.amount > 50 && (
                          <span className="ml-1 text-xs opacity-75">
                            (Capped from ${fine.amount.toFixed(2)})
                          </span>
                        )}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      Due by {new Date(fine.dueDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{fine.reason}</p>
                    {fine.regulationCode && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Regulation Code: {fine.regulationCode}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAppeal(fine)}
                      className="text-xs"
                    >
                      Appeal Fine
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handlePayFine(fine)}
                      className="text-xs"
                    >
                      Pay Fine
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Payment Modal */}
        {selectedFine && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
              <FinePayment
                fine={selectedFine}
                onPaymentComplete={handlePaymentComplete}
              />
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="text-sm text-muted-foreground">
          <p>
            {recommendations.length > 0
              ? `Based on current environmental performance, we've generated ${recommendations.length} recommendations to improve sustainability.`
              : 'No specific recommendations are needed at this time.'}
          </p>
          {fines.length > 0 && (
            <p className="mt-1">
              {entityType === 'company'
                ? 'Your company has received compliance fines that need to be addressed.'
                : entityType === 'city'
                ? 'The city has received compliance fines that need to be addressed.'
                : 'No compliance fines have been issued.'}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SustainabilityRecommendations;
