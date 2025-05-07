import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import BookingForm from '../components/BookingForm';
import PaymentForm from '../components/PaymentForm';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, totalPrice } = useBooking();
  const { movie, showtime, selectedSeats, userDetails, paymentDetails } = state;
  
  const [step, setStep] = useState<'details' | 'payment'>(
    userDetails ? 'payment' : 'details'
  );
  
  useEffect(() => {
    // Redirect if no movie, showtime or seats are selected
    if (!movie || !showtime || selectedSeats.length === 0) {
      navigate('/');
    }
  }, [movie, showtime, selectedSeats, navigate]);
  
  useEffect(() => {
    // Move to payment step when user details are completed
    if (userDetails && step === 'details') {
      setStep('payment');
    }
  }, [userDetails, step]);
  
  useEffect(() => {
    // Proceed to confirmation when payment is completed
    if (paymentDetails) {
      navigate('/confirmation');
    }
  }, [paymentDetails, navigate]);
  
  const handleBackToSeats = () => {
    navigate('/select-seats');
  };
  
  const handleBackToDetails = () => {
    setStep('details');
  };
  
  if (!movie || !showtime || selectedSeats.length === 0) {
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
            onClick={step === 'details' ? handleBackToSeats : handleBackToDetails}
            className="text-gray-400 hover:text-white flex items-center mb-4"
          >
            <ArrowLeft size={18} className="mr-1" />
            {step === 'details' ? 'Back to Seats' : 'Back to Details'}
          </button>
          
          <h1 className="text-3xl font-bold text-white mb-6">Checkout</h1>
          
          {/* Steps indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e63946] text-white">
                1
              </div>
              <div className="ml-2 text-white">Seats</div>
            </div>
            
            <div className="w-12 h-1 mx-2 bg-gray-700">
              <div className="h-full bg-[#e63946]"></div>
            </div>
            
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 'details' || step === 'payment' ? 'bg-[#e63946] text-white' : 'bg-gray-700 text-gray-300'
              }`}>
                2
              </div>
              <div className={`ml-2 ${
                step === 'details' || step === 'payment' ? 'text-white' : 'text-gray-400'
              }`}>Details</div>
            </div>
            
            <div className="w-12 h-1 mx-2 bg-gray-700">
              <div className={`h-full ${step === 'payment' ? 'bg-[#e63946]' : 'bg-gray-700'}`}></div>
            </div>
            
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 'payment' ? 'bg-[#e63946] text-white' : 'bg-gray-700 text-gray-300'
              }`}>
                3
              </div>
              <div className={`ml-2 ${step === 'payment' ? 'text-white' : 'text-gray-400'}`}>Payment</div>
            </div>
            
            <div className="w-12 h-1 mx-2 bg-gray-700"></div>
            
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-gray-300">
                4
              </div>
              <div className="ml-2 text-gray-400">Confirmation</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'details' && (
              <BookingForm />
            )}
            
            {step === 'payment' && (
              <PaymentForm />
            )}
          </div>
          
          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f1923] rounded-lg p-6 shadow-lg sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-gray-700">
                Booking Summary
              </h3>
              
              <div className="mb-6">
                <div className="flex mb-4">
                  <img 
                    src={movie.imageUrl} 
                    alt={movie.title} 
                    className="w-24 h-36 object-cover rounded mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{movie.title}</h4>
                    <p className="text-gray-400 text-sm mb-1">{movie.rating} • {movie.duration}</p>
                    <p className="text-gray-400 text-sm mb-1">{showtime.theater}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(showtime.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {showtime.time}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="font-semibold text-white mb-2">Selected Seats</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSeats.map(seat => (
                      <span key={seat.id} className="bg-[#1a2a3a] text-white px-2 py-1 rounded text-sm">
                        {seat.id}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between text-gray-300 mb-2">
                  <span>Tickets ({selectedSeats.length})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300 mb-2">
                  <span>Booking Fee</span>
                  <span>$1.50</span>
                </div>
                
                <div className="border-t border-gray-700 my-3 pt-3">
                  <div className="flex justify-between font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-[#ffd700]">${(totalPrice + 1.50).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {step === 'details' && userDetails && (
                <div className="mt-6">
                  <button 
                    className="w-full flex items-center justify-center bg-[#e63946] text-white py-3 rounded font-bold hover:bg-opacity-90 transition-colors"
                    onClick={() => setStep('payment')}
                  >
                    <CheckCircle size={18} className="mr-2" />
                    Proceed to Payment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;