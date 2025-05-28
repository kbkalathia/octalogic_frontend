"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { useBooking } from "@/src/contexts/bookings.context";
import { getVehicleTypesByWheels } from "@/src/services/bookings.service";

const schema = yup.object().shape({
  vehicleTypeId: yup.string().required("Please select a vehicle type"),
});

export default function FormStep3({ next }: { next?: () => void }) {
  const { bookingData, updateBooking } = useBooking();
  const [vehicleTypes, setVehicleTypes] = useState<
    { id: string; name: string }[]
  >([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const vehicleTypeId = watch("vehicleTypeId");

  const fetchVehicleTypes = async () => {
    try {
      if (bookingData.wheels) {
        const types = await getVehicleTypesByWheels(bookingData.wheels);
        setVehicleTypes(types);
      }
    } catch (error) {
      console.error("Failed to fetch vehicle types:", error);
    }
  };

  useEffect(() => {
    fetchVehicleTypes();
  }, [bookingData.wheels]);

  const onSubmit = (data: any) => {
    updateBooking(data);
    next && next();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-4 space-y-4 text-black bg-white"
    >
      <h1 className="text-2xl font-semibold mb-4">Type of vehicle</h1>

      <div className="flex flex-col gap-4">
        {vehicleTypes.map((type) => (
          <div key={type.id} className="flex items-center gap-2">
            <RadioButton
              inputId={type.id}
              name="vehicleTypeId"
              value={type.id}
              onChange={() => setValue("vehicleTypeId", type.id)}
              checked={vehicleTypeId === type.id}
            />
            <label htmlFor={type.id} className="text-lg">
              {type.name}
            </label>
          </div>
        ))}
        {errors.vehicleTypeId && (
          <p className="text-red-500 text-sm">{errors.vehicleTypeId.message}</p>
        )}
      </div>

      <Button
        label="Next"
        type="submit"
        className={`w-full ${
          !vehicleTypeId ? "bg-gray-500" : "bg-blue-500"
        } text-white h-10 rounded-sm p-2`}
        disabled={!vehicleTypeId}
      />
    </form>
  );
}
