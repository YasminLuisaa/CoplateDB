import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("max-w-[1200px] mx-auto px-4 w-full", className)}>
      {children}
    </div>
  );
}
