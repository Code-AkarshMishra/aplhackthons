import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  hoverEffect = true, 
  onClick,
  delay = 0,
  animate = true
}) => {
  // Use professional solid cards instead of glassmorphism
  const cardClasses = `admin-card ${className}`;

  if (!animate) {
    return (
      <div className={cardClasses} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={hoverEffect && !onClick ? { y: -2, transition: { duration: 0.15 } } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      onClick={onClick}
      className={`${cardClasses} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
