import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppointmentsPage from "../components/Appointments";
import AppointmentDetailsPage from "../components/Appointments/AppointmentDetails";
import AppointemntForm from "../components/Appointments/AppointmentForm";
import Auth from "../components/Auth";
import Languages from "../components/Languages";
import PrivateRoute from "../PrivateRoute";

import styles from "./Routes.module.scss";

export default function Routes() {
  return (
    <div className={styles.contentWrapp}>
      <BrowserRouter>
        <div className={styles.leftSide}>
          <Languages />
          <Auth />
        </div>
        <div className={styles.body}>
          <Switch>
            <Route path="/" exact>
              <AppointmentsPage />
            </Route>

            <PrivateRoute path={`/appointments/:id/edit`} exact>
              <AppointemntForm setModalVisible={() => {}} />
            </PrivateRoute>

            <PrivateRoute path={`/appointments/:id`} exact>
              <AppointmentDetailsPage />
            </PrivateRoute>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
