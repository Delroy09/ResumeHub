
import { useState } from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  isNew?: boolean;
}

const TemplateCard = ({ id, name, category, thumbnail, isNew = false }: TemplateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleUseTemplate = () => {
    navigate(`/editor?template=${id}`);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Could open a preview modal here
    console.log(`Preview template: ${id}`);
  };

  return (
    <div 
      className="relative group rounded-xl overflow-hidden card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isNew && (
        <div className="absolute top-3 left-3 z-20 bg-primary text-white text-xs font-medium px-2 py-1 rounded-full">
          New
        </div>
      )}
      
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border">
        <img 
          src={thumbnail} 
          alt={`${name} template`}
          className={cn(
            "object-cover w-full h-full transition-transform duration-500",
            isHovered ? "scale-105" : "scale-100"
          )}
        />
        
        <div className={cn(
          "absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex flex-col items-center text-center space-y-4">
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white hover:bg-white/90"
              onClick={handlePreview}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            
            <Button onClick={handleUseTemplate}>
              Use This Template
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground">{category}</p>
      </div>
    </div>
  );
};

export default TemplateCard;
