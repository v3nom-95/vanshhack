
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
  example: string;
  color: 'green' | 'blue';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  index, 
  example,
  color
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="feature-card-shadow rounded-2xl overflow-hidden bg-white dark:bg-ecosync-dark-blue"
    >
      <div className="p-8">
        <motion.div 
          whileHover={{ 
            scale: 1.05, 
            rotate: 5,
            transition: { duration: 0.2 }
          }}
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
            color === 'green' 
              ? "bg-gradient-to-br from-ecosync-green-light to-ecosync-green-dark/20" 
              : "bg-gradient-to-br from-ecosync-blue-light to-ecosync-blue-dark/20"
          )}
        >
          <Icon 
            className={cn(
              "w-6 h-6", 
              color === 'green' ? "text-ecosync-green-dark" : "text-ecosync-blue-dark"
            )} 
          />
        </motion.div>
        
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        
        <p className="text-foreground/70 mb-5">
          {description}
        </p>
        
        <div 
          className={cn(
            "p-4 rounded-xl text-sm",
            color === 'green' ? "bg-ecosync-green-light/50" : "bg-ecosync-blue-light/50"
          )}
        >
          <span 
            className={cn(
              "font-medium",
              color === 'green' ? "text-ecosync-green-dark" : "text-ecosync-blue-dark"
            )}
          >
            Example:
          </span>{" "}
          {example}
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
