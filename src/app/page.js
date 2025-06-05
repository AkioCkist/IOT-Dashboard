"use client";
import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated, useTrail, useChain, useSpringRef } from '@react-spring/web';

export default function LoginHomepage() {
  const [showPassword, setShowPassword] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [particles, setParticles] = useState([]);
  const router = useRouter();

  // Generate floating particles
  React.useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
    }));
    setParticles(newParticles);
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    // Create success particle explosion
    setTimeout(() => {
      setIsLoading(false);
      setIsExiting(true);
      console.log('Login attempt:', { accountName, password });
      
      setTimeout(() => {
        router.push('/dashboard_admin');
      }, 1200);
    }, 1500);
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.19, 1, 0.22, 1],
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -100,
      rotateX: 15,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 40px rgba(59, 130, 246, 0.6)",
        "0 0 20px rgba(59, 130, 246, 0.3)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const inputFocusVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.2)",
      borderColor: "#3b82f6",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
      y: -2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      y: 0,
      transition: {
        duration: 0.1
      }
    }
  };

  const successVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: [0, 1.2, 1],
      rotate: [0, 360, 720],
      transition: {
        duration: 1.5,
        ease: "easeOut",
        times: [0, 0.6, 1]
      }
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-blue-400 rounded-full opacity-20"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.x,
              top: particle.y,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isExiting ? (
          <motion.div
            key="login-page"
            className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30"
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
                scale: [1.2, 1, 1.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            <motion.div 
              className="w-full max-w-md relative z-10"
              variants={floatingVariants}
              animate="animate"
            >
              {/* Enhanced Logo Section */}
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl mb-6 shadow-2xl relative overflow-hidden"
                  variants={glowVariants}
                  animate="animate"
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.8, ease: "easeInOut" }
                  }}
                >
                  <motion.div
                    className="w-10 h-10 bg-white rounded-xl opacity-90 relative"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl opacity-20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                  
                  {/* Sparkle effects */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        top: `${20 + i * 20}%`,
                        left: `${20 + i * 20}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </motion.div>

                <motion.h1
                  className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Welcome Back
                </motion.h1>
                <motion.p
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Sign in to continue your journey
                </motion.p>
              </motion.div>

              {/* Enhanced Login Form */}
              <motion.div
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                whileHover={{
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Form background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl"
                  animate={{
                    background: [
                      "linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))",
                      "linear-gradient(to bottom right, rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05))",
                      "linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))"
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="space-y-6 relative z-10">
                  {/* Enhanced Account Name Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Account Name
                    </label>
                    <motion.div className="relative group">
                      <motion.div
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        animate={{
                          x: accountName ? [0, 5, 0] : 0,
                          color: accountName ? "#3b82f6" : "#9ca3af",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <User className="w-5 h-5" />
                      </motion.div>
                      <motion.input
                        type="text"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-0 focus:outline-none transition-all duration-300 bg-gray-50/50 focus:bg-white text-black font-medium"
                        placeholder="Enter your account name"
                        variants={inputFocusVariants}
                        whileFocus="focus"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Password Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Password
                    </label>
                    <motion.div className="relative group">
                      <motion.div
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        animate={{
                          x: password ? [0, 5, 0] : 0,
                          color: password ? "#3b82f6" : "#9ca3af",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Lock className="w-5 h-5" />
                      </motion.div>
                      <motion.input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-0 focus:outline-none transition-all duration-300 bg-gray-50/50 focus:bg-white text-black font-medium"
                        placeholder="Enter your password"
                        variants={inputFocusVariants}
                        whileFocus="focus"
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        whileTap={{ scale: 0.9, rotate: -15 }}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Options Row */}
                  <motion.div
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  >
                    <motion.label
                      className="flex items-center cursor-pointer group"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 transition-all duration-200"
                      />
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                        Remember me
                      </span>
                    </motion.label>
                    <motion.button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-500 font-semibold transition-colors relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="relative z-10"
                        initial={{ y: 0 }}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        Forgot password?
                      </motion.span>
                    </motion.button>
                  </motion.div>

                  {/* Enhanced Submit Button */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg relative overflow-hidden group"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                  >
                    {/* Button background animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />

                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          className="flex items-center justify-center relative z-10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                          <motion.span
                            animate={{
                              opacity: [1, 0.7, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            Signing in...
                          </motion.span>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="signin"
                          className="relative z-10 flex items-center justify-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          Sign In
                          <motion.div
                            className="ml-2"
                            animate={{
                              x: [0, 3, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            ✨
                          </motion.div>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>

              {/* Enhanced Footer */}
              <motion.div
                className="mt-8 text-center text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                <p>
                  By signing in, you agree to our{' '}
                  <motion.button
                    className="text-blue-600 hover:text-blue-500 font-medium"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Terms of Service
                  </motion.button>{' '}
                  and{' '}
                  <motion.button
                    className="text-blue-600 hover:text-blue-500 font-medium"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Privacy Policy
                  </motion.button>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="exit-screen"
            className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Success particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${50 + (Math.random() - 0.5) * 100}%`,
                  top: `${50 + (Math.random() - 0.5) * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [-100, 100],
                  x: [(Math.random() - 0.5) * 200],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}

            <motion.div
              className="text-center text-white relative z-10"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-6 relative"
                variants={successVariants}
                initial="initial"
                animate="animate"
              >
                <div className="w-full h-full border-4 border-white border-t-transparent rounded-full relative">
                  <motion.div
                    className="absolute inset-2 bg-white rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1, duration: 0.5, type: "spring" }}
                    >
                      ✓
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.h2
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Welcome Back!
              </motion.h2>
              <motion.p
                className="text-blue-100 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Redirecting to your dashboard...
              </motion.p>
              
              <motion.div
                className="mt-4 flex justify-center space-x-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}