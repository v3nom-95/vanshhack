
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const Contact = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:pr-6"
            >
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-ecosync-green-light text-ecosync-green-dark mb-4">
                Contact Us
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Let's Build a Sustainable Future Together
              </h2>
              
              <p className="text-foreground/70 mb-8">
                Interested in implementing EcoSync in your city, business, home, or farm? 
                Our team of experts is ready to help you develop a tailored sustainability solution.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    description: "contact@ecosync.tech",
                    color: "text-ecosync-green-dark"
                  },
                  {
                    icon: MessageSquare,
                    title: "Live Chat",
                    description: "Available Monday-Friday, 9am-5pm EST",
                    color: "text-ecosync-blue-dark"
                  }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <div className="mt-1 mr-4">
                        <Icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                        <p className="text-foreground/70">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <GlassCard className="h-full" hoverEffect={false}>
                <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded-lg border border-ecosync-gray-dark/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-ecosync-green-dark/50 transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-lg border border-ecosync-gray-dark/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-ecosync-green-dark/50 transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-ecosync-gray-dark/30 bg-transparent focus:outline-none focus:ring-2 focus:ring-ecosync-green-dark/50 transition-all duration-200"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-ecosync-green-dark to-ecosync-blue-dark text-white font-medium flex items-center justify-center"
                    >
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </motion.button>
                  </div>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
