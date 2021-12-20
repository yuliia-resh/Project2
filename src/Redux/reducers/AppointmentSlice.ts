import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addAppointmentApi,
  deleteAppointmentByIdApi,
  getAppointmentsApi,
  getCurrentAppointmentApi,
  getDepartmentsApi,
  getStatusesApi,
  updateAppointmentApi,
} from "../../api";
import { AppointmentType, StateType } from "../../types";

const initialState: StateType = {
  appointments: [],
  errorMessage: null,
  authToken: undefined,
  departments: [],
  isLoading: false,
  statuses: [],
};

export const authenthication = createAsyncThunk(
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
            if (isAuth) {
              dispatch(setAuthToken(authToken));
            } else {
              dispatch(setAuthToken(""));
            }
          };

          if (auth.isSignedIn.get()) {
            dispatch(
              setAuthToken(auth.currentUser.get().getAuthResponse().id_token)
            );
          } else {
            dispatch(setAuthToken(""));
          }

          dispatch(setLoading(false));
          auth.isSignedIn.listen(listen);
        });
    });
  }
);

type SelectedFiltersType = {
  department: string;
  status: string;
};

export const getAppointments = createAsyncThunk(
  "getAppointments",
  async (selectedFilters: SelectedFiltersType) => {
    const { data } = await getAppointmentsApi();
    let filteredData = [];
    if (
      selectedFilters.department === "All" &&
      selectedFilters.status === "All"
    ) {
      filteredData = data;
    } else if (
      selectedFilters.department !== "All" &&
      selectedFilters.status === "All"
    ) {
      filteredData = data.filter((item: AppointmentType) => {
        return item.department === selectedFilters.department;
      });
    } else if (
      selectedFilters.department === "All" &&
      selectedFilters.status !== "All"
    ) {
      filteredData = data.filter((item: AppointmentType) => {
        return item.status === selectedFilters.status;
      });
    } else if (
      selectedFilters.department !== "All" &&
      selectedFilters.status !== "All"
    ) {
      filteredData = data.filter((item: AppointmentType) => {
        return (
          item.department === selectedFilters.department &&
          item.status === selectedFilters.status
        );
      });
    }
    return filteredData;
  }
);

export const addNewAppointment = createAsyncThunk(
  "addNewAppointment",
  async (values: AppointmentType) => {
    await addAppointmentApi({
      ...values,
      date: new Date(values.date).valueOf(),
      status: "Pending",
    });
    const { data } = await getAppointmentsApi();

    return data;
  }
);

export const getCurrentAppointment = createAsyncThunk(
  "getCurrentAppointment",
  async (id: number) => {
    const { data } = await getCurrentAppointmentApi(id);
    return data;
  }
);

export const updateAppointment = createAsyncThunk(
  "updateAppointment",
  async (appointment: AppointmentType) => {
    const { data } = await updateAppointmentApi(appointment);
    return data;
  }
);

export const deleteAppointmentById = createAsyncThunk(
  "deleteAppointment",
  async (id: number) => {
    await deleteAppointmentByIdApi(id);
  }
);

export const getDepartments = createAsyncThunk("getDepartments", async () => {
  const { data } = await getDepartmentsApi();
  return data;
});

export const getStatuses = createAsyncThunk("getStatuses", async () => {
  const { data } = await getStatusesApi();
  return data;
});

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
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      authenthication.fulfilled,
      (state: StateType, action: PayloadAction<undefined | string>) => {
        state.authToken = action.payload;
      }
    );
    builder.addCase(
      authenthication.rejected,
      (state: StateType, action: any) => {
        state.errorMessage = action.error.message;
      }
    );
    builder.addCase(
      getAppointments.fulfilled,
      (state: StateType, action: PayloadAction<AppointmentType[]>) => {
        state.appointments = action.payload;
      }
    );
    builder.addCase(
      getAppointments.rejected,
      (state: StateType, action: any) => {
        state.errorMessage = action.error.message;
      }
    );
    builder.addCase(
      getCurrentAppointment.rejected,
      (state: StateType, action: any) => {
        state.errorMessage = action.error.message;
      }
    );
    builder.addCase(
      addNewAppointment.fulfilled,
      (state: StateType, action: PayloadAction<AppointmentType[]>) => {
        state.appointments = action.payload;
      }
    );
    builder.addCase(
      addNewAppointment.rejected,
      (state: StateType, action: any) => {
        state.errorMessage = action.error.message;
      }
    );
    builder.addCase(
      updateAppointment.rejected,
      (state: StateType, action: any) => {
        state.errorMessage = action.error.message;
      }
    );
    builder.addCase(
      deleteAppointmentById.rejected,
      (state: StateType, action: any) => {
        state.errorMessage = action.error.message;
      }
    );
    builder.addCase(
      getDepartments.fulfilled,
      (state: StateType, action: PayloadAction<string[]>) => {
        state.departments = action.payload;
      }
    );
    builder.addCase(
      getDepartments.rejected,
      (state: StateType, action: any) => {
        state.errorMessage = action.error.message;
      }
    );
    builder.addCase(
      getStatuses.fulfilled,
      (state: StateType, action: PayloadAction<string[]>) => {
        state.statuses = action.payload;
      }
    );
    builder.addCase(getStatuses.rejected, (state: StateType, action: any) => {
      state.errorMessage = action.error.message;
    });
  },
});

export default appointmentSlice.reducer;

export const {
  setAppointmentList,
  setLoading,
  setError,
  setAuthToken,
  setDepartments,
  setStatuses,
} = appointmentSlice.actions;
