
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? 'glass-morphism' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <Link to="/" className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-ecosync-green-dark to-ecosync-blue-dark">
                EcoSync
              </Link>
            </motion.div>
            <nav className="hidden md:block ml-10">
              <ul className="flex space-x-8">
                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200">
                    Home
                  </Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="/#features" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200">
                    Features
                  </a>
                </motion.li>
                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="/#technology" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200">
                    Technology
                  </a>
                </motion.li>
                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href="/#about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200">
                    About
                  </a>
                </motion.li>
                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/iot-dashboard" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200">
                    IoT Dashboard
                  </Link>
                </motion.li>
              </ul>
            </nav>
          </div>
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-ecosync-green-dark to-ecosync-blue-dark text-white text-sm font-medium transition-all duration-200 hover:shadow-lg"
            >
              Get Started
            </motion.button>
          </div>
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden glass-morphism"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="/#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="/#technology"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Technology
            </a>
            <a
              href="/#about"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <Link
              to="/iot-dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              IoT Dashboard
            </Link>
            <div className="pt-2 pb-1">
              <button
                className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-ecosync-green-dark to-ecosync-blue-dark text-white text-sm font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
