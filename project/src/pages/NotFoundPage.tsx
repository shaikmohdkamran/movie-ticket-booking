import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Film } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a1118] flex items-center justify-center pt-16 px-4">
      <div className="text-center">
        <div className="mb-6 inline-block">
          <Film className="text-[#ffd700] w-20 h-20 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-white mb-2">404</h1>
          <div className="w-16 h-1 bg-[#e63946] mx-auto mb-6"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            className="bg-[#e63946] text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center"
            onClick={() => navigate('/')}
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </button>
          
          <button 
            className="bg-transparent border-2 border-[#ffd700] text-[#ffd700] px-6 py-3 rounded-lg font-bold hover:bg-[#ffd700] hover:text-[#0a1118] transition-colors flex items-center justify-center"
            onClick={() => navigate('/movies')}
          >
            <Film size={18} className="mr-2" />
            Browse Movies
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;