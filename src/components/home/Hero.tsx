import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Cpu, Database, BarChart3, PieChart, Wind, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [demoData, setDemoData] = useState({
    airQuality: 78,
    temperature: 24.3,
    humidity: 58,
    energyUsage: 82,
    waterUsage: 64,
    score: 72,
  });
  const [activeDemoTab, setActiveDemoTab] = useState('dashboard');
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const elements = containerRef.current.querySelectorAll('.parallax-element');
      elements.forEach(el => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '1');
        (el as HTMLElement).style.transform = `translate(${x * 30 * speed}px, ${y * 30 * speed}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setDemoData(prev => ({
        airQuality: Math.max(0, Math.min(100, prev.airQuality + (Math.random() - 0.5) * 4)),
        temperature: Math.max(18, Math.min(30, prev.temperature + (Math.random() - 0.5) * 0.5)),
        humidity: Math.max(30, Math.min(70, prev.humidity + (Math.random() - 0.5) * 3)),
        energyUsage: Math.max(0, Math.min(100, prev.energyUsage + (Math.random() - 0.5) * 5)),
        waterUsage: Math.max(0, Math.min(100, prev.waterUsage + (Math.random() - 0.5) * 4)),
        score: Math.max(0, Math.min(100, prev.score + (Math.random() - 0.5) * 2)),
      }));
    }, 3000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
      style={{ background: 'radial-gradient(circle at 50% 50%, rgba(42, 157, 104, 0.05), transparent 60%)' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-ecosync-green-dark/5 rounded-full blur-3xl parallax-element" data-speed="0.5"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-ecosync-blue-dark/5 rounded-full blur-3xl parallax-element" data-speed="0.7"></div>
        <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-ecosync-green-medium/5 rounded-full blur-3xl parallax-element" data-speed="0.3"></div>
      </div>
      
      {/* Floating tech icons */}
      <motion.div
        className="absolute top-1/4 left-1/4 parallax-element" 
        data-speed="1.5"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <Leaf className="text-ecosync-green-dark/20 w-16 h-16" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 parallax-element" 
        data-speed="2"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
      >
        <Cpu className="text-ecosync-blue-dark/20 w-14 h-14" />
      </motion.div>
      
      <motion.div 
        className="absolute top-2/3 right-1/3 parallax-element" 
        data-speed="1.8"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
      >
        <Database className="text-ecosync-green-medium/20 w-12 h-12" />
      </motion.div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-ecosync-green-light text-ecosync-green-dark mb-6 tracking-wide">
              AI + IoT + Blockchain
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-balance"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-ecosync-green-dark via-ecosync-blue-dark to-ecosync-green-dark">
              The Future of Sustainability
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-foreground/80 mb-8 mx-auto max-w-3xl text-balance"
          >
            EcoSync integrates cutting-edge technology to create a self-sustaining, 
            fraud-proof ecosystem for environmental governance and sustainability.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/iot-dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-ecosync-green-dark to-ecosync-blue-dark text-white font-medium shadow-lg shadow-primary/20 transition-all duration-200 flex items-center justify-center"
              >
                Try Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-ecosync-green-dark/20 text-foreground font-medium transition-all duration-200"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 max-w-6xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-background/30 backdrop-blur-sm border border-ecosync-green-dark/10">
            <div className="w-full rounded-3xl overflow-hidden p-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-ecosync-green-dark">Interactive Demo</h3>
                <p className="text-sm text-muted-foreground">Experience the EcoSync dashboard with live data simulation</p>
              </div>
              
              {/* Demo Tabs */}
              <div className="flex justify-center mb-6">
                <div className="bg-background/50 rounded-full p-1 flex">
                  <button 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeDemoTab === 'dashboard' 
                        ? 'bg-ecosync-green-dark text-white shadow-md' 
                        : 'text-foreground hover:bg-ecosync-green-light/50'
                    }`}
                    onClick={() => setActiveDemoTab('dashboard')}
                  >
                    Dashboard
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeDemoTab === 'analytics' 
                        ? 'bg-ecosync-green-dark text-white shadow-md' 
                        : 'text-foreground hover:bg-ecosync-green-light/50'
                    }`}
                    onClick={() => setActiveDemoTab('analytics')}
                  >
                    Analytics
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeDemoTab === 'recommendations' 
                        ? 'bg-ecosync-green-dark text-white shadow-md' 
                        : 'text-foreground hover:bg-ecosync-green-light/50'
                    }`}
                    onClick={() => setActiveDemoTab('recommendations')}
                  >
                    Recommendations
                  </button>
                </div>
              </div>
              
              {/* Demo Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {activeDemoTab === 'dashboard' && (
                  <>
                    <Card className="bg-white/80 dark:bg-ecosync-dark/80 border-ecosync-green-light/20 backdrop-blur-sm overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">Air Quality</h3>
                            <p className="text-xs text-muted-foreground">Real-time monitoring</p>
                          </div>
                          <div className="p-2 bg-ecosync-green-light/50 rounded-full">
                            <Wind className="h-5 w-5 text-ecosync-green-dark" />
                          </div>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="text-3xl font-bold">{Math.round(demoData.airQuality)}</div>
                          <div className="text-xs text-muted-foreground">AQI</div>
                        </div>
                        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <motion.div 
                            className="bg-ecosync-green-dark h-2.5 rounded-full" 
                            initial={{ width: 0 }}
                            animate={{ width: `${demoData.airQuality}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/80 dark:bg-ecosync-dark/80 border-ecosync-green-light/20 backdrop-blur-sm overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">Climate</h3>
                            <p className="text-xs text-muted-foreground">Temperature & humidity</p>
                          </div>
                          <div className="p-2 bg-ecosync-blue-light/50 rounded-full">
                            <Droplets className="h-5 w-5 text-ecosync-blue-dark" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs text-muted-foreground">Temperature</div>
                            <div className="text-2xl font-bold">{demoData.temperature.toFixed(1)}°C</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">Humidity</div>
                            <div className="text-2xl font-bold">{Math.round(demoData.humidity)}%</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/80 dark:bg-ecosync-dark/80 border-ecosync-green-light/20 backdrop-blur-sm overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">Green Score</h3>
                            <p className="text-xs text-muted-foreground">AI-calculated rating</p>
                          </div>
                          <div className="p-2 bg-ecosync-green-light/50 rounded-full">
                            <BarChart3 className="h-5 w-5 text-ecosync-green-dark" />
                          </div>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className={`text-3xl font-bold ${
                            demoData.score > 70 ? 'text-green-600' : 
                            demoData.score > 50 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {Math.round(demoData.score)}
                          </div>
                          <div className="text-xs text-muted-foreground">out of 100</div>
                        </div>
                        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <motion.div 
                            className={`h-2.5 rounded-full ${
                              demoData.score > 70 ? 'bg-green-600' : 
                              demoData.score > 50 ? 'bg-yellow-600' : 'bg-red-600'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${demoData.score}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
                
                {activeDemoTab === 'analytics' && (
                  <>
                    <Card className="col-span-full md:col-span-2 bg-white/80 dark:bg-ecosync-dark/80 border-ecosync-green-light/20 backdrop-blur-sm overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">Resource Usage Trends</h3>
                            <p className="text-xs text-muted-foreground">Daily monitoring data</p>
                          </div>
                          <div className="p-2 bg-ecosync-blue-light/50 rounded-full">
                            <PieChart className="h-5 w-5 text-ecosync-blue-dark" />
                          </div>
                        </div>
                        <div className="h-[200px] flex items-end space-x-2">
                          {[...Array(7)].map((_, i) => {
                            const energyHeight = 30 + Math.random() * 70;
                            const waterHeight = 20 + Math.random() * 80;
                            return (
                              <div key={i} className="flex-1 flex flex-col items-center space-y-1">
                                <div className="w-full flex space-x-1 h-[160px] items-end">
                                  <motion.div 
                                    className="flex-1 bg-ecosync-green-dark rounded-sm"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${energyHeight}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                  />
                                  <motion.div 
                                    className="flex-1 bg-ecosync-blue-dark rounded-sm"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${waterHeight}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 + 0.2 }}
                                  />
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-center space-x-6 mt-4">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-sm bg-ecosync-green-dark mr-2" />
                            <span className="text-xs text-muted-foreground">Energy</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-sm bg-ecosync-blue-dark mr-2" />
                            <span className="text-xs text-muted-foreground">Water</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="col-span-full md:col-span-1 bg-white/80 dark:bg-ecosync-dark/80 border-ecosync-green-light/20 backdrop-blur-sm overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">Blockchain Status</h3>
                            <p className="text-xs text-muted-foreground">Verified transactions</p>
                          </div>
                          <div className="p-2 bg-ecosync-green-light/50 rounded-full">
                            <Database className="h-5 w-5 text-ecosync-green-dark" />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Last Transaction</span>
                            <span className="text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">
                              Confirmed
                            </span>
                          </div>
                          <div className="text-xs overflow-hidden text-ellipsis font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                            0x7f2c43668de0ab428832768eb3a7189ef7a8f198a42c32c7...
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Network</span>
                            <span className="text-xs font-medium">Polygon</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Sync Status</span>
                            <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full">
                              Synced
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
                
                {activeDemoTab === 'recommendations' && (
                  <Card className="col-span-full bg-white/80 dark:bg-ecosync-dark/80 border-ecosync-green-light/20 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-semibold">AI Recommendations</h3>
                          <p className="text-xs text-muted-foreground">Based on current environmental data</p>
                        </div>
                        <div className="p-2 bg-ecosync-green-light/50 rounded-full">
                          <Cpu className="h-5 w-5 text-ecosync-green-dark" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-start">
                            <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full mr-3">
                              <Leaf className="h-4 w-4 text-green-600 dark:text-green-300" />
                            </div>
                            <div>
                              <h4 className="font-medium text-green-800 dark:text-green-300">Energy Optimization</h4>
                              <p className="text-sm text-green-700 dark:text-green-400">
                                Implementing smart lighting controls could reduce energy consumption by up to 35%. Consider upgrading to IoT-controlled LED systems.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-start">
                            <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full mr-3">
                              <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-800 dark:text-blue-300">Water Conservation</h4>
                              <p className="text-sm text-blue-700 dark:text-blue-400">
                                Current water usage is 12% above optimal levels. Installing smart water meters and leak detection systems recommended.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <div className="flex items-start">
                            <div className="bg-yellow-100 dark:bg-yellow-800 p-2 rounded-full mr-3">
                              <Wind className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                            </div>
                            <div>
                              <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Air Quality Alert</h4>
                              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                                PM2.5 levels are approaching threshold limits. Consider enhancing ventilation systems and implementing air purification measures.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Potential Fine Assessment</h4>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-red-700 dark:text-red-400">Excess carbon emissions</span>
                          <span className="font-semibold text-red-800 dark:text-red-300">$1,200</span>
                        </div>
                        <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                          Regulatory review scheduled in 14 days
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="text-center">
                <Link to="/iot-dashboard">
                  <Button variant="outline" className="border-ecosync-green-dark/30 text-ecosync-green-dark hover:bg-ecosync-green-light/30">
                    Explore Full Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
