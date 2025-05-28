"use client";
import { createContext, useContext, useState } from "react";

const BookingContext = createContext<any>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({});

  const updateBooking = (data: Record<string, any>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  return (
    <BookingContext.Provider
      value={{ bookingData, updateBooking, currentStep, setCurrentStep }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
