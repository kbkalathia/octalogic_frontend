"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useBooking } from "@/src/contexts/bookings.context";
import { formStep1Schema } from "@/src/validators/form.validator";
import { createAccount } from "@/src/services/bookings.service";

export default function Step1Form() {
  const { updateBooking, setCurrentStep } = useBooking();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(formStep1Schema),
  });

  const firstName = watch("firstName");
  const lastName = watch("lastName");

  const onSubmit = async () => {
    const response = await createAccount({
      first_name: firstName,
      last_name: lastName,
    });

    updateBooking({ user_id: response.data.id });
  };

  const isDisabled =
    !firstName || !lastName || !!errors.firstName || !!errors.lastName;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-15 space-y-4 text-black bg-white"
    >
      <h1 className="text-2xl font-semibold mb-4">First, what’s your name?</h1>
      <div>
        <label htmlFor="firstName" className="block mb-1 font-medium">
          First Name
        </label>
        <InputText
          id="firstName"
          className="w-full border-2 border-gray-600 text-black h-10 rounded-sm p-2"
          {...register("firstName")}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="lastName" className="block mb-1 font-medium">
          Last Name
        </label>
        <InputText
          id="lastName"
          className="w-full border-2 border-gray-600 text-black h-10 rounded-sm p-2"
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
        )}
      </div>
      <Button
        label="Next"
        type="submit"
        className={`w-full ${
          isDisabled ? "bg-gray-500" : "bg-blue-500"
        } text-white h-10 rounded-sm p-2`}
        severity="secondary"
        disabled={isDisabled}
        onClick={() => setCurrentStep(2)}
      />
    </form>
  );
}
