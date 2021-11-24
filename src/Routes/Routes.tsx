import { BrowserRouter } from "react-router-dom";

import Appointments from "../components/Appointments";
import AppointmentDetails from "../components/Appointments/AppointmentDetails";
import Auth from "../components/Auth";
import Languages from "../components/Languages";

import styles from "./Routes.module.scss";

export default function Routes() {
  return (
    <div className={styles.contentWrapp}>
      <BrowserRouter>
        <div className={styles.leftSide}>
          <Languages />
          <Auth />
        </div>
        <Appointments />
        <AppointmentDetails />
      </BrowserRouter>
    </div>
  );
}
