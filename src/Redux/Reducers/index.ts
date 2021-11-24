import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Appointments } from "../../types/appointmentsTypes";
// import { AppointmentsState } from "../../types/appointmentsTypes";

const initialState: any = {
  isAuth: false,
  appointments: [],
  currentAppointment: "",
  errorMessage: null,
  isLoading: false,
  currenUser: [],
};

const appointmentToolkitSlice = createSlice({
  name: "Appointments",
  initialState,
  reducers: {
    setLoading(state: any, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setAuthentication(state: any, action: PayloadAction<string>) {
      state.authentication = action.payload;
    },
    setIsAuth(state: any, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setError(state: any, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    setAppointmentList(state: any, action: PayloadAction<Array<any>>) {
      state.appointments = action.payload;
    },
    setCurrentAppointment(state, action) {
      state.currentAppointment = action.payload;
    },
    setCurrnetUser(state, action) {
      state.currenUser = action.payload;
    },
  },
});

export default appointmentToolkitSlice.reducer;

export const {
  setAuthentication,
  setAppointmentList,
  setLoading,
  setCurrentAppointment,
  setError,
  setIsAuth,
  setCurrnetUser,
} = appointmentToolkitSlice.actions;
