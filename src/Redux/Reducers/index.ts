import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "../../types";

const initialState: StateType = {
  isAuth: false,
  appointments: [],
  currentAppointment: {
    id: 0,
    firstName: "",
    secondName: "",
    date: 0,
    department: "",
    status: "",
    notes: "",
    number: "",
  },
  errorMessage: null,
  isLoading: false,
  currentUser: [],
};

const appointmentToolkitSlice = createSlice({
  name: "Appointments",
  initialState,
  reducers: {
    setLoading(state: StateType, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setIsAuth(state: StateType, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setError(state: StateType, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    setAppointmentList(state: StateType, action: PayloadAction<Array<any>>) {
      state.appointments = action.payload;
    },
    setCurrentAppointment(state: StateType, action) {
      state.currentAppointment = action.payload;
    },
    setCurrentUser(state: StateType, action) {
      state.currentUser = action.payload;
    },
    extraReducers: (builder: any) => {
      builder.addCase(
        Authenthication.fulfilled,
        (state: StateType, action: any) => {
          state.isAuth = action.payload;
        }
      );
      builder.addCase(
        Authenthication.rejected,
        (state: StateType, action: any) => {
          state.errorMessage = action.payload;
        }
      );
    },
  },
});

export const Authenthication = createAsyncThunk(
  "authenthication",
  (dispatch: any) => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "207654983612-21cfjl4km9id5l3g5ab87e8gebdthl0f.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          const listen = () =>
            dispatch(
              setIsAuth(window.gapi.auth2.getAuthInstance().isSignedIn.get())
            );
          auth.isSignedIn.listen(listen);
          dispatch(setIsAuth(auth.isSignedIn.get()));
        });
    });
  }
);

export default appointmentToolkitSlice.reducer;

export const {
  setAppointmentList,
  setLoading,
  setCurrentAppointment,
  setError,
  setIsAuth,
  setCurrentUser,
  extraReducers,
} = appointmentToolkitSlice.actions;
