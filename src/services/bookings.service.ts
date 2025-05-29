import axios from "axios";
import { API_ROUTES } from "../utils/routes";

export const createAccount = async (data: {
  first_name: string;
  last_name: string;
}) => {
  const response = await axios.post(API_ROUTES.CREATE_ACCOUNT, data);
  return response.data;
};

export const getVehicleTypesByWheels = async (wheels: number) => {
  const response = await axios.get(`${API_ROUTES.VEHICLE_TYPES}${wheels}`);
  return response.data;
};

export const getVehiclesByType = async (vehicleTypeId: number) => {
  const response = await axios.get(`${API_ROUTES.VEHICLES}/${vehicleTypeId}`);
  return response.data;
};

export const bookVehicle = async (bookingPayload: any) => {
  const response = await axios.post(API_ROUTES.BOOKINGS, bookingPayload);
  return response.data;
};
