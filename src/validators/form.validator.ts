import * as yup from "yup";

export const formStep1Schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

export const formStep2Schema = yup.object().shape({
  wheels: yup.number().required("Please select number of wheels"),
});
