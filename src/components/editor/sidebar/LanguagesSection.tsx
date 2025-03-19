
import { Languages, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Language } from '@/types/resume';

interface LanguagesSectionProps {
  languages: Language[];
  onAdd: () => void;
  onChange: (index: number, field: string, value: string) => void;
  onDelete: (index: number) => void;
}

export const LanguagesSection = ({ languages, onAdd, onChange, onDelete }: LanguagesSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium flex items-center">
          <Languages size={18} className="mr-2" />
          Languages
        </h3>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8"
          onClick={onAdd}
        >
          <Plus size={16} />
        </Button>
      </div>
      
      <div className="space-y-3">
        {languages.map((lang, index) => (
          <div key={index} className="bg-white rounded-md p-3 border flex items-center justify-between">
            <div className="grid grid-cols-2 gap-2 flex-1">
              <Input
                placeholder="Language"
                value={lang.language}
                onChange={(e) => onChange(index, 'language', e.target.value)}
              />
              <Input
                placeholder="Level"
                value={lang.level}
                onChange={(e) => onChange(index, 'level', e.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 ml-2"
              onClick={() => onDelete(index)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
