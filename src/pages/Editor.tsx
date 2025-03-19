
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import EditorToolbar from '@/components/editor/EditorToolbar';
import EditorSidebar from '@/components/editor/EditorSidebar';
import ResumePreview from '@/components/editor/ResumePreview';
import { ResumeData } from '@/types/resume';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Smith',
    title: 'Software Engineer',
    email: 'john.smith@example.com',
    phone: '(123) 456-7890',
    location: 'San Francisco, CA',
    website: 'johnsmith.dev',
  },
  experience: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Software Engineer',
      startDate: '2020-01',
      endDate: 'Present',
      location: 'San Francisco, CA',
      description: 'Led development of cloud-based applications using React and Node.js. Implemented CI/CD pipelines and microservices architecture.',
    },
    {
      id: '2',
      company: 'Digital Innovations',
      position: 'Software Developer',
      startDate: '2018-03',
      endDate: '2019-12',
      location: 'Boston, MA',
      description: 'Built responsive web applications with modern JavaScript frameworks. Collaborated with design team to implement UI/UX improvements.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'Master of Computer Science',
      startDate: '2016-09',
      endDate: '2018-05',
      location: 'Boston, MA',
      description: 'Specialized in artificial intelligence and machine learning. Graduated with honors.',
    },
  ],
  skills: [
    'JavaScript', 'React', 'Node.js', 'TypeScript', 'HTML/CSS', 'Python', 'SQL', 'Git', 'AWS', 'Docker'
  ],
  languages: [
    { language: 'English', level: 'Native' },
    { language: 'Spanish', level: 'Professional' },
  ],
};

const RESUME_STORAGE_KEY = 'resume_editor_data';

const Editor = () => {
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || 'minimal-1';
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [previewScale, setPreviewScale] = useState(1);
  const [viewMode, setViewMode] = useState<'normal' | 'compact' | 'fit'>('fit');
  const resumeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(RESUME_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData) as ResumeData;
        setResumeData(parsedData);
        toast.success('Resume data restored from previous session');
      }
    } catch (error) {
      console.error('Failed to load saved resume data:', error);
    }
    
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    try {
      localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(resumeData));
    } catch (error) {
      console.error('Failed to save resume data:', error);
    }
  }, [resumeData]);
  
  useEffect(() => {
    toggleViewMode('fit');
  }, []);
  
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) return;
      
      const file = target.files[0];
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const result = event.target?.result;
          if (typeof result === 'string') {
            const importedData = JSON.parse(result) as ResumeData;
            setResumeData(importedData);
            toast.success('Resume imported successfully');
          } else {
            throw new Error('Invalid file format');
          }
        } catch (error) {
          toast.error('Failed to import resume. Invalid file format.');
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  };
  
  const handleExport = async (format = 'pdf') => {
    if (!resumeRef.current) {
      toast.error('Could not generate export');
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading(`Preparing ${format.toUpperCase()} export...`);
    
    // Store current state values
    const storedScale = previewScale;
    const storedViewMode = viewMode;
    
    try {
      // Set the preview to normal size for export
      setPreviewScale(1);
      setViewMode('normal');
      
      // Wait for the state updates to be applied and for any rendering to complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const exportElement = resumeRef.current;
      
      if (format === 'pdf') {
        // Create canvas from the element with better quality settings
        const canvas = await html2canvas(exportElement, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        
        // Create PDF with proper dimensions
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });
        
        // Calculate dimensions to fit the page
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        const canvasRatio = canvas.width / canvas.height;
        const pageRatio = pageWidth / pageHeight;
        
        let imgWidth, imgHeight;
        
        if (canvasRatio > pageRatio) {
          // Canvas is wider than the page ratio
          imgWidth = pageWidth;
          imgHeight = imgWidth / canvasRatio;
        } else {
          // Canvas is taller than the page ratio
          imgHeight = pageHeight;
          imgWidth = imgHeight * canvasRatio;
        }
        
        // Center the image on the page
        const xOffset = (pageWidth - imgWidth) / 2;
        const yOffset = 0;
        
        // Add the image to the PDF
        pdf.addImage(imgData, 'JPEG', xOffset, yOffset, imgWidth, imgHeight);
        
        // Save the PDF
        pdf.save(`resume-${new Date().toISOString().slice(0, 10)}.pdf`);
        toast.dismiss(loadingToast);
        toast.success('Resume exported as PDF');
      } else if (format === 'jpg') {
        // Create canvas with higher quality settings
        const canvas = await html2canvas(exportElement, {
          scale: 3, // Even higher scale for JPG for better quality
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        
        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            // Create download link
            const link = document.createElement('a');
            link.download = `resume-${new Date().toISOString().slice(0, 10)}.jpg`;
            link.href = URL.createObjectURL(blob);
            link.click();
            
            // Clean up
            URL.revokeObjectURL(link.href);
            toast.dismiss(loadingToast);
            toast.success('Resume exported as JPG');
          } else {
            toast.dismiss(loadingToast);
            toast.error('Failed to generate JPG file');
          }
        }, 'image/jpeg', 0.95);
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.dismiss(loadingToast);
      toast.error(`Failed to export as ${format.toUpperCase()}`);
    } finally {
      // Restore the previous view settings
      setPreviewScale(storedScale);
      setViewMode(storedViewMode);
    }
  };
  
  const handleSave = () => {
    // Create JSON file from resumeData
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    // Create filename with current date
    const exportFileDefaultName = `resume-${new Date().toISOString().slice(0, 10)}.json`;
    
    // Create download link and trigger download
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Resume saved as JSON');
  };
  
  const toggleViewMode = (mode: 'normal' | 'compact' | 'fit') => {
    setViewMode(mode);
    
    switch (mode) {
      case 'compact':
        setPreviewScale(0.7);
        break;
      case 'fit':
        setPreviewScale(0.5);
        break;
      case 'normal':
      default:
        setPreviewScale(1);
        break;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          <EditorToolbar 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onSave={handleSave}
            onImport={handleImport}
            onExport={handleExport}
          />
          
          <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
            <ResizablePanel 
              defaultSize={30} 
              minSize={20}
              maxSize={40}
              className={cn(
                !sidebarOpen && "hidden"
              )}
            >
              <EditorSidebar 
                resumeData={resumeData}
                onUpdateResumeData={setResumeData}
                isOpen={sidebarOpen}
              />
            </ResizablePanel>
            
            {sidebarOpen && <ResizableHandle withHandle />}
            
            <ResizablePanel defaultSize={70}>
              <ResumePreview
                resumeData={resumeData}
                viewMode={viewMode}
                previewScale={previewScale}
                onChangeViewMode={toggleViewMode}
                ref={resumeRef}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>
    </div>
  );
};

export default Editor;
