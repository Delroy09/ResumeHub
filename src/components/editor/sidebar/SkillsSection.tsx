
import { Award, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface SkillsSectionProps {
  skills: string[];
  onChange: (value: string) => void;
}

export const SkillsSection = ({ skills, onChange }: SkillsSectionProps) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...skills, newSkill.trim()];
      onChange(updatedSkills.join(','));
      setNewSkill('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    } else if (e.key === ',' || e.key === ';') {
      e.preventDefault();
      if (newSkill.trim()) {
        handleAddSkill();
      }
    }
  };

  const handleRemoveSkill = (indexToRemove: number) => {
    const updatedSkills = skills.filter((_, index) => index !== indexToRemove);
    onChange(updatedSkills.join(','));
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium flex items-center mb-2">
        <Award size={18} className="mr-2" />
        Skills
      </h3>
      
      <div className="flex space-x-2">
        <Input
          placeholder="Add a skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button 
          onClick={handleAddSkill}
          type="button"
          size="sm"
        >
          Add
        </Button>
      </div>

      <div className="mt-2">
        <p className="text-sm text-muted-foreground mb-2">Current skills:</p>
        <ScrollArea className="h-24 w-full rounded-md border">
          <div className="p-4 flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                {skill}
                <X 
                  size={14} 
                  className="cursor-pointer opacity-70 hover:opacity-100" 
                  onClick={() => handleRemoveSkill(index)}
                />
              </Badge>
            ))}
            {skills.length === 0 && (
              <div className="text-sm text-muted-foreground">No skills added yet</div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
