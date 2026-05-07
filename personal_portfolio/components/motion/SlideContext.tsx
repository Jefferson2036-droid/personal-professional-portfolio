'use client';

import { createContext, useContext } from 'react';
import { MotionValue } from 'framer-motion';

interface SlideContextType {
  scrollYProgress: MotionValue<number> | null;
}

export const SlideContext = createContext<SlideContextType>({ scrollYProgress: null });

export function useSlideContext() {
  return useContext(SlideContext);
}
