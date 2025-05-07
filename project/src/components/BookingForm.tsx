import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { UserDetails } from '../types';
import { Check } from 'lucide-react';

const BookingForm: React.FC = () => {
  const { setUserDetails } = useBooking();
  const [formData, setFormData] = useState<UserDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<UserDetails>>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name as keyof UserDetails]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserDetails> = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    if (!agreedToTerms) {
      setTermsError('You must agree to the terms and conditions');
      isValid = false;
    } else {
      setTermsError('');
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setUserDetails(formData);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-[#0f1923] p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-300 mb-1">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full bg-[#1a2a3a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ffd700] ${
                errors.firstName ? 'border border-[#e63946]' : ''
              }`}
            />
            {errors.firstName && (
              <p className="text-[#e63946] text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-gray-300 mb-1">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full bg-[#1a2a3a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ffd700] ${
                errors.lastName ? 'border border-[#e63946]' : ''
              }`}
            />
            {errors.lastName && (
              <p className="text-[#e63946] text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-[#1a2a3a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ffd700] ${
              errors.email ? 'border border-[#e63946]' : ''
            }`}
          />
          {errors.email && (
            <p className="text-[#e63946] text-sm mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-300 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g., 123-456-7890"
            className={`w-full bg-[#1a2a3a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ffd700] ${
              errors.phone ? 'border border-[#e63946]' : ''
            }`}
          />
          {errors.phone && (
            <p className="text-[#e63946] text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        
        <div className="mb-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked);
                  if (e.target.checked) setTermsError('');
                }}
                className="w-4 h-4 bg-[#1a2a3a] accent-[#ffd700]"
              />
            </div>
            <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
              I agree to the <a href="#" className="text-[#ffd700] hover:underline">Terms of Service</a> and <a href="#" className="text-[#ffd700] hover:underline">Privacy Policy</a>
            </label>
          </div>
          {termsError && (
            <p className="text-[#e63946] text-sm mt-1">{termsError}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-[#ffd700] text-[#1a2a3a] py-3 rounded font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center"
        >
          <Check size={18} className="mr-2" />
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;