import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface MotionDivProps extends PropsWithChildren<{
  className?: string;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
}> {}

export const MotionDiv = motion.div as React.ComponentType<MotionDivProps>;