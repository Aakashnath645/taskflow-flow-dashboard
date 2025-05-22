
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, HTMLMotionProps } from "framer-motion";
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
}

// Combine ButtonProps and animation props but avoid DOM event handler conflicts
interface AnimatedButtonProps extends ButtonProps, AnimationProps {}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, variant, size, asChild = false, whileHover, whileTap, transition, ...props }, ref) => {
    if (asChild) {
      // Return Slot without motion properties when asChild is true
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }
    
    // Use motion.button with animation properties when asChild is false
    // We need to type cast props to avoid TypeScript errors with event handlers
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={whileHover || { scale: 1.03 }}
        whileTap={whileTap || { scale: 0.97 }}
        transition={transition || {
          type: "spring",
          stiffness: 400,
          damping: 17
        }}
        {...props as any} // Type assertion to avoid event handler conflicts
      />
    );
  }
);
AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton, buttonVariants };
