import axios from "axios";
import { API_ROUTES } from "../utils/routes";

export const getVehicleTypesByWheels = async (wheels: number) => {
  const response = await axios.get(`${API_ROUTES.VEHICLE_TYPES}${wheels}`);
  return response.data;
};

export const getVehiclesByType = async (vehicleTypeId: number) => {
  const response = await axios.get(`${API_ROUTES.VEHICLES}/${vehicleTypeId}`);
  return response.data;
};
