
import React, { useRef } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { useGsapReact } from '@/hooks/useGsapReact';
import { usePerformance } from '@/hooks/usePerformance';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { shouldAnimateFully } = usePerformance();
  
  // Use GSAP animations with proper cleanup via useGsapReact
  useGsapReact({
    animation: (gsap, element) => {
      if (!element || !shouldAnimateFully) return;
      
      // Create a timeline for the dashboard entry animation
      const tl = gsap.timeline();
      
      // Animate the header and main content
      tl.from(element.querySelector('header'), {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
      .from(element.querySelector('main'), {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      }, "-=0.3");
    },
    // Re-run the animation when the child route changes
    dependencies: [children],
  });

  return (
    <div className="flex h-screen bg-background" ref={mainRef}>
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
