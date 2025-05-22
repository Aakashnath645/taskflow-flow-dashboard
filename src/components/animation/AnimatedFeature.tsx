
import React, { useRef } from "react";
import { useGsapReact } from "@/hooks/useGsapReact";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AnimatedFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const AnimatedFeature = ({ icon, title, description, index }: AnimatedFeatureProps) => {
  // Create a specific ref for this component
  const featureRef = useRef<HTMLDivElement>(null);
  
  // Use our GSAP hook for animations with the specific ref
  useGsapReact({
    animation: (gsap, element) => {
      if (!element) return;
      
      gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100",
          end: "bottom top",
          toggleActions: "play none none none",
        }
      });
    }
  });

  return (
    <Card 
      ref={featureRef}
      className="h-full border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md"
    >
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default AnimatedFeature;
