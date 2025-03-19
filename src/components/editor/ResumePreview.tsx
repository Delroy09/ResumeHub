
import { Eye, Minimize, LayoutGrid, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ResumeData } from '@/types/resume';
import { ScrollArea } from '@/components/ui/scroll-area';
import { forwardRef } from 'react';

interface ResumePreviewProps {
  resumeData: ResumeData;
  viewMode: 'normal' | 'compact' | 'fit';
  previewScale: number;
  onChangeViewMode: (mode: 'normal' | 'compact' | 'fit') => void;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ 
  resumeData, 
  viewMode, 
  previewScale, 
  onChangeViewMode 
}, ref) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    if (dateString === 'Present') return 'Present';
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="flex-1 bg-gray-100 flex flex-col h-full">
      {/* Preview toolbar */}
      <div className="bg-white border-b p-2 flex items-center justify-between sticky top-0 z-10">
        <div className="text-sm font-medium">Resume Preview</div>
        <div className="flex items-center space-x-1">
          <Button
            variant={viewMode === 'normal' ? "default" : "ghost"}
            size="sm"
            className="h-8"
            onClick={() => onChangeViewMode('normal')}
            title="Normal view"
          >
            <Eye size={16} className="mr-1" />
            <span className="text-xs">Normal</span>
          </Button>
          <Button
            variant={viewMode === 'compact' ? "default" : "ghost"}
            size="sm"
            className="h-8"
            onClick={() => onChangeViewMode('compact')}
            title="Compact view"
          >
            <Minimize size={16} className="mr-1" />
            <span className="text-xs">Compact</span>
          </Button>
          <Button
            variant={viewMode === 'fit' ? "default" : "ghost"}
            size="sm"
            className="h-8"
            onClick={() => onChangeViewMode('fit')}
            title="Fit to screen"
          >
            <LayoutGrid size={16} className="mr-1" />
            <span className="text-xs">Fit</span>
          </Button>
        </div>
      </div>
      
      {/* Preview content with proper scrolling */}
      <ScrollArea className="flex-1 relative">
        <div className="p-8 flex justify-center">
          <div 
            ref={ref}
            data-export-container
            className={cn(
              "w-full max-w-[800px] bg-white shadow-md rounded-md overflow-hidden",
              viewMode !== 'normal' && "border"
            )}
            style={{ 
              transform: `scale(${previewScale})`, 
              transformOrigin: 'top center',
              marginBottom: viewMode !== 'normal' ? '40px' : '0',
              height: 'auto',
              minHeight: '1100px' // Approximately A4 height
            }}
          >
            {/* Resume content */}
            <div className="p-8 space-y-8">
              {/* Personal info section */}
              <div className="space-y-2 pb-6 border-b">
                <h1 className="text-3xl font-serif font-bold text-gray-900">{resumeData.personalInfo.fullName}</h1>
                <h2 className="text-xl text-gray-600">{resumeData.personalInfo.title}</h2>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mt-3">
                  {/* Contact information */}
                  {resumeData.personalInfo.email && (
                    <div className="flex items-center">
                      <Mail size={14} className="mr-1 shrink-0" />
                      <span>{resumeData.personalInfo.email}</span>
                    </div>
                  )}
                  {resumeData.personalInfo.phone && (
                    <div className="flex items-center">
                      <Phone size={14} className="mr-1 shrink-0" />
                      <span>{resumeData.personalInfo.phone}</span>
                    </div>
                  )}
                  {resumeData.personalInfo.location && (
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1 shrink-0" />
                      <span>{resumeData.personalInfo.location}</span>
                    </div>
                  )}
                  {resumeData.personalInfo.website && (
                    <div className="flex items-center">
                      <Globe size={14} className="mr-1 shrink-0" />
                      <span>{resumeData.personalInfo.website}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Experience section */}
              {resumeData.experience.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4 font-serif">Experience</h3>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="space-y-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{exp.position}</h4>
                          <div className="text-sm text-gray-600">
                            {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-gray-700">{exp.company}</div>
                          {exp.location && <div className="text-sm text-gray-600">{exp.location}</div>}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Education section */}
              {resumeData.education.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4 font-serif">Education</h3>
                  <div className="space-y-6">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="space-y-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{edu.degree}</h4>
                          <div className="text-sm text-gray-600">
                            {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="text-gray-700">{edu.institution}</div>
                          {edu.location && <div className="text-sm text-gray-600">{edu.location}</div>}
                        </div>
                        {edu.description && <p className="text-sm text-gray-600 mt-2">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Skills section */}
              {resumeData.skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4 font-serif">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Languages section */}
              {resumeData.languages.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4 font-serif">Languages</h3>
                  <ul className="space-y-2">
                    {resumeData.languages.map((lang, index) => (
                      <li key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                        <span className="font-medium">{lang.language}</span>
                        <span className="text-gray-600 text-sm">{lang.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
