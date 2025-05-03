'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ErrorBoundary from '@/components/ui/error-boundary';

type ElementProps = {
  className?: string;
  darkMode?: boolean;
}

const AnimatedCircle: React.FC<ElementProps> = ({ className, darkMode }) => {
  return (
    <motion.div 
      className={`absolute rounded-full ${className}`}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.7, 0.9, 0.7],
      }}
      transition={{
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />
  );
};

const AnimatedBlob: React.FC<ElementProps> = ({ className, darkMode }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        background: darkMode 
          ? 'linear-gradient(45deg, rgba(75, 85, 227, 0.2), rgba(236, 72, 153, 0.15))'
          : 'linear-gradient(45deg, rgba(79, 70, 229, 0.15), rgba(219, 39, 119, 0.1))',
      }}
      animate={{
        borderRadius: [
          '60% 40% 30% 70% / 60% 30% 70% 40%',
          '30% 60% 70% 40% / 50% 60% 30% 60%',
          '60% 40% 30% 70% / 60% 30% 70% 40%'
        ],
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />
  );
};

const FloatingShape: React.FC<ElementProps & { shape: 'cube' | 'pyramid' | 'circle' | 'ring' }> = ({ 
  className, 
  shape,
  darkMode 
}) => {
  const getShapeClass = () => {
    switch (shape) {
      case 'cube':
        return 'rounded-lg';
      case 'pyramid':
        return 'clip-path-triangle';
      case 'circle':
        return 'rounded-full';
      case 'ring':
        return 'rounded-full border-4 border-primary bg-transparent';
      default:
        return 'rounded-lg';
    }
  };

  return (
    <motion.div 
      className={`absolute ${getShapeClass()} ${className}`}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: Math.random() * 5 + 3,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />
  );
};

const FloatingElement: React.FC<ElementProps & { 
  type: 'graduation-cap' | 'book' | 'lightbulb' | 'star',
  tabIndex?: number,
  'aria-label'?: string
}> = ({ className, type, darkMode, tabIndex, ...rest }) => {
  const color = darkMode ? 'text-white/20' : 'text-primary/20';
  
  // Map type to icon SVG path
  const getIcon = () => {
    switch (type) {
      case 'graduation-cap':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3Z" />
          </svg>
        );
      case 'book':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22ZM6 4H11V12L8.5 10.5L6 12V4Z" />
          </svg>
        );
      case 'lightbulb':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2ZM9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21Z" />
          </svg>
        );
      case 'star':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <motion.div 
      className={`absolute ${color} ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: Math.random() * 5 + 5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }}
      tabIndex={tabIndex}
      {...rest}
    >
      {getIcon()}
    </motion.div>
  );
};

const MouseTracker: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate position relative to window center (as percentage)
      const x = (clientX - innerWidth / 2) / innerWidth;
      const y = (clientY - innerHeight / 2) / innerHeight;
      
      // Apply parallax effect (move in the opposite direction of the mouse)
      ref.current.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={ref}
      className="absolute inset-0 pointer-events-none transition-transform duration-200 ease-out"
      style={{ willChange: 'transform' }}
    >
      <div className="absolute top-1/4 right-1/3 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
    </div>
  );
};

const AnimatedGrid: React.FC<ElementProps> = ({ darkMode }) => {
  return (
    <motion.div 
      className="absolute inset-0 z-0 opacity-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: darkMode ? 0.05 : 0.1 }}
      transition={{ duration: 1 }}
    >
      <div className={`absolute inset-0 ${darkMode ? 'bg-grid-white' : 'bg-grid-gray-900'}`} />
    </motion.div>
  );
};

export const HeroAnimatedElements: React.FC<{darkMode?: boolean}> = ({ darkMode = false }) => {
  return (
    <ErrorBoundary>
      <section aria-label="Animated Hero Background" role="presentation">
        {/* Mouse parallax effect */}
        <MouseTracker />
        
        {/* Background grid */}
        <AnimatedGrid darkMode={darkMode} />
        
        {/* Animated shapes */}
        <AnimatedBlob 
          className="top-10 left-[5%] w-64 h-64 opacity-30 -z-10"
          darkMode={darkMode} 
        />
        <AnimatedBlob 
          className="bottom-20 right-[10%] w-72 h-72 opacity-20 -z-10" 
          darkMode={darkMode}
        />
        
        {/* Animated circles */}
        <AnimatedCircle 
          className="top-[20%] left-[15%] w-20 h-20 bg-primary/10" 
          darkMode={darkMode}
        />
        <AnimatedCircle 
          className="bottom-[25%] right-[30%] w-16 h-16 bg-accent/10" 
          darkMode={darkMode}
        />
        
        {/* Floating shapes */}
        <FloatingShape 
          shape="cube" 
          className="top-[30%] left-[75%] w-12 h-12 bg-primary/10"
          darkMode={darkMode}
        />
        <FloatingShape 
          shape="circle" 
          className="bottom-[40%] left-[20%] w-8 h-8 bg-accent/20"
          darkMode={darkMode}
        />
        <FloatingShape 
          shape="ring" 
          className="top-[15%] left-[60%] w-16 h-16"
          darkMode={darkMode}
        />
        
        {/* Floating icons with keyboard navigation and aria-labels */}
        <FloatingElement 
          type="graduation-cap" 
          className="top-1/4 left-1/5 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-primary"
          darkMode={darkMode}
          tabIndex={0}
          aria-label="Graduation Cap Icon"
        />
        <FloatingElement 
          type="book" 
          className="bottom-1/3 right-1/5 w-12 h-12 focus:outline-none focus:ring-2 focus:ring-primary"
          darkMode={darkMode}
          tabIndex={0}
          aria-label="Book Icon"
        />
        <FloatingElement 
          type="lightbulb" 
          className="top-2/3 left-1/3 w-10 h-10 focus:outline-none focus:ring-2 focus:ring-primary"
          darkMode={darkMode}
          tabIndex={0}
          aria-label="Lightbulb Icon"
        />
        <FloatingElement 
          type="star" 
          className="top-1/3 right-1/4 w-8 h-8 focus:outline-none focus:ring-2 focus:ring-primary"
          darkMode={darkMode}
          tabIndex={0}
          aria-label="Star Icon"
        />
      </section>
    </ErrorBoundary>
  );
};
