import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar, Star, Play, Users, Award, X } from 'lucide-react';
import { movies } from '../data/movieData';
import { useBooking } from '../context/BookingContext';
import { Movie, Showtime } from '../types';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectMovie, selectShowtime } = useBooking();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [uniqueDates, setUniqueDates] = useState<string[]>([]);
  const [showTimesForDate, setShowTimesForDate] = useState<Showtime[]>([]);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    const foundMovie = movies.find(m => m.id === Number(id));
    if (foundMovie) {
      setMovie(foundMovie);
      
      // Get unique dates from showtimes
      const dates = [...new Set(foundMovie.showtimes.map(st => st.date))];
      setUniqueDates(dates);
      
      // Default to first date
      if (dates.length > 0) {
        setSelectedDate(dates[0]);
      }
    }
  }, [id]);

  useEffect(() => {
    if (movie && selectedDate) {
      const filteredShowtimes = movie.showtimes.filter(st => st.date === selectedDate);
      setShowTimesForDate(filteredShowtimes);
    }
  }, [selectedDate, movie]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleShowtimeSelect = (showtime: Showtime) => {
    if (movie) {
      selectMovie(movie);
      selectShowtime(showtime);
      navigate('/select-seats');
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#0a1118] text-white flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="inline-block border-t-4 border-r-4 border-[#ffd700] w-12 h-12 rounded-full animate-spin mb-4"></div>
          <p>Loading movie details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1118] pt-16">
      {/* Movie Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={movie.imageUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1118] via-[#0a1118]/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end">
              <div className="md:w-1/3 lg:w-1/4 mb-4 md:mb-0 md:mr-8">
                <div className="bg-[#0f1923] p-2 rounded-lg shadow-lg overflow-hidden">
                  <img 
                    src={movie.imageUrl} 
                    alt={movie.title} 
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
              
              <div className="md:flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{movie.title}</h1>
                
                <div className="flex flex-wrap items-center text-gray-300 mb-4">
                  <span className="flex items-center mr-4 mb-2">
                    <Clock size={16} className="mr-1" />
                    {movie.duration}
                  </span>
                  <span className="flex items-center mr-4 mb-2">
                    <Calendar size={16} className="mr-1" />
                    {movie.releaseDate}
                  </span>
                  <span className="flex items-center mr-4 mb-2">
                    <Star size={16} className="mr-1 text-[#ffd700]" />
                    8.2/10
                  </span>
                  <span className="bg-[#e63946] text-white text-sm px-2 py-1 rounded mb-2">
                    {movie.rating}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genre.map((genre, index) => (
                    <span 
                      key={index}
                      className="bg-[#1a2a3a] text-gray-300 text-sm px-3 py-1 rounded"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                
                <button 
                  className="flex items-center bg-[#ffd700] text-[#0a1118] px-4 py-2 rounded font-medium hover:bg-opacity-90 transition-colors mb-2 md:mb-0"
                  onClick={() => setIsTrailerOpen(true)}
                >
                  <Play size={18} className="mr-2" />
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Movie Details */}
          <div className="lg:w-2/3">
            <div className="bg-[#0f1923] rounded-lg p-6 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {movie.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="flex items-center text-lg font-semibold text-white mb-3">
                    <Award size={18} className="mr-2 text-[#ffd700]" />
                    Director
                  </h3>
                  <p className="text-gray-300 ml-7">{movie.director}</p>
                </div>
                
                <div>
                  <h3 className="flex items-center text-lg font-semibold text-white mb-3">
                    <Users size={18} className="mr-2 text-[#ffd700]" />
                    Cast
                  </h3>
                  <ul className="text-gray-300 ml-7 space-y-1">
                    {movie.cast.map((actor, index) => (
                      <li key={index}>{actor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Showtimes Section */}
            <div className="bg-[#0f1923] rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-6">Showtimes</h2>
              
              {/* Date selection */}
              <div className="mb-6 overflow-x-auto pb-2">
                <div className="flex space-x-3">
                  {uniqueDates.map(date => (
                    <button
                      key={date}
                      className={`px-4 py-3 rounded-lg min-w-[120px] transition-colors ${
                        selectedDate === date 
                          ? 'bg-[#ffd700] text-[#0a1118] font-semibold' 
                          : 'bg-[#1a2a3a] text-gray-300 hover:bg-[#2a3f55]'
                      }`}
                      onClick={() => handleDateSelect(date)}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Showtimes */}
              {showTimesForDate.length > 0 ? (
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {showTimesForDate.map(showtime => (
                      <button
                        key={showtime.id}
                        className="bg-[#1a2a3a] hover:bg-[#2a3f55] text-white py-3 px-4 rounded-lg transition-colors flex flex-col items-center"
                        onClick={() => handleShowtimeSelect(showtime)}
                      >
                        <span className="font-medium mb-1">{showtime.time}</span>
                        <span className="text-sm text-gray-400">{showtime.theater}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-[#1a2a3a] rounded-lg">
                    <div className="flex items-center text-[#ffd700]">
                      <Star size={18} className="mr-2" />
                      <span className="font-medium">Ticket Prices</span>
                    </div>
                    <div className="mt-2 text-gray-300 text-sm">
                      <p>Regular: ₹299 | Premium: ₹349</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No showtimes available for this date
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-[#0f1923] rounded-lg p-6 shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-4">Quick Booking</h2>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Select Date</label>
                <select 
                  className="w-full bg-[#1a2a3a] text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#ffd700]"
                  value={selectedDate}
                  onChange={(e) => handleDateSelect(e.target.value)}
                >
                  {uniqueDates.map(date => (
                    <option key={date} value={date}>{formatDate(date)}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Select Time</label>
                <div className="grid grid-cols-2 gap-2">
                  {showTimesForDate.map(showtime => (
                    <button
                      key={showtime.id}
                      className="bg-[#1a2a3a] hover:bg-[#2a3f55] text-white py-2 px-3 rounded transition-colors text-sm"
                      onClick={() => handleShowtimeSelect(showtime)}
                    >
                      {showtime.time} - {showtime.theater}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                className="w-full bg-[#e63946] text-white py-3 rounded font-bold hover:bg-opacity-90 transition-colors"
                onClick={() => {
                  if (showTimesForDate.length > 0) {
                    handleShowtimeSelect(showTimesForDate[0]);
                  }
                }}
                disabled={showTimesForDate.length === 0}
              >
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trailer Modal */}
      {isTrailerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-[#ffd700]"
              onClick={() => setIsTrailerOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <p className="text-white text-center p-8">
                Trailer would play here. This is a placeholder for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;