
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        <NavLink to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <span className="font-serif text-xl font-semibold">ResumeHub</span>
        </NavLink>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                cn("text-sm font-medium transition-colors hover:text-primary", 
                   isActive ? "text-primary" : "text-foreground/80")
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/templates" 
              className={({ isActive }) => 
                cn("text-sm font-medium transition-colors hover:text-primary", 
                   isActive ? "text-primary" : "text-foreground/80")
              }
            >
              Templates
            </NavLink>
            <NavLink 
              to="/editor" 
              className={({ isActive }) => 
                cn("text-sm font-medium transition-colors hover:text-primary", 
                   isActive ? "text-primary" : "text-foreground/80")
              }
            >
              Editor
            </NavLink>
          </nav>
          
          <Button asChild>
            <NavLink to="/templates">Create Resume</NavLink>
          </Button>
        </div>
        
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 bg-white pt-16 transition-transform duration-300 ease-in-out transform",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="container flex flex-col items-center space-y-8 p-8 animate-fade-in">
          <NavLink 
            to="/" 
            className="text-lg font-medium hover:text-primary w-full text-center py-2"
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink 
            to="/templates" 
            className="text-lg font-medium hover:text-primary w-full text-center py-2"
            onClick={closeMenu}
          >
            Templates
          </NavLink>
          <NavLink 
            to="/editor" 
            className="text-lg font-medium hover:text-primary w-full text-center py-2"
            onClick={closeMenu}
          >
            Editor
          </NavLink>
          
          <Button className="w-full mt-4" onClick={closeMenu} asChild>
            <NavLink to="/templates">Create Resume</NavLink>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
