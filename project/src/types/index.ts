export interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  genre: string[];
  duration: string;
  rating: string;
  description: string;
  releaseDate: string;
  director: string;
  cast: string[];
  showtimes: Showtime[];
}

export interface Showtime {
  id: number;
  date: string;
  time: string;
  theater: string;
  price: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'booked' | 'selected';
  price: number;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

export interface BookingState {
  movie: Movie | null;
  showtime: Showtime | null;
  selectedSeats: Seat[];
  userDetails: UserDetails | null;
  paymentDetails: PaymentDetails | null;
  bookingId: string | null;
}