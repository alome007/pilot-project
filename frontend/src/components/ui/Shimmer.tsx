import React from 'react';
import { cn } from '../../utils/cn';

interface ShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Shimmer({ className, ...props }: ShimmerProps) {
  return (
    <div 
      className={cn(
        "animate-shimmer bg-gradient-to-r from-transparent via-gray-200/50 dark:via-gray-700/50 to-transparent",
        className
      )}
      {...props}
    />
  );
}