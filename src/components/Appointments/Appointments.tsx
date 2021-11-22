import styles from "./Appointments.module.scss";
import AppointmentsTable from "./AppointmentsTable/AppointmentsTable";
import LogIn from "../LogIn/LogIn";

function Appointments() {
  return (
    <div className={styles.appointWrapp}>
      <LogIn />
      <div>
        <p>Appointments</p>
        <AppointmentsTable />
      </div>
    </div>
  );
}

export default Appointments;
