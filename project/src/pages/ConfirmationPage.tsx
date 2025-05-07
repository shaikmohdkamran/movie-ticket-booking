import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Calendar, Clock, MapPin, Users, Ticket, Share2, Home } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, resetBooking, completeBooking } = useBooking();
  const { movie, showtime, selectedSeats, userDetails, paymentDetails, bookingId } = state;
  
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Redirect if essential booking information is missing
    if (!movie || !showtime || !selectedSeats.length || !userDetails || !paymentDetails) {
      navigate('/');
      return;
    }
    
    // Generate booking ID if not already done
    if (!bookingId) {
      completeBooking();
    }

    // Add confetti animation
    const confettiAnimation = () => {
      // Simulated confetti animation - in a real implementation, you would use a library
      console.log('Confetti animation would play here');
    };
    
    confettiAnimation();
    
    // If we made it to the confirmation page, transaction is successful
  }, [movie, showtime, selectedSeats, userDetails, paymentDetails, bookingId, navigate, completeBooking]);

  const handleStartOver = () => {
    resetBooking();
    navigate('/');
  };

  const handleDownloadTicket = () => {
    // In a real implementation, this would generate a PDF or image
    alert('In a real implementation, this would download a PDF ticket');
  };

  const formatDateTime = (date: string, time: string) => {
    return `${new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })} at ${time}`;
  };

  if (!movie || !showtime || !userDetails || !bookingId) {
    return (
      <div className="min-h-screen bg-[#0a1118] text-white flex items-center justify-center pt-16">
        <p>Loading confirmation...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1118] pt-16 pb-12">
      <div className="container mx-auto px-4">
        {/* Success Message */}
        <div className="text-center mb-8 mt-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 bg-opacity-20 rounded-full mb-4">
            <CheckCircle size={36} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-gray-300">
            Your tickets have been booked successfully. Confirmation details have been sent to your email.
          </p>
        </div>
        
        {/* Ticket Preview */}
        <div className="max-w-2xl mx-auto mb-8 relative">
          <div 
            ref={ticketRef}
            className="bg-gradient-to-r from-[#1a2a3a] to-[#2a3f55] rounded-lg overflow-hidden shadow-xl"
          >
            {/* Ticket Header */}
            <div className="bg-[#0f1923] p-6 text-center border-b border-gray-700">
              <div className="flex items-center justify-center mb-2">
                <Ticket className="text-[#ffd700] mr-2" size={24} />
                <h2 className="text-2xl font-bold text-white">CineTickets</h2>
              </div>
              <p className="text-gray-400">Booking ID: {bookingId}</p>
            </div>
            
            {/* Ticket Body */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                  <img 
                    src={movie.imageUrl} 
                    alt={movie.title} 
                    className="w-full h-auto rounded-md shadow-lg"
                  />
                </div>
                
                <div className="md:w-2/3 md:pl-4">
                  <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <Calendar size={18} className="text-[#ffd700] mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">
                        {formatDateTime(showtime.date, showtime.time)}
                      </span>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin size={18} className="text-[#ffd700] mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <span className="text-white">{showtime.theater}</span>
                        <p className="text-gray-400 text-sm">123 Cinema Street, Movie City</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users size={18} className="text-[#ffd700] mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <span className="text-white">{userDetails.firstName} {userDetails.lastName}</span>
                        <p className="text-gray-400 text-sm">{userDetails.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#0f1923] p-3 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-1">Seats:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seat => (
                        <span 
                          key={seat.id}
                          className="bg-[#e63946] text-white px-3 py-1 rounded-full text-sm"
                        >
                          {seat.id}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* QR Code placeholder */}
              <div className="mt-6 flex justify-center">
                <div className="bg-white p-4 rounded">
                  <div className="w-32 h-32 bg-gray-800 flex items-center justify-center">
                    <span className="text-xs text-gray-500">QR Code Placeholder</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ticket Footer */}
            <div className="bg-[#0f1923] p-4 flex justify-between items-center border-t border-gray-700">
              <p className="text-gray-400 text-sm">Please arrive 15 minutes before showtime</p>
              <p className="text-[#ffd700] font-semibold">Enjoy the movie!</p>
            </div>
            
            {/* Ticket edge */}
            <div className="flex">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="flex-1 h-3 bg-[#0a1118]"></div>
              ))}
            </div>
          </div>
          
          {/* Decorative cut line */}
          <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#0a1118] rounded-full border-2 border-gray-700"></div>
          <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#0a1118] rounded-full border-2 border-gray-700"></div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <button 
            className="bg-[#ffd700] text-[#0a1118] px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center"
            onClick={handleDownloadTicket}
          >
            <Download size={18} className="mr-2" />
            Download Ticket
          </button>
          
          <button 
            className="bg-[#1a2a3a] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2a3f55] transition-colors flex items-center justify-center"
          >
            <Share2 size={18} className="mr-2" />
            Share
          </button>
          
          <button 
            className="bg-transparent border-2 border-[#ffd700] text-[#ffd700] px-6 py-3 rounded-lg font-bold hover:bg-[#ffd700] hover:text-[#0a1118] transition-colors flex items-center justify-center"
            onClick={handleStartOver}
          >
            <Home size={18} className="mr-2" />
            Book Another Movie
          </button>
        </div>
        
        {/* Information Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-[#0f1923] p-5 rounded-lg shadow-md">
            <h3 className="font-bold text-white mb-3 flex items-center">
              <Calendar className="text-[#ffd700] mr-2" size={20} />
              Important Information
            </h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>Please arrive 15 minutes before showtime</li>
              <li>Tickets cannot be refunded or exchanged</li>
              <li>Outside food and beverages are not allowed</li>
            </ul>
          </div>
          
          <div className="bg-[#0f1923] p-5 rounded-lg shadow-md">
            <h3 className="font-bold text-white mb-3 flex items-center">
              <MapPin className="text-[#ffd700] mr-2" size={20} />
              Getting There
            </h3>
            <p className="text-gray-300 text-sm">
              The theater is located at 123 Cinema Street, Movie City.
              Parking is available in the basement.
            </p>
          </div>
          
          <div className="bg-[#0f1923] p-5 rounded-lg shadow-md">
            <h3 className="font-bold text-white mb-3 flex items-center">
              <Users className="text-[#ffd700] mr-2" size={20} />
              Customer Support
            </h3>
            <p className="text-gray-300 text-sm">
              Need help? Contact our support team at:
              <br />
              support@cinetickets.com
              <br />
              (123) 456-7890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;