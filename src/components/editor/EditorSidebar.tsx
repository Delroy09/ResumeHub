
import { useState } from 'react';
import { User, Layers } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PersonalInfoSection } from './sidebar/PersonalInfoSection';
import { ExperienceSection } from './sidebar/ExperienceSection';
import { EducationSection } from './sidebar/EducationSection';
import { SkillsSection } from './sidebar/SkillsSection';
import { LanguagesSection } from './sidebar/LanguagesSection';
import { ResumeData } from '@/types/resume';

interface EditorSidebarProps {
  resumeData: ResumeData;
  onUpdateResumeData: (updatedData: ResumeData) => void;
  isOpen: boolean;
}

const EditorSidebar = ({ resumeData, onUpdateResumeData, isOpen }: EditorSidebarProps) => {
  const [activeTab, setActiveTab] = useState("personal");

  // Update personal info
  const handlePersonalInfoChange = (field: string, value: string) => {
    onUpdateResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    });
  };

  // Add experience entry
  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: 'New Company',
      position: 'Position Title',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    };
    
    onUpdateResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience]
    });
  };

  // Update experience entry
  const handleExperienceChange = (id: string, field: string, value: string) => {
    onUpdateResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  // Delete experience entry
  const handleDeleteExperience = (id: string) => {
    onUpdateResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  // Add education entry
  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: 'New Institution',
      degree: 'Degree Title',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    };
    
    onUpdateResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation]
    });
  };

  // Update education entry
  const handleEducationChange = (id: string, field: string, value: string) => {
    onUpdateResumeData({
      ...resumeData,
      education: resumeData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  // Delete education entry
  const handleDeleteEducation = (id: string) => {
    onUpdateResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  // Update skills
  const handleSkillsChange = (value: string) => {
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(Boolean);
    onUpdateResumeData({
      ...resumeData,
      skills: skillsArray
    });
  };

  // Add language
  const handleAddLanguage = () => {
    const newLanguage = { language: 'New Language', level: 'Beginner' };
    onUpdateResumeData({
      ...resumeData,
      languages: [...resumeData.languages, newLanguage]
    });
  };

  // Update language
  const handleLanguageChange = (index: number, field: string, value: string) => {
    const updatedLanguages = [...resumeData.languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    
    onUpdateResumeData({
      ...resumeData,
      languages: updatedLanguages
    });
  };

  // Delete language
  const handleDeleteLanguage = (index: number) => {
    onUpdateResumeData({
      ...resumeData,
      languages: resumeData.languages.filter((_, i) => i !== index)
    });
  };

  return (
    <div className={cn(
      "bg-gray-50/80 h-full flex flex-col",
      !isOpen && "hidden"
    )}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <TabsList className="justify-start px-4 pt-4 bg-transparent sticky top-0 z-10">
          <TabsTrigger value="personal" className="flex items-center">
            <User size={16} className="mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="sections" className="flex items-center">
            <Layers size={16} className="mr-2" />
            Sections
          </TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="personal" className="mt-0">
              <PersonalInfoSection 
                personalInfo={resumeData.personalInfo}
                onChange={handlePersonalInfoChange}
              />
            </TabsContent>
            
            <TabsContent value="sections" className="mt-0">
              <div className="space-y-6">
                <ExperienceSection 
                  experience={resumeData.experience}
                  onAdd={handleAddExperience}
                  onChange={handleExperienceChange}
                  onDelete={handleDeleteExperience}
                />
                
                <EducationSection 
                  education={resumeData.education}
                  onAdd={handleAddEducation}
                  onChange={handleEducationChange}
                  onDelete={handleDeleteEducation}
                />
                
                <SkillsSection 
                  skills={resumeData.skills}
                  onChange={handleSkillsChange}
                />
                
                <LanguagesSection 
                  languages={resumeData.languages}
                  onAdd={handleAddLanguage}
                  onChange={handleLanguageChange}
                  onDelete={handleDeleteLanguage}
                />
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default EditorSidebar;
