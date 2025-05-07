import React from 'react';
import { Seat } from '../types';
import { useBooking } from '../context/BookingContext';

interface SeatGridProps {
  seats: Seat[];
}

const SeatGrid: React.FC<SeatGridProps> = ({ seats }) => {
  const { selectSeat, deselectSeat, state } = useBooking();
  const { selectedSeats } = state;

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'booked') return;
    
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    if (isSelected) {
      deselectSeat(seat.id);
    } else {
      selectSeat(seat);
    }
  };

  const getSeatStatus = (seat: Seat): 'available' | 'booked' | 'selected' => {
    // Check if the seat is in our selected seats
    if (selectedSeats.some(s => s.id === seat.id)) {
      return 'selected';
    }
    return seat.status;
  };

  const getSeatClassName = (status: 'available' | 'booked' | 'selected', isPremium: boolean) => {
    const baseClasses = 'flex items-center justify-center w-8 h-8 m-1 rounded-t-lg cursor-pointer transition-all';
    
    switch (status) {
      case 'available':
        return `${baseClasses} ${isPremium ? 'bg-[#2a3f55]' : 'bg-[#1a2a3a]'} hover:bg-[#3a5a7a] text-white`;
      case 'booked':
        return `${baseClasses} bg-gray-500 cursor-not-allowed opacity-50`;
      case 'selected':
        return `${baseClasses} bg-[#e63946] hover:bg-[#d62836] text-white transform scale-105`;
      default:
        return baseClasses;
    }
  };

  // Group seats by row
  const seatsByRow = seats.reduce<Record<string, Seat[]>>((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});

  // Sort rows alphabetically
  const sortedRows = Object.keys(seatsByRow).sort();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Screen */}
      <div className="relative mb-10">
        <div className="w-4/5 h-12 mx-auto bg-[#ffd700] bg-opacity-20 rounded-tl-full rounded-tr-full"></div>
        <div className="w-3/5 h-2 mx-auto bg-[#ffd700] rounded-tl-full rounded-tr-full transform -translate-y-1"></div>
        <p className="text-center text-gray-400 mt-2">SCREEN</p>
      </div>

      {/* Seat legend */}
      <div className="flex justify-center space-x-8 mb-6">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-[#1a2a3a] rounded-t-md mr-2"></div>
          <span className="text-sm text-gray-300">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-[#2a3f55] rounded-t-md mr-2"></div>
          <span className="text-sm text-gray-300">Premium</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-[#e63946] rounded-t-md mr-2"></div>
          <span className="text-sm text-gray-300">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-500 opacity-50 rounded-t-md mr-2"></div>
          <span className="text-sm text-gray-300">Booked</span>
        </div>
      </div>

      {/* Seat grid */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-max">
          {sortedRows.map(row => (
            <div key={row} className="flex items-center mb-2">
              <div className="w-8 text-center font-bold text-gray-400">{row}</div>
              <div className="flex">
                {seatsByRow[row].map(seat => {
                  const isPremium = seat.row < 'D';
                  const status = getSeatStatus(seat);
                  
                  return (
                    <div 
                      key={seat.id}
                      className={getSeatClassName(status, isPremium)}
                      onClick={() => handleSeatClick(seat)}
                      title={`${row}${seat.number} - ${isPremium ? 'Premium' : 'Standard'} - $${seat.price.toFixed(2)}`}
                    >
                      {seat.number}
                    </div>
                  );
                })}
              </div>
              <div className="w-8 text-center font-bold text-gray-400">{row}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Row labels */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>Rows A-C: Premium Seats - ${seats.find(s => s.row === 'A')?.price.toFixed(2)}</p>
        <p>Rows D-H: Standard Seats - ${seats.find(s => s.row === 'D')?.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default SeatGrid;