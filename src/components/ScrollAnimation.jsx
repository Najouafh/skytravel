import { motion } from 'framer-motion';

// Animation Configuration
const animationConfig = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1] // Smooth cubic-bezier
};

// Professional fade-in slide-up animation
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: animationConfig.duration,
      ease: animationConfig.ease
    }
  }
};

// Fade-in slide-up with more distance
export const fadeInUpLong = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: animationConfig.duration + 0.2,
      ease: animationConfig.ease
    }
  }
};

// Professional zoom-in animation
export const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: animationConfig.duration,
      ease: animationConfig.ease
    }
  }
};

// Professional zoom-out animation
export const zoomOut = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: animationConfig.duration,
      ease: animationConfig.ease
    }
  }
};

// Slide from left
export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: animationConfig.duration,
      ease: animationConfig.ease
    }
  }
};

// Slide from right
export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: animationConfig.duration,
      ease: animationConfig.ease
    }
  }
};

// Fade-in only (no movement)
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: animationConfig.duration,
      ease: animationConfig.ease
    }
  }
};

// Staggered container for lists/grids
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Fast stagger for cards
export const staggerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

// Individual item for stagger
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: animationConfig.ease
    }
  }
};

// Scroll Animation Wrapper Component
// Usage: <ScrollAnimation variant="fadeInUp" className="your-class">
// NOTE: once=false makes animations repeat every time user scrolls through the page
export const ScrollAnimation = ({ 
  children, 
  variant = 'fadeInUp', 
  className = '',
  delay = 0,
  amount = 0.2,
  once = false
}) => {
  const variants = {
    fadeInUp,
    fadeInUpLong,
    zoomIn,
    zoomOut,
    slideInLeft,
    slideInRight,
    fadeIn,
    staggerContainer,
    staggerFast,
    staggerItem
  };

  const selectedVariant = variants[variant] || fadeInUp;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: false, 
        amount: amount,
        margin: "-50px"
      }}
      variants={selectedVariant}
      style={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Alternative name for backward compatibility
export const scrollVariants = fadeInUp;

// Higher-Order Component for wrapping components
export const withScrollAnimation = (WrappedComponent, variant = 'fadeInUp') => {
  return function WithScrollAnimation(props) {
    return (
      <ScrollAnimation variant={variant}>
        <WrappedComponent {...props} />
      </ScrollAnimation>
    );
  };
};

export default ScrollAnimation;
