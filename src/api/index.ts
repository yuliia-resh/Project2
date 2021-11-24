import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000"; //I cannot write like process.env.PORT because json-server and my app have different ports

export const getAppointmentsApi = () => {
  return axios.get("/appointments");
};
