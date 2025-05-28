"use client";
import React from "react";
import { BookingProvider } from "./bookings.context";

interface ProvidersProps {
  children: React.ReactNode;
}

// Wrap Children with Providers
const ContextProviders = ({ children }: ProvidersProps) => {
  return (
    <>
      <BookingProvider>{children}</BookingProvider>
    </>
  );
};

export default ContextProviders;
