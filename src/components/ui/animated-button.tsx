
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Define animation properties separately
interface AnimationProps {
  whileHover?: any;
  whileTap?: any;
  transition?: any;
  initial?: any;
  animate?: any;
  exit?: any;
  variants?: any;
}

// Combine ButtonProps and animation props but avoid DOM event handler conflicts
interface AnimatedButtonProps extends ButtonProps, AnimationProps {}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    whileHover = { scale: 1.03 },
    whileTap = { scale: 0.97 },
    transition = {
      type: "spring",
      stiffness: 400,
      damping: 17
    },
    initial,
    animate,
    exit,
    variants,
    ...props 
  }, ref) => {
    const buttonClasses = cn(buttonVariants({ variant, size, className }));
    
    if (asChild) {
      // When asChild is true, use Slot without any motion properties
      return (
        <Slot
          className={buttonClasses}
          ref={ref as any}
          {...props}
        />
      );
    }
    
    // When asChild is false, use motion.button with animation properties
    // Use type assertion to avoid event handler conflicts
    const motionProps = {
      whileHover,
      whileTap,
      transition,
      initial,
      animate,
      exit,
      variants,
    };

    return (
      <motion.button
        className={buttonClasses}
        ref={ref}
        {...motionProps}
        {...props as any} // Type assertion to avoid event handler conflicts
      />
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton, buttonVariants };
