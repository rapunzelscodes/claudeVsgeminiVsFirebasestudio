"use client";

import { useState, useEffect, useRef } from 'react';

export function useAnimatedCounter(targetValue: number, duration: number = 300): number {
  const [currentValue, setCurrentValue] = useState(0);
  const valueRef = useRef(0); // To store the actual current value during animation, not the one that triggers re-render immediately

  useEffect(() => {
    // Set initial value without animation when component mounts or targetValue is 0
    if (valueRef.current === 0 && currentValue === 0) {
      setCurrentValue(targetValue);
      valueRef.current = targetValue;
      return;
    }

    let startTime: number | null = null;
    const startValue = valueRef.current;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      let nextDisplayValue;
      // For smoother animation with decimals, then format outside
      const rawNextValue = startValue + (targetValue - startValue) * progress;

      // Determine if we should use decimals based on target value
      if (targetValue % 1 !== 0 || startValue % 1 !== 0) {
        nextDisplayValue = parseFloat(rawNextValue.toFixed(2));
      } else {
        nextDisplayValue = Math.round(rawNextValue);
      }
      
      setCurrentValue(nextDisplayValue);
      valueRef.current = rawNextValue; // Keep track of potentially more precise value

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue); // Ensure it ends exactly on target
        valueRef.current = targetValue;
      }
    };

    const frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [targetValue, duration]);

  return currentValue;
}
