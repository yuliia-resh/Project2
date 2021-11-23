import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getAppointmentsApi = () => {
  return axios.get(`${BASE_URL}/appointments`);
};
