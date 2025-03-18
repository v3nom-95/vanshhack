
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-ecosync-dark text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-1"
          >
            <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-ecosync-green-medium to-ecosync-blue-medium">
              EcoSync
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              AI + IoT + Blockchain-Powered Sustainability System for a greener future.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {[
            {
              title: 'Solutions',
              links: ['Smart Cities', 'Smart Industries', 'Smart Homes', 'Smart Agriculture', 'Disaster Prevention']
            },
            {
              title: 'Company',
              links: ['About Us', 'Careers', 'Press', 'News', 'Contact']
            },
            {
              title: 'Resources',
              links: ['Blog', 'Whitepaper', 'Documentation', 'API', 'Partners']
            }
          ].map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-center text-gray-400">
            © {new Date().getFullYear()} EcoSync. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
