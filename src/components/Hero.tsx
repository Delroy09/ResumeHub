
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[25%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/20 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="space-y-4 max-w-3xl mx-auto animate-slide-up">
            <h1 className="heading-xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Create Stunning Resumes That Get You Hired
            </h1>
            <p className="paragraph text-foreground/80 max-w-2xl mx-auto">
              Design beautiful, professional resumes in minutes with our easy-to-use builder. Choose from industry-specific templates and customize to match your personal style.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Button size="lg" asChild>
              <Link to="/templates" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/templates">
                Browse Templates
              </Link>
            </Button>
          </div>
          
          <div className="w-full max-w-5xl mx-auto relative mt-16 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="relative z-10 w-full aspect-[16/9] overflow-hidden rounded-xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/20 border border-white/30 rounded-xl glass-panel">
                <div className="relative p-6 h-full">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="flex flex-col space-y-4">
                      <div className="h-8 w-32 bg-primary/10 rounded-md"></div>
                      <div className="h-4 w-full bg-gray-200/50 rounded-md"></div>
                      <div className="h-4 w-3/4 bg-gray-200/50 rounded-md"></div>
                      <div className="h-8 w-40 bg-primary/10 rounded-md mt-4"></div>
                      <div className="h-4 w-full bg-gray-200/50 rounded-md"></div>
                      <div className="h-4 w-5/6 bg-gray-200/50 rounded-md"></div>
                      <div className="h-4 w-4/6 bg-gray-200/50 rounded-md"></div>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <div className="h-8 w-32 bg-primary/10 rounded-md"></div>
                      <div className="h-4 w-full bg-gray-200/50 rounded-md"></div>
                      <div className="h-4 w-2/3 bg-gray-200/50 rounded-md"></div>
                      <div className="h-8 w-40 bg-primary/10 rounded-md mt-4"></div>
                      <div className="h-4 w-full bg-gray-200/50 rounded-md"></div>
                      <div className="h-4 w-3/4 bg-gray-200/50 rounded-md"></div>
                      <div className="h-14 w-full bg-primary/10 rounded-md mt-4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
