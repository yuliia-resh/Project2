import { BrowserRouter, Route, Switch } from "react-router-dom";

import Appointments from "../components/Appointments";
import AppointmentDetails from "../components/Appointments/AppointmentDetails";
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
              <Appointments />
            </Route>

            <PrivateRoute path={`/appointments/:id/edit`} exact={true}>
              <AppointemntForm setModalVisible={() => {}} />
            </PrivateRoute>

            <PrivateRoute path={`/appointments/:id`} exact={true}>
              <AppointmentDetails />
            </PrivateRoute>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
