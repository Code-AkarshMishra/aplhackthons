import React from 'react';
import { motion } from 'framer-motion';

const VoiceWaveform = ({ isActive }) => {
  const bars = Array.from({ length: 15 });

  if (!isActive) return null;

  return (
    <div className="flex items-center justify-center space-x-1.5 h-14 w-full py-2 bg-slate-50 border border-slate-200 rounded-lg px-4 overflow-hidden">
      <span className="text-xs text-blue-600 font-bold mr-3 animate-pulse">
        LISTENING...
      </span>
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-blue-600 rounded-full"
          initial={{ height: 4 }}
          animate={{
            height: [4, 10 + Math.random() * 24, 4]
          }}
          transition={{
            duration: 0.6 + Math.random() * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05
          }}
        />
      ))}
      <span className="text-xs text-slate-400 ml-3">
        Speak now
      </span>
    </div>
  );
};

export default VoiceWaveform;
