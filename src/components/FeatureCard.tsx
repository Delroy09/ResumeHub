
import { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  style?: CSSProperties;
}

const FeatureCard = ({ icon, title, description, className, style }: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "relative p-6 lg:p-8 rounded-xl border bg-background/50 backdrop-blur-sm card-hover",
        className
      )}
      style={style}
    >
      <div className="flex flex-col space-y-4">
        <div className="p-2 w-12 h-12 flex items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
