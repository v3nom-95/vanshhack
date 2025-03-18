
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Factory, 
  Home, 
  Sprout, 
  Shield, 
  ArrowUpRight 
} from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    title: "Smart Cities",
    description: "Real-time tracking of air quality, noise levels, water usage, and waste management using IoT sensors with AI-powered enforcement.",
    icon: Building2,
    example: "If pollution exceeds safe limits, AI automatically restricts factory emissions, promotes public transport, and optimizes traffic flow.",
    color: 'green' as const
  },
  {
    title: "Smart Industries",
    description: "IoT-driven environmental tracking of emissions, waste, and resource consumption with AI-powered regulation of sustainability impact.",
    icon: Factory,
    example: "If a factory exceeds carbon limits, blockchain-based smart contracts auto-deduct carbon taxes.",
    color: 'blue' as const
  },
  {
    title: "Smart Homes",
    description: "IoT-enabled home automation with AI auto-adjusting appliances, water flow, and lighting for maximum efficiency.",
    icon: Home,
    example: "AI turns off appliances when not in use, and homes earn sustainability tokens for eco-friendly practices.",
    color: 'green' as const
  },
  {
    title: "Smart Agriculture",
    description: "IoT sensors for precision agriculture with real-time tracking of soil quality, moisture levels, and fertilizer usage.",
    icon: Sprout,
    example: "If a farm reduces water usage by 20%, AI rewards them with sustainability credits on the blockchain.",
    color: 'blue' as const
  },
  {
    title: "Disaster Prevention",
    description: "AI-driven risk prediction based on real-time IoT & satellite data with automated emergency response via smart contracts.",
    icon: Shield,
    example: "If sensors detect wildfire risk, AI auto-activates irrigation systems & alerts authorities.",
    color: 'green' as const
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ecosync-gray-light dark:to-ecosync-dark opacity-50 pointer-events-none"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-ecosync-blue-light text-ecosync-blue-dark mb-4">
              Core Functionalities
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-6"
          >
            Revolutionizing Environmental Governance
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-foreground/70"
          >
            EcoSync integrates advanced technologies to create autonomous, transparent, and efficient sustainability systems across multiple domains.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
              example={feature.example}
              color={feature.color}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.a
            href="#technology"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center text-ecosync-green-dark font-medium hover:underline"
          >
            Explore our technology stack
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
