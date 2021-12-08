import axios from "axios";
import { AppointmentType } from "../types";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getDepartmentsApi = () => {
  return axios.get("/departments");
};

export const getStatusesApi = () => {
  return axios.get("/statuses");
};

export const getAppointmentsApi = () => {
  return axios.get("appointments");
};

export const deleteAppointmentByIdApi = (id: number) => {
  return axios.delete(`/appointments/${id}`);
};

export const updateAppointmentApi = (appointment: AppointmentType) => {
  return axios.put(`/appointments/${appointment.id}`, appointment);
};

export const addAppointmentApi = (appointment: AppointmentType) => {
  return axios.post(`/appointments`, appointment);
};

export const getCurrentAppointmentApi = (appointmentId: number) => {
  return axios.get(`/appointments/${appointmentId}`);
};
