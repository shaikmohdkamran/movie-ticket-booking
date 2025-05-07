import { Movie } from '../types';

export const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    imageUrl: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Sci-Fi", "Action", "Thriller"],
    duration: "2h 28min",
    rating: "PG-13",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseDate: "2010-07-16",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
    showtimes: [
      { id: 101, date: "2025-05-20", time: "14:30", theater: "Theater 1", price: 299 },
      { id: 102, date: "2025-05-20", time: "18:00", theater: "Theater 3", price: 349 },
      { id: 103, date: "2025-05-21", time: "15:45", theater: "Theater 2", price: 299 },
    ]
  },
  {
    id: 2,
    title: "The Dark Knight",
    imageUrl: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Action", "Crime", "Drama"],
    duration: "2h 32min",
    rating: "PG-13",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseDate: "2008-07-18",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    showtimes: [
      { id: 201, date: "2025-05-20", time: "16:15", theater: "Theater 4", price: 299 },
      { id: 202, date: "2025-05-21", time: "19:30", theater: "Theater 1", price: 349 },
      { id: 203, date: "2025-05-22", time: "20:00", theater: "Theater 2", price: 299 },
    ]
  },
  {
    id: 3,
    title: "Interstellar",
    imageUrl: "https://images.pexels.com/photos/1341279/pexels-photo-1341279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    duration: "2h 49min",
    rating: "PG-13",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseDate: "2014-11-07",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
    showtimes: [
      { id: 301, date: "2025-05-20", time: "15:00", theater: "Theater 2", price: 299 },
      { id: 302, date: "2025-05-21", time: "18:45", theater: "Theater 3", price: 349 },
      { id: 303, date: "2025-05-22", time: "21:15", theater: "Theater 1", price: 299 },
    ]
  },
  {
    id: 4,
    title: "Dune",
    imageUrl: "https://images.pexels.com/photos/1831236/pexels-photo-1831236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Action", "Adventure", "Drama"],
    duration: "2h 35min",
    rating: "PG-13",
    description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    releaseDate: "2021-10-22",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Zendaya", "Oscar Isaac"],
    showtimes: [
      { id: 401, date: "2025-05-20", time: "17:30", theater: "Theater 3", price: 299 },
      { id: 402, date: "2025-05-21", time: "20:15", theater: "Theater 4", price: 349 },
      { id: 403, date: "2025-05-22", time: "16:45", theater: "Theater 2", price: 299 },
    ]
  },
  {
    id: 5,
    title: "The Shawshank Redemption",
    imageUrl: "https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Drama"],
    duration: "2h 22min",
    rating: "R",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseDate: "1994-10-14",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    showtimes: [
      { id: 501, date: "2025-05-20", time: "13:45", theater: "Theater 1", price: 299 },
      { id: 502, date: "2025-05-21", time: "17:00", theater: "Theater 2", price: 349 },
      { id: 503, date: "2025-05-22", time: "19:45", theater: "Theater 3", price: 299 },
    ]
  }
];

export const generateSeats = (showTimeId: number): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 10;
  const seats = [];

  for (const row of rows) {
    for (let i = 1; i <= seatsPerRow; i++) {
      // Generate some random booked seats for visualization
      const randomStatus = Math.random() < 0.2 ? 'booked' : 'available';
      
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        status: randomStatus as 'available' | 'booked' | 'selected',
        price: row < 'D' ? 349 : 299, // Premium rows cost more
      });
    }
  }

  return seats;
};