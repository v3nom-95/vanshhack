
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  ShieldCheck, 
  Expand, 
  Award 
} from 'lucide-react';

const benefits = [
  {
    icon: Globe,
    title: "Autonomous AI-powered sustainability",
    description: "Eliminate human corruption and delays with AI-driven enforcement of environmental policies."
  },
  {
    icon: ShieldCheck,
    title: "Self-executing smart contracts",
    description: "Ensure fairness and compliance through blockchain-verified transactions and penalties."
  },
  {
    icon: Expand,
    title: "Global Scalability",
    description: "Easily adapt our solution to cities, industries, homes, and farms worldwide."
  },
  {
    icon: Award,
    title: "Green Rewards Economy",
    description: "Promote eco-friendly behavior while enforcing accountability for all participants."
  }
];

const Benefits = () => {
  return (
    <section className="py-24 bg-ecosync-gray-light dark:bg-ecosync-dark-blue relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10 dark:to-black/10 pointer-events-none"></div>
      
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-ecosync-green-dark/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-40 w-96 h-96 bg-ecosync-blue-dark/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-ecosync-blue-light text-ecosync-blue-dark mb-4">
              Why Choose EcoSync
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-6"
          >
            Revolutionary Impact on Environmental Governance
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-foreground/70"
          >
            Our integrated approach creates a self-sustaining, fraud-proof, and autonomous environmental governance model.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-ecosync-green-dark to-ecosync-blue-dark p-0.5 mb-6"
                >
                  <div className="w-full h-full rounded-2xl bg-ecosync-gray-light dark:bg-ecosync-dark-blue flex items-center justify-center">
                    <Icon className="h-8 w-8 text-ecosync-green-dark" />
                  </div>
                </motion.div>
                
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-foreground/70">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block rounded-full p-1 bg-gradient-to-r from-ecosync-green-dark to-ecosync-blue-dark">
            <button className="py-3 px-8 rounded-full bg-ecosync-gray-light dark:bg-ecosync-dark-blue text-foreground font-medium transition-all duration-200 hover:bg-transparent hover:text-white">
              Join Our Ecosystem
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
