import * as yup from "yup";

export const formStep1Schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

export const formStep2Schema = yup.object().shape({
  wheels: yup.number().required("Please select number of wheels"),
});

export const formStep3Schema = yup.object().shape({
  vehicleTypeId: yup.string().required("Please select a vehicle type"),
});

export const formStep4Schema = yup.object().shape({
  vehicle_id: yup.string().required("Please select a specific model"),
});

export const formStep5Schema = yup.object().shape({
  dateRange: yup
    .array()
    .of(yup.date().required())
    .length(2, "Please select a valid start and end date")
    .required("Date range is required"),
});
