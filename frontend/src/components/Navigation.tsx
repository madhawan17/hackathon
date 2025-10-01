import React,{ useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Animation variants for reusable animations
const logoVariants: Variants = {
  initial: { 
    rotate: -180, 
    opacity: 0,
    scale: 0.5
  },
  animate: { 
    rotate: 0, 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
  hover: {
    rotate: 360,
    scale: 1.2,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const textVariants: Variants = {
  initial: { 
    x: -20, 
    opacity: 0,
    scale: 0.8
  },
  animate: { 
    x: 0, 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  }
};

const navItemVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: -10,
    scale: 0.9
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3
    }
  },
  hover: {
    scale: 1.1,
    y: -2,
    transition: {
      duration: 0.2
    }
  }
};

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/inspiration', label: 'Daily Inspiration' },
    { path: '/journal', label: 'Journal' },
    { path: '/diary', label: 'Personal Diary' },
    { path: '/mood-quiz', label: 'Mood Quiz' },
    { path: '/timer', label: 'Timer' },
    { path: '/chat', label: 'Chat' },
    { path: '/yoga-meditation', label: 'Yoga & Meditation' },
    { path: '/therapists', label: 'Therapists' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/inspiration" className="flex items-center space-x-2">
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <Leaf className="h-8 w-8 text-green-600" />
            </motion.div>
            <motion.span
              variants={textVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="text-xl font-bold text-green-900"
            >
              Mind
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.6, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.2,
                  color: "#059669",
                  transition: { duration: 0.2 }
                }}
                className="text-green-600"
              >
                Space
              </motion.span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="hidden md:flex items-center space-x-6"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-green-700 bg-green-50'
                      : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* User Menu */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="hidden md:flex items-center space-x-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <motion.div
                whileHover={{ 
                  rotate: 360,
                  scale: 1.2,
                  boxShadow: "0 0 8px rgba(5, 150, 105, 0.5)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
              >
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  className="text-green-700 font-medium text-sm"
                >
                  {currentUser?.username.charAt(0).toUpperCase()}
                </motion.span>
              </motion.div>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-sm text-gray-700"
              >
                {currentUser?.username}
              </motion.span>
            </motion.div>
            <motion.button
              whileHover={{ 
                scale: 1.2, 
                rotate: 180,
                backgroundColor: "#FEE2E2"
              }}
              whileTap={{ scale: 0.9 }}
              onClick={logout}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors duration-200 rounded-full"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </motion.button>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="md:hidden"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-green-50"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: "auto",
                transition: {
                  height: {
                    duration: 0.3
                  },
                  opacity: {
                    duration: 0.2,
                    delay: 0.1
                  }
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                transition: {
                  height: {
                    duration: 0.3
                  },
                  opacity: {
                    duration: 0.2
                  }
                }
              }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-2 pb-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive(item.path)
                          ? 'text-green-700 bg-green-50'
                          : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="border-t border-gray-200 pt-2 mt-2"
                >
                  <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.2,
                          boxShadow: "0 0 8px rgba(5, 150, 105, 0.5)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
                      >
                        <motion.span
                          whileHover={{ scale: 1.2 }}
                          className="text-green-700 font-medium text-sm"
                        >
                          {currentUser?.username.charAt(0).toUpperCase()}
                        </motion.span>
                      </motion.div>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="text-sm text-gray-700"
                      >
                        {currentUser?.username}
                      </motion.span>
                    </div>
                    <motion.button
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 180,
                        backgroundColor: "#FEE2E2"
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={logout}
                      className="p-2 text-gray-500 hover:text-red-600 transition-colors duration-200 rounded-full"
                      title="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}