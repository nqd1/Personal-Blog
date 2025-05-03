'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const slideInFromLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

export const slideInFromRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

export const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// Main Motion Provider Component
interface MotionProps {
  children: ReactNode;
  variant?: 'fadeIn' | 'fadeInUp' | 'slideInFromLeft' | 'slideInFromRight' | 'scaleUp' | 'stagger';
  className?: string;
  delay?: number;
  duration?: number;
  viewport?: boolean;
  once?: boolean;
  amount?: number;
}

export const MotionDiv = ({
  children,
  variant = 'fadeIn',
  className = '',
  delay = 0,
  duration = 0.5,
  viewport = true,
  once = true,
  amount = 0.3
}: MotionProps) => {
  const getVariant = () => {
    switch (variant) {
      case 'fadeInUp':
        return fadeInUp;
      case 'slideInFromLeft':
        return slideInFromLeft;
      case 'slideInFromRight':
        return slideInFromRight;
      case 'scaleUp':
        return scaleUp;
      case 'stagger':
        return staggerContainer;
      default:
        return fadeIn;
    }
  };

  const viewportOptions = viewport ? {
    once,
    amount
  } : {};

  const transition = {
    delay,
    duration
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      variants={getVariant()}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const MotionContainer = ({ children }: { children: ReactNode }) => (
  <AnimatePresence mode="wait">
    {children}
  </AnimatePresence>
);
