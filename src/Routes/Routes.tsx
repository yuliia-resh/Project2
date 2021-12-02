import { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCustomSelector } from "../Redux/Store";
import { setCurrentAppointment } from "../Redux/Reducers";

import Appointments from "../components/Appointments";
import AppointmentDetails from "../components/Appointments/AppointmentDetails";
import AppointemntForm from "../components/Appointments/AppointmentForm";
import Auth from "../components/Auth";
import Languages from "../components/Languages";
import PrivateRoute from "../PrivateRoute";

import styles from "./Routes.module.scss";

export default function Routes() {
  const { currentAppointment } = useCustomSelector(
    (state) => state.appointmentReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (window.location.pathname === "/") dispatch(setCurrentAppointment({}));
  }, [window.location.pathname]);

  return (
    <div className={styles.contentWrapp}>
      <BrowserRouter>
        <div className={styles.leftSide}>
          <Languages />
          <Auth />
        </div>
        <div className={styles.body}>
          <Route path="/" exact>
            <Appointments />
          </Route>

          <PrivateRoute
            path={`/appointments/:${currentAppointment.id}`}
            exact={true}
          >
            <AppointmentDetails />
          </PrivateRoute>

          <PrivateRoute
            path={`/appointments/:${currentAppointment.id}/edit`}
            exact={true}
          >
            <AppointemntForm />
          </PrivateRoute>
        </div>
      </BrowserRouter>
    </div>
  );
}
