"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { useBooking } from "@/src/contexts/bookings.context";
import { getVehiclesByType } from "@/src/services/bookings.service";
import { formStep4Schema } from "@/src/validators/form.validator";

export default function FormStep4() {
  const { bookingData, updateBooking, setCurrentStep } = useBooking();
  const [vehicles, setVehicles] = useState<{ id: string; model: string }[]>([]);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(formStep4Schema),
  });

  const vehicle_id = watch("vehicle_id");

  const fetchVehicles = async () => {
    try {
      if (bookingData.vehicleTypeId) {
        const response = await getVehiclesByType(bookingData.vehicleTypeId);
        setVehicles(response.data);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [bookingData.vehicleTypeId]);

  const onSubmit = async (data: any) => {
    updateBooking(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-4 space-y-4 text-black bg-white"
    >
      <h1 className="text-2xl font-semibold mb-4">Select Specific Model</h1>

      <div className="flex flex-col gap-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="flex items-center gap-2">
            <RadioButton
              inputId={vehicle.id}
              name="vehicle_id"
              value={vehicle.id}
              onChange={() => setValue("vehicle_id", vehicle.id)}
              checked={vehicle_id === vehicle.id}
            />
            <label htmlFor={vehicle.id} className="text-lg">
              {vehicle.model}
            </label>
          </div>
        ))}
        {errors.vehicle_id && (
          <p className="text-red-500 text-sm">{errors.vehicle_id.message}</p>
        )}
      </div>

      <Button
        label="Next"
        type="submit"
        className={`w-full ${
          !vehicle_id ? "bg-gray-500" : "bg-blue-500"
        } text-white h-10 rounded-sm p-2`}
        disabled={!vehicle_id}
        onClick={() => setCurrentStep(5)}
      />
    </form>
  );
}
