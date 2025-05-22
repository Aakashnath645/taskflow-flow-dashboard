
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCountAnimation } from '@/hooks/useGsapAnimation';
import { useInView } from 'framer-motion';

interface AnimatedStatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  delay?: number;
}

const AnimatedStatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
  delay = 0,
}: AnimatedStatCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const isNumber = !isNaN(Number(value));
  const countRef = useCountAnimation(isNumber ? Number(value) : 0, 1.5, isInView);

  return (
    <Card 
      ref={cardRef}
      className={cn(
        "overflow-hidden transform transition-all duration-500",
        isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
        className
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isNumber ? (
            <span ref={countRef}>0</span>
          ) : (
            value
          )}
        </div>
        {(description || trend) && (
          <div className="flex items-center mt-1">
            {trend && (
              <span className={cn(
                "text-xs font-medium mr-2",
                trend.isPositive ? "text-priority-low" : "text-priority-high"
              )}>
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnimatedStatCard;
