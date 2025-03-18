
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { 
  Server, 
  Database, 
  Code, 
  Cpu, 
  Globe, 
  Shield,
  BrainCircuit,
  Layers,
  Laptop
} from 'lucide-react';

const technologies = [
  {
    title: "Backend & AI",
    icon: BrainCircuit,
    items: [
      "Deep Learning models for environmental analysis",
      "Node.js + Express.js for scalable backend",
      "IoT Integration via MQTT and WebSockets"
    ],
    color: "from-ecosync-green-dark to-ecosync-blue-dark"
  },
  {
    title: "Blockchain",
    icon: Layers,
    items: [
      "Ethereum + Solidity for smart contracts",
      "Polygon Layer 2 for fast & low-cost transactions",
      "Web3.js for blockchain integration"
    ],
    color: "from-purple-500 to-blue-600"
  },
  {
    title: "Frontend & UI/UX",
    icon: Laptop,
    items: [
      "React.js + Tailwind CSS for modern interfaces",
      "Next.js for server-side rendering",
      "Framer Motion for engaging visualizations"
    ],
    color: "from-ecosync-blue-dark to-ecosync-green-dark"
  }
];

const technologyIcons = [
  { icon: Server, delay: 0, color: "text-ecosync-green-dark" },
  { icon: Database, delay: 0.1, color: "text-ecosync-blue-dark" },
  { icon: Code, delay: 0.2, color: "text-ecosync-green-medium" },
  { icon: Cpu, delay: 0.3, color: "text-ecosync-blue-medium" },
  { icon: Globe, delay: 0.4, color: "text-ecosync-green-dark" },
  { icon: Shield, delay: 0.5, color: "text-ecosync-blue-dark" },
];

const Technology = () => {
  return (
    <section id="technology" className="py-24 relative">
      <div className="absolute inset-0 bg-hero-pattern opacity-50 pointer-events-none"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-ecosync-green-light text-ecosync-green-dark mb-4">
              Technology Stack
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-6"
          >
            Cutting-Edge Technology Integration
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-foreground/70"
          >
            EcoSync leverages the latest advancements in AI, IoT, and blockchain to create a seamless, secure, and scalable platform.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <GlassCard 
                key={tech.title} 
                className="h-full" 
                delay={index * 0.1}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${tech.color} mb-6`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{tech.title}</h3>
                <ul className="space-y-3">
                  {tech.items.map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <div className="h-5 w-5 rounded-full bg-ecosync-green-light/50 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-ecosync-green-dark"></div>
                      </div>
                      <span className="text-foreground/80 text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-br from-ecosync-green-dark/5 to-ecosync-blue-dark/5 p-8 border border-ecosync-green-dark/10"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2">Integrated Technology Ecosystem</h3>
            <p className="text-foreground/70">Our system seamlessly connects multiple technologies for maximum efficiency</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {technologyIcons.map(({ icon: Icon, delay, color }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.3, delay }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-full transform scale-110"></div>
                <div className="w-20 h-20 rounded-full bg-white dark:bg-ecosync-dark-blue shadow-lg flex items-center justify-center relative">
                  <Icon className={`w-8 h-8 ${color}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technology;
