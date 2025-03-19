
import { useState, useEffect } from 'react';
import { Search, Filter, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateCard from '@/components/TemplateCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Placeholder data
const TEMPLATES = [
  {
    id: "minimal-1",
    name: "Minimal Clean",
    category: "Corporate",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "creative-1",
    name: "Creative Design",
    category: "Creative",
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "professional-1",
    name: "Professional",
    category: "Corporate",
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: "tech-1",
    name: "Tech Modern",
    category: "Technology",
    thumbnail: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=1974&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "academic-1",
    name: "Academic",
    category: "Education",
    thumbnail: "https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "minimal-2",
    name: "Elegant Minimal",
    category: "Corporate",
    thumbnail: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1974&auto=format&fit=crop",
  },
];

// Categories
const CATEGORIES = ["All", "Corporate", "Creative", "Technology", "Education", "Healthcare"];

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredTemplates, setFilteredTemplates] = useState(TEMPLATES);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Filter templates based on search query and category
  useEffect(() => {
    const filtered = TEMPLATES.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            template.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredTemplates(filtered);
  }, [searchQuery, selectedCategory]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="page-transition">
          {/* Header */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50/50 to-transparent">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="heading-lg animate-slide-up">Resume Templates</h1>
                <p className="paragraph text-muted-foreground mt-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
                  Choose from our collection of professionally designed templates to start your resume.
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto mt-8 space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search templates..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter: {selectedCategory}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {CATEGORIES.map((category) => (
                        <DropdownMenuCheckboxItem
                          key={category}
                          checked={selectedCategory === category}
                          onCheckedChange={() => setSelectedCategory(category)}
                        >
                          {selectedCategory === category && (
                            <Check className="mr-2 h-4 w-4" />
                          )}
                          {category}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <p className="text-sm text-muted-foreground">
                    {filteredTemplates.length} templates found
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Templates Grid */}
          <section className="pb-24">
            <div className="container mx-auto px-4 md:px-6">
              {filteredTemplates.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="heading-sm text-muted-foreground">No templates found</h3>
                  <p className="mt-2">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filteredTemplates.map((template, index) => (
                    <div 
                      key={template.id} 
                      className="animate-scale-in" 
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <TemplateCard {...template} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Templates;
