import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { BookingState, Movie, Showtime, Seat, UserDetails, PaymentDetails } from '../types';

type BookingAction =
  | { type: 'SELECT_MOVIE'; payload: Movie }
  | { type: 'SELECT_SHOWTIME'; payload: Showtime }
  | { type: 'SELECT_SEAT'; payload: Seat }
  | { type: 'DESELECT_SEAT'; payload: string }
  | { type: 'SET_USER_DETAILS'; payload: UserDetails }
  | { type: 'SET_PAYMENT_DETAILS'; payload: PaymentDetails }
  | { type: 'COMPLETE_BOOKING'; payload: string }
  | { type: 'RESET_BOOKING' };

interface BookingContextType {
  state: BookingState;
  selectMovie: (movie: Movie) => void;
  selectShowtime: (showtime: Showtime) => void;
  selectSeat: (seat: Seat) => void;
  deselectSeat: (seatId: string) => void;
  setUserDetails: (details: UserDetails) => void;
  setPaymentDetails: (details: PaymentDetails) => void;
  completeBooking: () => void;
  resetBooking: () => void;
  totalPrice: number;
}

const initialState: BookingState = {
  movie: null,
  showtime: null,
  selectedSeats: [],
  userDetails: null,
  paymentDetails: null,
  bookingId: null,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case 'SELECT_MOVIE':
      return { ...state, movie: action.payload, showtime: null, selectedSeats: [] };
    case 'SELECT_SHOWTIME':
      return { ...state, showtime: action.payload, selectedSeats: [] };
    case 'SELECT_SEAT': {
      const seat = action.payload;
      // Don't select already booked seats
      if (seat.status === 'booked') return state;
      
      // Create a new seat with selected status
      const updatedSeat = { ...seat, status: 'selected' as const };
      return {
        ...state,
        selectedSeats: [...state.selectedSeats, updatedSeat],
      };
    }
    case 'DESELECT_SEAT': {
      const seatId = action.payload;
      return {
        ...state,
        selectedSeats: state.selectedSeats.filter(seat => seat.id !== seatId),
      };
    }
    case 'SET_USER_DETAILS':
      return { ...state, userDetails: action.payload };
    case 'SET_PAYMENT_DETAILS':
      return { ...state, paymentDetails: action.payload };
    case 'COMPLETE_BOOKING':
      return { ...state, bookingId: action.payload };
    case 'RESET_BOOKING':
      return initialState;
    default:
      return state;
  }
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const selectMovie = (movie: Movie) => {
    dispatch({ type: 'SELECT_MOVIE', payload: movie });
  };

  const selectShowtime = (showtime: Showtime) => {
    dispatch({ type: 'SELECT_SHOWTIME', payload: showtime });
  };

  const selectSeat = (seat: Seat) => {
    dispatch({ type: 'SELECT_SEAT', payload: seat });
  };

  const deselectSeat = (seatId: string) => {
    dispatch({ type: 'DESELECT_SEAT', payload: seatId });
  };

  const setUserDetails = (details: UserDetails) => {
    dispatch({ type: 'SET_USER_DETAILS', payload: details });
  };

  const setPaymentDetails = (details: PaymentDetails) => {
    dispatch({ type: 'SET_PAYMENT_DETAILS', payload: details });
  };

  const completeBooking = () => {
    // Generate a random booking ID
    const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase();
    dispatch({ type: 'COMPLETE_BOOKING', payload: bookingId });
  };

  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
  };

  // Calculate total price
  const totalPrice = state.selectedSeats.reduce((total, seat) => total + seat.price, 0);

  return (
    <BookingContext.Provider
      value={{
        state,
        selectMovie,
        selectShowtime,
        selectSeat,
        deselectSeat,
        setUserDetails,
        setPaymentDetails,
        completeBooking,
        resetBooking,
        totalPrice,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};