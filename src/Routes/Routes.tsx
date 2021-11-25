import { BrowserRouter, Route } from "react-router-dom";

import Appointments from "../components/Appointments";
import AppointmentDetails from "../components/Appointments/AppointmentDetails";
import Auth from "../components/Auth";
import Languages from "../components/Languages";
import { useCustomSelector } from "../Redux/Store";

import styles from "./Routes.module.scss";

export default function Routes() {
  const { currentAppointment } = useCustomSelector(
    (state) => state.appointmentReducer
  );

  return (
    <div className={styles.contentWrapp}>
      <BrowserRouter>
        <div className={styles.leftSide}>
          <Languages />
          <Auth />
        </div>
        <Route path="/" exact>
          <Appointments />
        </Route>

        <Route path={`/appointments/${currentAppointment.id}`}>
          <AppointmentDetails />
        </Route>
      </BrowserRouter>
    </div>
  );
}
