import React from 'react';
import { Film, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-[#1a2a3a] text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <Film className="text-[#ffd700] transition-transform duration-300 group-hover:rotate-12" size={28} />
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-[#ffd700]">Cine</span>Tickets
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className={`transition-colors hover:text-[#ffd700] ${isActive('/') ? 'text-[#ffd700]' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/movies" 
            className={`transition-colors hover:text-[#ffd700] ${isActive('/movies') ? 'text-[#ffd700]' : ''}`}
          >
            Movies
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors hover:text-[#ffd700] ${isActive('/about') ? 'text-[#ffd700]' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`transition-colors hover:text-[#ffd700] ${isActive('/contact') ? 'text-[#ffd700]' : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1a2a3a] shadow-lg animate-fadeIn">
          <nav className="flex flex-col px-4 py-2">
            <Link 
              to="/" 
              className={`py-3 px-2 border-b border-gray-700 ${isActive('/') ? 'text-[#ffd700]' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className={`py-3 px-2 border-b border-gray-700 ${isActive('/movies') ? 'text-[#ffd700]' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
            <Link 
              to="/about" 
              className={`py-3 px-2 border-b border-gray-700 ${isActive('/about') ? 'text-[#ffd700]' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`py-3 px-2 ${isActive('/contact') ? 'text-[#ffd700]' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;