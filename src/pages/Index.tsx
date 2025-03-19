
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutTemplate, 
  FileText, 
  Download, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="page-transition">
          <Hero />
          
          {/* Features Section */}
          <section className="section bg-gray-50/50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="heading-lg">Create Professional Resumes with Ease</h2>
                <p className="paragraph text-muted-foreground mt-4">
                  Our intuitive builder provides all the tools you need to create a standout resume in minutes.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <FeatureCard 
                  icon={<LayoutTemplate size={24} />}
                  title="Industry-Specific Templates"
                  description="Choose from professionally designed templates tailored to your industry and career level."
                  className="animate-fade-in"
                  style={{ animationDelay: '100ms' }}
                />
                
                <FeatureCard 
                  icon={<FileText size={24} />}
                  title="Easy Customization"
                  description="Personalize every aspect of your resume with our intuitive drag-and-drop editor."
                  className="animate-fade-in"
                  style={{ animationDelay: '200ms' }}
                />
                
                <FeatureCard 
                  icon={<Download size={24} />}
                  title="Multiple Export Options"
                  description="Download your resume as PDF, DOCX, or JPG to use in any application process."
                  className="animate-fade-in"
                  style={{ animationDelay: '300ms' }}
                />
                
                <FeatureCard 
                  icon={<Briefcase size={24} />}
                  title="Work Experience Tools"
                  description="Showcase your professional achievements with specialized sections and formatting."
                  className="animate-fade-in"
                  style={{ animationDelay: '400ms' }}
                />
                
                <FeatureCard 
                  icon={<GraduationCap size={24} />}
                  title="Education Spotlight"
                  description="Highlight your academic credentials in a clear, professional manner."
                  className="animate-fade-in"
                  style={{ animationDelay: '500ms' }}
                />
                
                <FeatureCard 
                  icon={<Users size={24} />}
                  title="ATS-Friendly Design"
                  description="Our templates are optimized to pass through Applicant Tracking Systems."
                  className="animate-fade-in"
                  style={{ animationDelay: '600ms' }}
                />
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="section bg-gradient-to-r from-primary/5 to-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute -bottom-[30%] -right-[25%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-3xl" />
              <div className="absolute -top-[30%] -left-[25%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-3xl" />
            </div>
            
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center justify-center p-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
                  <span className="flex items-center px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                    <Sparkles size={14} className="mr-1" />
                    Start Building Your Career
                  </span>
                </div>
                
                <h2 className="heading-lg animate-slide-up">Ready to Create Your Professional Resume?</h2>
                <p className="paragraph text-muted-foreground mt-4 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                  Choose from our stunning templates and customize your resume in minutes.
                </p>
                
                <Button size="lg" asChild className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                  <Link to="/templates">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
