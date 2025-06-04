
import React from "react";
import { Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export const Logo: React.FC<LogoProps> = ({ className, size = "medium" }) => {
  const sizes = {
    small: "text-lg",
    medium: "text-2xl",
    large: "text-4xl",
  };  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-transparent p-1.5 rounded-md flex items-center justify-center">
        <Database className="text-black" size={size === "large" ? 24 : size === "medium" ? 18 : 14} />
      </div>
      <span className={cn("font-bold text-black", sizes[size])}>CoPlateDB</span>
    </div>
  );
};
