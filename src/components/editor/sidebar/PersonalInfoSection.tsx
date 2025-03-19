
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PersonalInfo } from '@/types/resume';

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  onChange: (field: string, value: string) => void;
}

export const PersonalInfoSection = ({ personalInfo, onChange }: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={personalInfo.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="title">Professional Title</Label>
        <Input
          id="title"
          value={personalInfo.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={personalInfo.phone}
          onChange={(e) => onChange('phone', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={personalInfo.location}
          onChange={(e) => onChange('location', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          value={personalInfo.website}
          onChange={(e) => onChange('website', e.target.value)}
        />
      </div>
    </div>
  );
};
