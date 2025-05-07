import React from 'react';
import { Calendar, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div 
      className="bg-[#0f1923] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={movie.imageUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-[#e63946] text-white text-sm font-bold px-2 py-1 rounded">
          {movie.rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 truncate">{movie.title}</h3>
        
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <Clock size={14} className="mr-1" />
          <span>{movie.duration}</span>
          <span className="mx-2">•</span>
          <Star size={14} className="mr-1 text-[#ffd700]" />
          <span>8.2/10</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genre.map((genre, index) => (
            <span 
              key={index}
              className="bg-[#1a2a3a] text-gray-300 text-xs px-2 py-1 rounded"
            >
              {genre}
            </span>
          ))}
        </div>
        
        <div className="flex items-center text-[#ffd700] font-medium">
          <Calendar size={16} className="mr-2" />
          <span>Next showing: Today</span>
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <button 
          className="w-full bg-[#e63946] text-white py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
};

export default MovieCard;