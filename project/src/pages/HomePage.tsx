import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Ticket, Calendar, Star } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { movies } from '../data/movieData';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featuredMovies = movies.slice(0, 4);
  
  return (
    <div className="min-h-screen bg-[#0a1118]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Cinema" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1118]/80 via-[#0a1118]/70 to-[#0a1118]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Experience the Magic of Cinema
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Book your movie tickets in seconds and enjoy the best cinema experience
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => navigate('/movies')}
                className="bg-[#e63946] text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors flex items-center"
              >
                <Ticket className="mr-2" size={18} />
                Book Tickets
              </button>
              <button 
                onClick={() => navigate('/coming-soon')}
                className="bg-transparent border-2 border-[#ffd700] text-[#ffd700] px-8 py-3 rounded-md font-semibold hover:bg-[#ffd700] hover:bg-opacity-10 transition-colors flex items-center"
              >
                <Calendar className="mr-2" size={18} />
                Coming Soon
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-3 h-3 bg-[#ffd700] rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        </div>
      </section>
      
      {/* Now Showing Section */}
      <section className="py-16 bg-[#0a1118]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Film className="text-[#ffd700] mr-3" size={24} />
              <h2 className="text-3xl font-bold text-white">Now Showing</h2>
            </div>
            <button 
              onClick={() => navigate('/movies')}
              className="text-[#ffd700] font-medium hover:underline"
            >
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-[#0f1923]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose CineTickets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1a2a3a] p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-[#e63946] rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Easy Booking</h3>
              <p className="text-gray-300">
                Book your tickets in just a few clicks and secure your favorite seats instantly.
              </p>
            </div>
            
            <div className="bg-[#1a2a3a] p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-[#ffd700] rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-[#1a2a3a]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Premium Experience</h3>
              <p className="text-gray-300">
                Enjoy the best seating and premium sound quality for an immersive movie experience.
              </p>
            </div>
            
            <div className="bg-[#1a2a3a] p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-[#3a5a7a] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Exclusive Offers</h3>
              <p className="text-gray-300">
                Get access to special discounts and early bookings for upcoming blockbusters.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#0a1118]">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#1a2a3a] to-[#2a3f55] rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready for your next movie adventure?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Don't miss out on the latest blockbusters. Book your tickets now for the best seats!
              </p>
              <button 
                onClick={() => navigate('/movies')}
                className="bg-[#e63946] text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors inline-flex items-center"
              >
                <Ticket className="mr-2" size={18} />
                Book Your Tickets
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;