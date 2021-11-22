import styles from "./AppointmentsTable.module.scss";

function AppointmentsTable() {
  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <p>Patient Name</p>
        <p>Appointment date</p>
        <p>Departament</p>
        <p>Status</p>
      </div>
    </div>
  );
}

export default AppointmentsTable;
