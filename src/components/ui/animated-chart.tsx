
import * as React from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell
} from "recharts";
import { useGsapAnimation } from "@/hooks/useGsapAnimation";
import { gsap } from "gsap";
import { useInView } from "framer-motion";
import { ChartConfig } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface AnimatedChartProps {
  data: any[];
  type: "bar" | "line" | "pie" | "area";
  className?: string;
  height?: number;
  config?: ChartConfig;
}

export const AnimatedChart: React.FC<AnimatedChartProps> = ({
  data,
  type,
  className,
  height = 300,
  config
}) => {
  const chartRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, amount: 0.3 });
  
  const { elementRef } = useGsapAnimation({
    trigger: isInView,
    animation: (element, timeline) => {
      if (type === "bar") {
        const bars = element.querySelectorAll(".recharts-bar-rectangle");
        timeline.from(bars, {
          scaleY: 0,
          transformOrigin: "bottom",
          stagger: 0.05,
          duration: 0.8,
          ease: "power2.out"
        });
      } else if (type === "line") {
        const paths = element.querySelectorAll(".recharts-line-curve");
        const dots = element.querySelectorAll(".recharts-line-dot");
        
        timeline
          .from(paths, {
            strokeDashoffset: 1000, 
            strokeDasharray: 1000, 
            duration: 1.5, 
            ease: "power2.out"
          })
          .from(dots, {
            scale: 0,
            opacity: 0,
            stagger: 0.03,
            duration: 0.4
          }, "-=0.5");
      } else if (type === "pie") {
        const paths = element.querySelectorAll(".recharts-sector");
        
        timeline.from(paths, {
          scale: 0,
          opacity: 0,
          transformOrigin: "center",
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      }
    }
  });

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#9b87f5" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#9b87f5" 
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: "#9b87f5", strokeWidth: 2 }}
            />
          </LineChart>
        );
      case "pie":
        const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA'];
        return (
          <PieChart>
            <Tooltip />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#9b87f5"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={chartRef} 
      className={cn("w-full", className)}
    >
      <div ref={elementRef} className="w-full h-full">
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnimatedChart;
