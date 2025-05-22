
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChartBar, ListCheck, FolderOpen, Users } from "lucide-react";
import AnimatedHero from "@/components/animation/AnimatedHero";
import AnimatedFeature from "@/components/animation/AnimatedFeature";
import { AnimatedButton } from "@/components/ui/animated-button";

const features = [
  {
    icon: <FolderOpen className="h-5 w-5" />,
    title: "Project Management",
    description: "Organize your work with intuitive project management tools designed for teams."
  },
  {
    icon: <ListCheck className="h-5 w-5" />,
    title: "Task Tracking",
    description: "Never lose track of your tasks with our comprehensive tracking system."
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Team Collaboration",
    description: "Work together seamlessly with real-time collaboration features."
  },
  {
    icon: <ChartBar className="h-5 w-5" />,
    title: "Analytics",
    description: "Make data-driven decisions with comprehensive analytics and reports."
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="font-bold text-xl">TaskFlow</div>
        <div className="flex gap-4">
          <AnimatedButton 
            variant="ghost" 
            onClick={() => navigate("/login")}
          >
            Login
          </AnimatedButton>
          <AnimatedButton 
            variant="default"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </AnimatedButton>
        </div>
      </header>

      <main>
        <AnimatedHero 
          title="Streamline Your Workflow with TaskFlow"
          subtitle="The all-in-one project management tool designed to help teams collaborate efficiently and deliver projects on time."
          ctaText="Get Started"
          ctaLink="/signup"
          onCtaClick={handleGetStarted}
        />
        
        <section className="container mx-auto py-24">
          <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AnimatedFeature 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
