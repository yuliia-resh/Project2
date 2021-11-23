import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Appointments } from "../../types/appointmentsTypes";
// import { AppointmentsState } from "../../types/appointmentsTypes";

const initialState: any = {
  isAuth: false,
  appointments: [],
  appointmentWithId: null,
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
    setAppointmentWithId(state, action) {
      state.appointmentWithId = action.payload;
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
  setAppointmentWithId,
  setError,
  setIsAuth,
  setCurrnetUser,
} = appointmentToolkitSlice.actions;
