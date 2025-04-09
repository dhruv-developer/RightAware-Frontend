
import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  // Check for dark mode preference
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const comingSoonNotify = () => {
    toast({
      title: "Coming Soon!",
      description: "This feature is under development and will be available soon.",
    });
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-legal-blue to-trust-purple flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="font-bold text-xl">RightAware</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">Features</a>
          <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">About</a>
          <button onClick={comingSoonNotify} className="text-foreground/80 hover:text-foreground transition-colors">Resources</button>
          <Button onClick={toggleDarkMode} variant="ghost" size="icon" className="ml-2">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <Button onClick={toggleDarkMode} variant="ghost" size="icon" className="mr-2">
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button onClick={toggleMobileMenu} variant="ghost" size="icon">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b animate-fade-in">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <a href="#features" className="text-foreground/80 hover:text-foreground py-2 transition-colors" onClick={toggleMobileMenu}>Features</a>
            <a href="#about" className="text-foreground/80 hover:text-foreground py-2 transition-colors" onClick={toggleMobileMenu}>About</a>
            <button onClick={() => { comingSoonNotify(); toggleMobileMenu(); }} className="text-left text-foreground/80 hover:text-foreground py-2 transition-colors">Resources</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
