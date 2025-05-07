import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Film, Clock, Calendar, MapPin } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import SeatGrid from '../components/SeatGrid';
import { Seat } from '../types';
import { generateSeats } from '../data/movieData';

const SelectSeatsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, totalPrice } = useBooking();
  const { movie, showtime, selectedSeats } = state;
  const [availableSeats, setAvailableSeats] = useState<Seat[]>([]);
  
  useEffect(() => {
    // Redirect if no movie or showtime is selected
    if (!movie || !showtime) {
      navigate('/');
      return;
    }
    
    // Generate seats for the selected showtime
    if (showtime) {
      const seats = generateSeats(showtime.id);
      setAvailableSeats(seats);
    }
  }, [movie, showtime, navigate]);
  
  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      navigate('/checkout');
    }
  };
  
  if (!movie || !showtime) {
    return (
      <div className="min-h-screen bg-[#0a1118] text-white flex items-center justify-center pt-16">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1118] pt-16 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white flex items-center mb-4"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back
          </button>
          
          <h1 className="text-3xl font-bold text-white mb-6">Select Your Seats</h1>
          
          {/* Movie Info */}
          <div className="bg-[#0f1923] p-4 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="w-full md:w-auto mb-4 md:mb-0 md:mr-6">
                <img 
                  src={movie.imageUrl} 
                  alt={movie.title} 
                  className="w-24 h-36 object-cover rounded-md"
                />
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-2">{movie.title}</h2>
                
                <div className="flex flex-wrap text-sm text-gray-400 mb-3">
                  <div className="flex items-center mr-4 mb-2">
                    <Film size={14} className="mr-1" />
                    <span>{movie.genre.join(', ')}</span>
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <Clock size={14} className="mr-1" />
                    <span>{movie.duration}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center mb-2">
                  <div className="flex items-center mr-6 mb-2">
                    <Calendar size={16} className="text-[#ffd700] mr-2" />
                    <span className="text-white">{new Date(showtime.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center mr-6 mb-2">
                    <Clock size={16} className="text-[#ffd700] mr-2" />
                    <span className="text-white">{showtime.time}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <MapPin size={16} className="text-[#ffd700] mr-2" />
                    <span className="text-white">{showtime.theater}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Seat Selection Section */}
        <div className="bg-[#0f1923] rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Choose Your Seats</h2>
          
          <SeatGrid seats={availableSeats} />
        </div>
        
        {/* Summary and Next Step */}
        <div className="bg-[#0f1923] rounded-lg p-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Your Selection</h3>
              {selectedSeats.length > 0 ? (
                <div>
                  <p className="text-gray-300 mb-1">
                    Seats: {selectedSeats.map(seat => seat.id).join(', ')}
                  </p>
                  <p className="text-lg font-bold text-[#ffd700]">
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-gray-400">No seats selected</p>
              )}
            </div>
            
            <button 
              className={`mt-4 md:mt-0 flex items-center px-6 py-3 rounded font-bold transition-colors ${
                selectedSeats.length > 0 
                  ? 'bg-[#e63946] text-white hover:bg-opacity-90' 
                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }`}
              onClick={handleContinue}
              disabled={selectedSeats.length === 0}
            >
              Continue
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSeatsPage;