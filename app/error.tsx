"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-white text-2xl font-semibold">
        Something went wrong!
      </h2>
      <p className="text-gray-700">{error.message}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
