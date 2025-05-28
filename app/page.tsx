"use client";
import FormStep1 from "@/src/components/(Form)/Step1";
import FormStep2 from "@/src/components/(Form)/Step2";
import { useBooking } from "@/src/contexts/bookings.context";

export default function Home() {
  const { currentStep, setCurrentStep } = useBooking();

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <FormStep1 />
      {/* <FormStep2 /> */}
    </div>
  );
}
