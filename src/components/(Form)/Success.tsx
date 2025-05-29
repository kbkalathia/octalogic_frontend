import React from "react";

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Booking Confirmed!
        </h1>
        <p className="text-gray-700 mb-6">
          Your vehicle has been successfully booked. Thank you!
        </p>
      </div>
    </div>
  );
};

export default Success;
