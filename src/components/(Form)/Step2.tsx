"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { useBooking } from "@/src/contexts/bookings.context";
import { formStep2Schema } from "@/src/validators/form.validator";
import { getUniqueWheels } from "@/src/services/bookings.service";

export default function FormStep2() {
  const { updateBooking, setCurrentStep } = useBooking();

  const [uniqueWheels, setUniqueWheels] = useState([]);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(formStep2Schema),
  });

  const wheels = watch("wheels");

  const onSubmit = (data: any) => {
    updateBooking(data);
  };

  const fetchUniqueWheels = async () => {
    try {
      const wheels = await getUniqueWheels();
      setUniqueWheels(wheels.data);
    } catch (error) {
      console.error("Failed to unique wheels:", error);
    }
  };

  useEffect(() => {
    fetchUniqueWheels();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-4 space-y-4 text-black bg-white"
    >
      <h1 className="text-2xl font-semibold mb-4">Number of wheels</h1>
      <div className="flex flex-col gap-4">
        {uniqueWheels.map((value) => (
          <div key={value} className="flex items-center gap-2">
            <RadioButton
              inputId={`wheels-${value}`}
              name="wheels"
              value={value}
              onChange={() => setValue("wheels", value)}
              checked={wheels === value}
            />
            <label htmlFor={`wheels-${value}`} className="text-lg">
              {value}
            </label>
          </div>
        ))}
        {errors.wheels && (
          <p className="text-red-500 text-sm">{errors.wheels.message}</p>
        )}
      </div>
      <Button
        label="Next"
        type="submit"
        className={`w-full ${
          !wheels ? "bg-gray-500" : "bg-blue-500"
        } text-white h-10 rounded-sm p-2`}
        disabled={!wheels}
        onClick={() => setCurrentStep(3)}
      />
    </form>
  );
}
