"use client";

import dynamic from "next/dynamic";
import { useBooking } from "@/src/contexts/bookings.context";

const FormStep1 = dynamic(() => import("@/src/components/(Form)/Step1"));
const FormStep2 = dynamic(() => import("@/src/components/(Form)/Step2"));
const FormStep3 = dynamic(() => import("@/src/components/(Form)/Step3"));
const FormStep4 = dynamic(() => import("@/src/components/(Form)/Step4"));
const FormStep5 = dynamic(() => import("@/src/components/(Form)/Step5"));
const Success = dynamic(() => import("@/src/components/(Form)/Success"));

export default function Home() {
  const { currentStep, bookingData } = useBooking();
  console.log("bookingData = ", bookingData);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormStep1 />;
      case 2:
        return <FormStep2 />;
      case 3:
        return <FormStep3 />;
      case 4:
        return <FormStep4 />;
      case 5:
        return <FormStep5 />;
      case 6:
        return <Success />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      {renderStep()}
    </div>
  );
}
