import axios from "axios";
import { AppointmentType } from "../types";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getAppointmentsApi = () => {
  return axios.get("/appointments");
};

export const deleteAppointmentById = (id: number) => {
  return axios.delete(`appointments/${id}`);
};

export const changeStatusApi = (appointment: AppointmentType) => {
  return axios.put(`appointments/${appointment.id}`, appointment);
};

export const updateAppointmentApi = (appointment: AppointmentType) => {
  return axios.put(`appointments/${appointment.id}`, appointment);
};
