// src/components/GlobalLoader.js
import React from 'react';
import { motion } from 'framer-motion';

const GlobalLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#E2E6D5] overflow-hidden"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Spinner */}
        <div className="relative w-20 h-20 flex items-center justify-center mb-8">
          <div className="absolute inset-0 border-4 border-[#3D4C38]/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#3D4C38] rounded-full border-t-transparent animate-spin"></div>
        </div>

        {/* Brand Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-['Oswald'] font-bold text-[#1F261C] uppercase tracking-widest mb-2">
            The <span className="text-[#3D4C38] italic">Green</span> Book
          </h1>
          <motion.p 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-[#5A6654] text-xs font-bold uppercase tracking-[0.3em]"
          >
            Loading Experience...
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GlobalLoader;