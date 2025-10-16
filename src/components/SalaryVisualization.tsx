'use client';

import { Language } from '@/data/languages';

interface SalaryVisualizationProps {
  language: Language;
}

export default function SalaryVisualization({ language }: SalaryVisualizationProps) {
  const { min, max, average } = language.salaryRange;
  const range = max - min;
  const avgPosition = ((average - min) / range) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm font-medium">
        <span>${(min / 1000).toFixed(0)}K</span>
        <span className="text-primary font-bold">${(average / 1000).toFixed(0)}K avg</span>
        <span>${(max / 1000).toFixed(0)}K</span>
      </div>
      
      <div className="relative h-12 bg-gradient-to-r from-blue-200 via-green-200 to-emerald-300 dark:from-blue-900 dark:via-green-900 dark:to-emerald-800 rounded-lg overflow-hidden">
        <div 
          className="absolute top-0 bottom-0 w-1 bg-primary"
          style={{ left: `${avgPosition}%` }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
            Average
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-2">
        <div className="text-center p-3 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Entry Level</p>
          <p className="text-lg font-bold">${(min / 1000).toFixed(0)}K</p>
        </div>
        <div className="text-center p-3 bg-primary/10 rounded-lg border-2 border-primary">
          <p className="text-xs text-muted-foreground mb-1">Average</p>
          <p className="text-lg font-bold text-primary">${(average / 1000).toFixed(0)}K</p>
        </div>
        <div className="text-center p-3 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Senior Level</p>
          <p className="text-lg font-bold">${(max / 1000).toFixed(0)}K</p>
        </div>
      </div>
    </div>
  );
}
