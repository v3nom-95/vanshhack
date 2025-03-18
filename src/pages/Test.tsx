import React from 'react';
import { motion } from 'framer-motion';

const Test = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-ecosync-green-dark mb-4">
          Test Page
        </h1>
        <p className="text-lg text-foreground/80">
          If you can see this, routing is working correctly!
        </p>
      </div>
    </motion.div>
  );
};

export default Test; 