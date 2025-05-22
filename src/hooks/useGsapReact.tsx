
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface UseGsapAnimationProps {
  scope?: React.RefObject<HTMLElement>;
  dependencies?: any[];
  revertOnUpdate?: boolean;
  animation: (gsapInstance: typeof gsap, scopeElement: HTMLElement | null) => void;
}

/**
 * A hook that uses GSAP's official React integration for proper cleanup
 * and lifecycle management of GSAP animations.
 */
export const useGsapReact = ({
  scope,
  dependencies = [],
  revertOnUpdate = true,
  animation,
}: UseGsapAnimationProps) => {
  // Use HTMLDivElement specifically for compatibility with div-based components
  const internalScopeRef = useRef<HTMLDivElement>(null);
  
  // Use the provided scope or the internal one
  const containerRef = scope || internalScopeRef;

  useGSAP(() => {
    const element = containerRef.current;
    animation(gsap, element);
    
    return () => {
      // GSAP will automatically clean up ScrollTriggers when context is cleared
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, { scope: containerRef, dependencies, revertOnUpdate });

  return { scopeRef: containerRef };
};
