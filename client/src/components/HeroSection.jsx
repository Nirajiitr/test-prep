import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="text-center py-16">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-[#3B82F6]"
      >
        Welcome to Our JEE/NEET Platform
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-4 text-lg text-[#EDEDED]"
      >
        Explore features like realistic tests, analytics, and more!
      </motion.p>
    </section>
  );
};

export default HeroSection;