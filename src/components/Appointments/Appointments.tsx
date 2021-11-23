import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAppointmentsApi } from "../../api";
import { setAppointmentList, setError, setLoading } from "../../Redux/Reducers";
import { useCustomSelector } from "../../Redux/Store";
import DepartmentsSelect from "../DepartmentsSelect/DepartmentsSelect";
import StatusesSelect from "../StatusesSelect/StatusesSelect";
import styles from "./Appointments.module.scss";
import AppointmentsTable from "./AppointmentsTable/AppointmentsTable";

function Appointments() {
  const { isAuth } = useCustomSelector((state) => state.appointmentReducer);

  const dispatch = useDispatch();

  const getAppointments = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await getAppointmentsApi();
      dispatch(setAppointmentList(data));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className={styles.appointWrap}>
      <div className={styles.head}>
        {isAuth && (
          <Button type="primary" shape="circle" size="large">
            +
          </Button>
        )}

        <div className={styles.locateSelects}>
          <DepartmentsSelect />
          <StatusesSelect />
        </div>
      </div>

      <p>Appointments</p>
      <AppointmentsTable />
    </div>
  );
}

export default Appointments;
