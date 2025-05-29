"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { useBooking } from "@/src/contexts/bookings.context";
import { formStep5Schema } from "@/src/validators/form.validator";
import "primereact/resources/themes/arya-blue/theme.css";
import { bookVehicle } from "@/src/services/bookings.service";

export default function FormStep5() {
  const { updateBooking, bookingData, setCurrentStep } = useBooking();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formStep5Schema),
    defaultValues: {
      dateRange: [],
    },
  });

  const dateRange = watch("dateRange");

  const onSubmit = async (data: any) => {
    const [startDate, endDate] = data.dateRange;

    const bookingPayload = {
      user_id: bookingData.user_id,
      vehicle_id: bookingData.vehicle_id,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      updateBooking(bookingPayload);
      const response = await bookVehicle(bookingPayload);
      if (response?.status === 201) {
        setCurrentStep(6);
      } else if (response?.status === 400) {
        alert(response.data.message);
      }
    } catch (error: any) {
      if (error?.status === 400) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-4 space-y-6"
    >
      <h1 className="text-2xl font-semibold mb-2 text-black">
        Select Booking Dates
      </h1>

      <div className="card flex justify-content-center">
        <Calendar
          id="dateRange"
          value={dateRange}
          onChange={(e: any) => setValue("dateRange", e.value)}
          selectionMode="range"
          minDate={new Date()}
          readOnlyInput
          inputClassName="w-full text-black"
          panelClassName="z-50"
          placeholder="Select start and end date"
        />
        {errors.dateRange && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dateRange.message as string}
          </p>
        )}
      </div>

      <Button
        label="Book"
        type="submit"
        className="w-full"
        disabled={!dateRange || dateRange.length !== 2}
      />
    </form>
  );
}
