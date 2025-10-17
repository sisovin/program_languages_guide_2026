import { Badge } from "@/components/ui/badge";

interface UseCaseBadgeProps {
  useCase: string;
  category: 'web' | 'mobile' | 'ai' | 'systems';
}

const categoryColors = {
  web: 'bg-blue-100 text-blue-800',
  mobile: 'bg-green-100 text-green-800',
  ai: 'bg-purple-100 text-purple-800',
  systems: 'bg-orange-100 text-orange-800',
};

export function UseCaseBadge({ useCase, category }: UseCaseBadgeProps) {
  return (
    <Badge className={`${categoryColors[category]} hover:opacity-80 transition-opacity`}>
      {useCase}
    </Badge>
  );
}