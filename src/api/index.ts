import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL; //I cannot write like process.env.PORT because json-server and my app have different ports

export const getAppointmentsApi = () => {
  return axios.get("/appointments");
};
