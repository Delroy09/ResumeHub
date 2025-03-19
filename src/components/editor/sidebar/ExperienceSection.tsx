
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Experience } from '@/types/resume';

interface ExperienceSectionProps {
  experience: Experience[];
  onAdd: () => void;
  onChange: (id: string, field: string, value: string) => void;
  onDelete: (id: string) => void;
}

export const ExperienceSection = ({ experience, onAdd, onChange, onDelete }: ExperienceSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium flex items-center">
          <Briefcase size={18} className="mr-2" />
          Experience
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
      
      <div className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id} className="bg-white rounded-md p-3 border">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{exp.company}</h4>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onDelete(exp.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Input
                placeholder="Company"
                value={exp.company}
                onChange={(e) => onChange(exp.id, 'company', e.target.value)}
              />
              <Input
                placeholder="Position"
                value={exp.position}
                onChange={(e) => onChange(exp.id, 'position', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="month"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => onChange(exp.id, 'startDate', e.target.value)}
                />
                <Input
                  type="month"
                  placeholder="End Date"
                  value={exp.endDate === 'Present' ? '' : exp.endDate}
                  onChange={(e) => onChange(exp.id, 'endDate', e.target.value || 'Present')}
                />
              </div>
              <Input
                placeholder="Location"
                value={exp.location}
                onChange={(e) => onChange(exp.id, 'location', e.target.value)}
              />
              <Textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => onChange(exp.id, 'description', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
