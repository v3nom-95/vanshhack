import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, AlertCircle, BadgeDollarSign } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RecommendationItem, FineAssessment, EntityType } from '@/types/iot';
import FinePayment from './FinePayment';

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

        {/* Fines */}
        {fines.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Compliance Fines</h4>
            <div className="space-y-4">
              {fines.map((fine, index) => (
                <div key={index} className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/10">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-red-600 dark:text-red-400">
                      Fine: ${fine.amount.toLocaleString()}
                    </h5>
                    <span className="text-sm text-muted-foreground">
                      Due: {new Date(fine.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{fine.reason}</p>
                  {fine.regulationCode && (
                    <p className="text-sm text-muted-foreground">
                      Regulation Code: {fine.regulationCode}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    Appeal Deadline: {new Date(fine.appealDeadline).toLocaleDateString()}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => setSelectedFine(fine)}
                      className="text-sm text-red-600 dark:text-red-400 hover:underline"
                    >
                      Pay Fine
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
