
import { useEffect, useState } from "react";

/**
 * Hook to detect device performance capabilities to conditionally enable animations
 * Returns an object with:
 * - isLowPerformance: boolean indicating if the device has limited resources
 * - prefersReducedMotion: boolean indicating if user has requested reduced motion
 * - shouldAnimateFully: boolean indicating if full animations should be used
 */
export const usePerformance = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes to the media query
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    // Simple performance detection based on memory and processor count
    // This is a basic heuristic and could be enhanced further
    if (navigator.hardwareConcurrency && navigator.deviceMemory) {
      const lowPower = navigator.hardwareConcurrency < 4 || 
                      (navigator as any).deviceMemory < 4;
      setIsLowPerformance(lowPower);
    } else if (navigator.userAgent.includes("Mobile")) {
      // Assume mobile devices might have performance constraints
      setIsLowPerformance(true);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return {
    isLowPerformance,
    prefersReducedMotion,
    // Enable full animations only if both conditions are false
    shouldAnimateFully: !isLowPerformance && !prefersReducedMotion,
  };
};
