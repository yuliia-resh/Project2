import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppointmentType, StateType } from "../../types";

const initialState: StateType = {
  appointments: [],
  errorMessage: null,
  authToken: undefined,
  departments: [],
  isLoading: false,
  statuses: [],
};

const appointmentSlice = createSlice({
  name: "Appointments",
  initialState,
  reducers: {
    setLoading(state: StateType, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state: StateType, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    setAppointmentList(
      state: StateType,
      action: PayloadAction<Array<AppointmentType>>
    ) {
      state.appointments = action.payload;
    },
    setAuthToken(state: StateType, action: PayloadAction<undefined | string>) {
      state.authToken = action.payload;
    },
    setDepartments(state: StateType, action: PayloadAction<Array<string>>) {
      state.departments = action.payload;
    },
    setStatuses(state: StateType, action: PayloadAction<Array<string>>) {
      state.statuses = action.payload;
    },
    extraReducers: (builder: any) => {
      builder.addCase(
        Authenthication.fulfilled,
        (state: StateType, action: PayloadAction<undefined | string>) => {
          state.authToken = action.payload;
        }
      );
      builder.addCase(
        Authenthication.rejected,
        (state: StateType, action: PayloadAction<string>) => {
          state.errorMessage = action.payload;
        }
      );
    },
  },
});

export const Authenthication = createAsyncThunk(
  "authenthication",
  (dispatch: any) => {
    dispatch(setLoading(true));
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "207654983612-21cfjl4km9id5l3g5ab87e8gebdthl0f.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();

          const listen = () => {
            const authToken = auth.currentUser.get().getAuthResponse().id_token;

            const isAuth = auth.isSignedIn.get();
            if (isAuth) dispatch(setAuthToken(authToken));
            else dispatch(setAuthToken(""));
          };

          if (auth.isSignedIn.get())
            dispatch(
              setAuthToken(auth.currentUser.get().getAuthResponse().id_token)
            );
          else dispatch(setAuthToken(""));

          dispatch(setLoading(false));
          auth.isSignedIn.listen(listen);
        });
    });
  }
);

export default appointmentSlice.reducer;

export const {
  setAppointmentList,
  setLoading,
  setError,
  setAuthToken,
  setDepartments,
  setStatuses,
  extraReducers,
} = appointmentSlice.actions;
