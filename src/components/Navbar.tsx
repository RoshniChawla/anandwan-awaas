import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-full bg-background sticky top-0 z-50 shadow-sm border-b border-border">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center size-20" onClick={closeMenu}>
            <img 
              src="/public/anandwaan .jpg"
              alt="Anandwan Awaas Logo" 
              className="h-20 w-20 rounded-full object-cover border-2 border-primary"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/about" 
              className={`text-sm font-medium ${isActive('/about') ? 'text-primary-600' : 'text-foreground hover:text-primary-500'}`}
            >
              About Us
            </Link>
            <Link 
              to="/faqs" 
              className={`text-sm font-medium ${isActive('/faqs') ? 'text-primary-600' : 'text-foreground hover:text-primary-500'}`}
            >
              FAQs
            </Link>
            <Link 
              to="/guide" 
              className={`text-sm font-medium ${isActive('/guide') ? 'text-primary-600' : 'text-foreground hover:text-primary-500'}`}
            >
              Guide
            </Link>
            <Link 
              to="/team" 
              className={`text-sm font-medium ${isActive('/team') ? 'text-primary-600' : 'text-foreground hover:text-primary-500'}`}
            >
              Team
            </Link>
            
            <Link to="/admin-login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="ghost" size="sm">Sign Up</Button>
            </Link>
            <Link to="/donate">
              <Button className="bg-accent-orange hover:bg-accent-orange/90 text-white rounded-full">Donate</Button>
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button onClick={toggleMenu} className="text-foreground">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border py-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/about" className="text-foreground hover:text-primary-500" onClick={closeMenu}>About Us</Link>
            <Link to="/faqs" className="text-foreground hover:text-primary-500" onClick={closeMenu}>FAQs</Link>
            <Link to="/guide" className="text-foreground hover:text-primary-500" onClick={closeMenu}>Guide</Link>
            <Link to="/team" className="text-foreground hover:text-primary-500" onClick={closeMenu}>Team</Link>
            
            <div className="flex flex-col space-y-2 border-t border-border pt-4">
              <Link to="/admin-login" onClick={closeMenu}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/register" onClick={closeMenu}>
                <Button variant="outline" className="w-full">Sign Up</Button>
              </Link>
              <Link to="/donate" onClick={closeMenu}>
                <Button className="w-full bg-accent-orange hover:bg-accent-orange/90 text-white">Donate</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
