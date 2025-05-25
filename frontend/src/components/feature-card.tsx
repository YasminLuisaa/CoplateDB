import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "card-hover overflow-hidden transition-all duration-300 relative animate-fade-in",
        isHovered ? "shadow-md -translate-y-1" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300",
          isHovered ? "opacity-100" : ""
        )}
      />
      <CardHeader>
        <div className={cn(
          "h-10 w-10 rounded-md flex items-center justify-center mb-3 transition-all duration-300",
          isHovered ? "bg-primary/20" : "bg-primary/10"
        )}>
          <div className="text-primary">{icon}</div>
        </div>
        <CardTitle className="text-blue-800 transition-colors duration-300">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="transition-colors duration-300">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
