import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getDepartmentsApi = () => {
  return axios.get(`${BASE_URL}/departments`);
};

export const getStatusesApi = () => {
  return axios.get(`${BASE_URL}/statuses`);
};

export const getAppointmentsApi = () => {
  return axios.get(`${BASE_URL}/appointments`);
};
