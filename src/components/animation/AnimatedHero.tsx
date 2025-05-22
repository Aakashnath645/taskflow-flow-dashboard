
import React, { useRef } from "react";
import { useGsapReact } from "@/hooks/useGsapReact";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AnimatedHeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  onCtaClick?: () => void;
}

const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  title,
  subtitle,
  ctaText,
  onCtaClick,
}) => {
  // Create a specific ref for the hero section
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Use our GSAP hook for animations
  useGsapReact({
    animation: (gsap, element) => {
      if (!element) return;

      const tl = gsap.timeline();
      
      // Staggered animation for the heading words
      tl.from(".hero-title .word", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
      
      // Subtitle animation
      tl.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");
      
      // CTA button animation
      tl.from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6");
      
      // Floating elements animation
      gsap.to(".floating-element", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-10, 10)",
        duration: "random(3, 5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        yoyoEase: "sine.inOut",
        stagger: 0.2,
      });
      
      // Scroll indicator animation
      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  });

  // Split the title into words for staggered animation
  const titleWords = title.split(' ');

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-1/4 left-1/4 w-16 h-16 bg-primary/10 rounded-full blur-lg"></div>
        <div className="floating-element absolute top-2/3 right-1/4 w-20 h-20 bg-secondary/10 rounded-full blur-lg"></div>
        <div className="floating-element absolute top-1/3 right-1/3 w-12 h-12 bg-accent/10 rounded-full blur-lg"></div>
      </div>
      
      {/* Hero content */}
      <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        {titleWords.map((word, i) => (
          <span key={i} className="word inline-block mx-1">{word}</span>
        ))}
      </h1>
      
      <p className="hero-subtitle text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
        {subtitle}
      </p>
      
      <div className="hero-cta">
        <AnimatedButton 
          onClick={onCtaClick} 
          size="lg" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="text-lg font-medium"
        >
          {ctaText}
        </AnimatedButton>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="scroll-indicator absolute bottom-8 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </motion.div>
    </div>
  );
};

export default AnimatedHero;
