import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { PaymentDetails } from '../types';
import { CreditCard, Lock } from 'lucide-react';

const PaymentForm: React.FC = () => {
  const { setPaymentDetails, state, totalPrice } = useBooking();
  const [formData, setFormData] = useState<PaymentDetails>({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Partial<PaymentDetails>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();
      
      if (formattedValue.length > 19) {
        formattedValue = formattedValue.slice(0, 19);
      }
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(.{2})(.+)$/, '$1/$2')
        .slice(0, 5);
    }
    
    // Format CVV (numbers only)
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
    
    // Clear error when user types
    if (errors[name as keyof PaymentDetails]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentDetails> = {};
    let isValid = true;
    
    // Validate card number
    const cardNumberWithoutSpaces = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberWithoutSpaces) {
      newErrors.cardNumber = 'Card number is required';
      isValid = false;
    } else if (cardNumberWithoutSpaces.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
      isValid = false;
    }
    
    // Validate cardholder name
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
      isValid = false;
    }
    
    // Validate expiry date
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
      isValid = false;
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
        newErrors.expiryDate = 'Invalid month';
        isValid = false;
      } else if (
        parseInt(year, 10) < currentYear || 
        (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)
      ) {
        newErrors.expiryDate = 'Card expired';
        isValid = false;
      }
    }
    
    // Validate CVV
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
      isValid = false;
    } else if (formData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setPaymentDetails(formData);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-[#0f1923] p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Payment Details</h3>
      
      <div className="bg-[#1a2a3a] p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Ticket Total:</span>
          <span className="text-white font-bold">₹{totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-300">Booking Fee:</span>
          <span className="text-white">₹30.00</span>
        </div>
        <div className="border-t border-gray-600 my-3"></div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Total Amount:</span>
          <span className="text-[#ffd700] font-bold text-xl">₹{(totalPrice + 30).toFixed(2)}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-gray-300 mb-1">Card Number</label>
          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className={`w-full bg-[#1a2a3a] text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ffd700] ${
                errors.cardNumber ? 'border border-[#e63946]' : ''
              }`}
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          {errors.cardNumber && (
            <p className="text-[#e63946] text-sm mt-1">{errors.cardNumber}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="cardholderName" className="block text-gray-300 mb-1">Cardholder Name</label>
          <input
            type="text"
            id="cardholderName"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full bg-[#1a2a3a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ffd700] ${
              errors.cardholderName ? 'border border-[#e63946]' : ''
            }`}
          />
          {errors.cardholderName && (
            <p className="text-[#e63946] text-sm mt-1">{errors.cardholderName}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="expiryDate" className="block text-gray-300 mb-1">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className={`w-full bg-[#1a2a3a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ffd700] ${
                errors.expiryDate ? 'border border-[#e63946]' : ''
              }`}
            />
            {errors.expiryDate && (
              <p className="text-[#e63946] text-sm mt-1">{errors.expiryDate}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="cvv" className="block text-gray-300 mb-1">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              className={`w-full bg-[#1a2a3a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ffd700] ${
                errors.cvv ? 'border border-[#e63946]' : ''
              }`}
            />
            {errors.cvv && (
              <p className="text-[#e63946] text-sm mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-6 p-3 bg-[#1a2a3a] rounded text-sm text-gray-300">
          <Lock size={16} className="mr-2 text-[#ffd700]" />
          Your payment information is encrypted and secure
        </div>
        
        <button
          type="submit"
          className="w-full bg-[#e63946] text-white py-3 rounded font-bold hover:bg-opacity-90 transition-colors"
        >
          Pay ₹{(totalPrice + 30).toFixed(2)}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;