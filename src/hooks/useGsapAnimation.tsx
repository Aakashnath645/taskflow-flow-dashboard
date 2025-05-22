
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Extending the Timeline type to add our custom property safely
declare module "gsap" {
  interface core {
    Timeline: TimelineType;
  }
  
  interface TimelineType {
    scrollTriggerInstance?: ScrollTrigger;
  }
}

interface UseGsapAnimationProps {
  trigger?: boolean;
  animation: (element: HTMLElement, timeline: gsap.core.Timeline) => void;
  scrollTrigger?: boolean;
  scrollTriggerOptions?: {
    trigger?: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    toggleActions?: string;
  };
  dependencies?: any[];
}

/**
 * @deprecated Use useGsapReact instead for better React integration and automatic cleanup
 */
export const useGsapAnimation = ({
  trigger = true,
  animation,
  scrollTrigger = false,
  scrollTriggerOptions,
  dependencies = [],
}: UseGsapAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    const timeline = gsap.timeline({ paused: !trigger });
    
    timelineRef.current = timeline;
    
    if (scrollTrigger && scrollTriggerOptions) {
      // Create ScrollTrigger instance and store the reference
      const st = ScrollTrigger.create({
        trigger: scrollTriggerOptions.trigger || element,
        start: scrollTriggerOptions.start || "top bottom",
        end: scrollTriggerOptions.end || "bottom top",
        scrub: scrollTriggerOptions.scrub || false,
        markers: scrollTriggerOptions.markers || false,
        toggleActions: scrollTriggerOptions.toggleActions || "play none none none",
        animation: timeline,
      });
      
      scrollTriggerRef.current = st;
      
      // Store reference to the scrollTrigger instance using our custom property
      timeline.scrollTriggerInstance = st;
    }
    
    animation(element, timeline);

    return () => {
      // Clean up GSAP animations and ScrollTrigger instances
      timeline.kill();
      timelineRef.current = null;
      
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, scrollTrigger, ...dependencies]);

  return { elementRef, timeline: timelineRef.current };
};

export const useCountAnimation = (
  endValue: number,
  duration: number = 2,
  trigger: boolean = true
) => {
  const countRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!countRef.current || !trigger) return;
    
    const element = countRef.current;
    let startValue = 0;
    
    const tween = gsap.to({}, {
      duration,
      onUpdate: function() {
        const progress = gsap.getProperty(this, "progress") as number;
        element.innerHTML = Math.floor(startValue + (endValue - startValue) * progress).toString();
      }
    });
    
    return () => {
      tween.kill();
    };
  }, [endValue, duration, trigger]);
  
  return countRef;
};
