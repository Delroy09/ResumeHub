
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Education } from '@/types/resume';

interface EducationSectionProps {
  education: Education[];
  onAdd: () => void;
  onChange: (id: string, field: string, value: string) => void;
  onDelete: (id: string) => void;
}

export const EducationSection = ({ education, onAdd, onChange, onDelete }: EducationSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium flex items-center">
          <GraduationCap size={18} className="mr-2" />
          Education
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
        {education.map((edu) => (
          <div key={edu.id} className="bg-white rounded-md p-3 border">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{edu.institution}</h4>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onDelete(edu.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Input
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => onChange(edu.id, 'institution', e.target.value)}
              />
              <Input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => onChange(edu.id, 'degree', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="month"
                  placeholder="Start Date"
                  value={edu.startDate}
                  onChange={(e) => onChange(edu.id, 'startDate', e.target.value)}
                />
                <Input
                  type="month"
                  placeholder="End Date"
                  value={edu.endDate === 'Present' ? '' : edu.endDate}
                  onChange={(e) => onChange(edu.id, 'endDate', e.target.value || 'Present')}
                />
              </div>
              <Input
                placeholder="Location"
                value={edu.location}
                onChange={(e) => onChange(edu.id, 'location', e.target.value)}
              />
              <Textarea
                placeholder="Description"
                value={edu.description}
                onChange={(e) => onChange(edu.id, 'description', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
