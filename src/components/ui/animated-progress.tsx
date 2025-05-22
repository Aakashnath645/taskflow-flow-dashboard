
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const AnimatedProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  const [isClient, setIsClient] = React.useState(false)
  
  React.useEffect(() => {
    setIsClient(true)
  }, [])
  
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <motion.div
        className="h-full w-full flex-1 bg-primary"
        style={{ 
          transformOrigin: "left",
          scaleX: 0,
        }}
        animate={isClient ? { scaleX: (value || 0) / 100 } : {}}
        transition={{ 
          type: "spring", 
          stiffness: 50, 
          damping: 15,
          delay: 0.2
        }}
      />
    </ProgressPrimitive.Root>
  )
})
AnimatedProgress.displayName = ProgressPrimitive.Root.displayName

export { AnimatedProgress }
