'use client';

import { useEffect, useState } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('sm');
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);

      let newBreakpoint: Breakpoint = 'sm';
      if (newWidth >= breakpoints['2xl']) {
        newBreakpoint = '2xl';
      } else if (newWidth >= breakpoints.xl) {
        newBreakpoint = 'xl';
      } else if (newWidth >= breakpoints.lg) {
        newBreakpoint = 'lg';
      } else if (newWidth >= breakpoints.md) {
        newBreakpoint = 'md';
      }

      setCurrentBreakpoint(newBreakpoint);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isAbove = (breakpoint: Breakpoint): boolean => {
    return width >= breakpoints[breakpoint];
  };

  const isBelow = (breakpoint: Breakpoint): boolean => {
    return width < breakpoints[breakpoint];
  };

  const isBetween = (min: Breakpoint, max: Breakpoint): boolean => {
    return width >= breakpoints[min] && width < breakpoints[max];
  };

  const is = (breakpoint: Breakpoint): boolean => {
    return currentBreakpoint === breakpoint;
  };

  return {
    currentBreakpoint,
    width,
    isAbove,
    isBelow,
    isBetween,
    is,
    breakpoints,
  };
}
