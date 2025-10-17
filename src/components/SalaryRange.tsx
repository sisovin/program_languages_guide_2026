import { Progress } from "@/components/ui/progress";

interface SalaryRangeProps {
  min: number;
  max: number;
  currency?: string;
  experienceLevel?: 'entry' | 'mid' | 'senior';
}

export function SalaryRange({ min, max, currency = 'USD', experienceLevel }: SalaryRangeProps) {
  const average = (min + max) / 2;
  const industryAvg = 130000; // Example industry average
  const percentage = Math.min((average / industryAvg) * 100, 100);

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span>${min.toLocaleString()} {currency}</span>
        <span>${max.toLocaleString()} {currency}</span>
      </div>
      <Progress value={percentage} className="h-4" />
      <p className="text-xs text-muted-foreground">
        {experienceLevel ? `${experienceLevel} level` : 'Average'} salary compared to industry
      </p>
    </div>
  );
}