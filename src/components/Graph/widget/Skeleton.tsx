import React from 'react';
import { useTheme } from '~/components/Graph/context/ThemeContext';

const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`animate-pulse ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-md ${className}`} />
  );
};

const ChartSkeleton: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`p-4 w-full h-[800px] ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg shadow`}>
      <Skeleton className="h-8 w-1/3 mb-4" />
      <Skeleton className="h-4 w-1/2 mb-6" />
      <Skeleton className="h-[650px] w-full" />
    </div>
  );
};

export default ChartSkeleton; 