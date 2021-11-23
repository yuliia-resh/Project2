import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import appointmentToolkitSlice from "../Reducers";

const rootReducer = combineReducers({
  appointmentReducer: appointmentToolkitSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
