import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import appointmentSlice from "../reducers/AppointmentSlice";

const rootReducer = combineReducers({
  appointmentReducer: appointmentSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
