import React from 'react';
import { Heart, Film, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a2a3a] text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Film className="text-[#ffd700]" size={24} />
              <h3 className="text-xl font-bold">
                <span className="text-[#ffd700]">Cine</span>Tickets
              </h3>
            </div>
            <p className="text-gray-300 mb-4">
              Your premier destination for booking movie tickets online. Experience the magic of cinema with just a few clicks.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#ffd700] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#ffd700] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#ffd700] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#ffd700] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/movies" className="text-gray-300 hover:text-[#ffd700] transition-colors">Movies</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[#ffd700] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-[#ffd700] transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-[#ffd700] transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 text-[#ffd700]" />
                <span className="text-gray-300">123 Cinema Street, Movie City, MC 12345</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-[#ffd700]" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-[#ffd700]" />
                <span className="text-gray-300">info@cinetickets.com</span>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Newsletter</h4>
            <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates on new releases and special offers.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-[#0f1923] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ffd700]" 
              />
              <button 
                type="submit" 
                className="bg-[#e63946] text-white px-4 py-2 rounded font-medium hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-gray-700 text-center text-gray-400">
          <p>© 2025 CineTickets. All rights reserved.</p>
          <p className="mt-2 text-sm flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-[#e63946]" /> by CineTickets Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;