import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-dark z-[100] flex items-center justify-center">
      <div className="relative">
        <motion.div
          animate={{
            rotate: 360,
            borderRadius: ["25%", "25%", "50%", "50%", "25%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-16 h-16 border-4 border-secondary border-t-transparent"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="mt-4 text-secondary font-outfit tracking-widest text-sm"
        >
          LOADING
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
