
import React, { useRef } from 'react';
import { useGsapReact } from '@/hooks/useGsapReact';
import { usePerformance } from '@/hooks/usePerformance';
import { Form } from '@/components/ui/form';
import { AnimatedButton } from '@/components/ui/animated-button';
import { motion } from 'framer-motion';

interface AnimatedFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  submitText?: string;
  className?: string;
}

const AnimatedForm = ({
  children,
  onSubmit,
  isSubmitting = false,
  submitText = "Submit",
  className = "",
}: AnimatedFormProps) => {
  const formRef = useRef<HTMLDivElement>(null);
  const { shouldAnimateFully } = usePerformance();

  useGsapReact({
    animation: (gsap, element) => {
      if (!element || !shouldAnimateFully) return;
      
      // Animate form fields appearance with staggered effect
      gsap.from(element.querySelectorAll('.form-field'), {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    },
  });

  // Define animations for success/error messages
  const messageVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div ref={formRef} className={`space-y-6 ${className}`}>
      <Form onSubmit={onSubmit} className="space-y-4">
        {/* Render form children with added form-field class */}
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              className: `form-field ${child.props.className || ''}`,
            });
          }
          return child;
        })}

        <div className="pt-4">
          <AnimatedButton 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
            whileHover={shouldAnimateFully ? { scale: 1.02 } : undefined}
            whileTap={shouldAnimateFully ? { scale: 0.98 } : undefined}
          >
            {isSubmitting ? (
              <motion.div
                className="h-5 w-5 rounded-full border-2 border-t-transparent animate-spin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            ) : null}
            {submitText}
          </AnimatedButton>
        </div>
      </Form>
    </div>
  );
};

export default AnimatedForm;
