import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useCustomSelector } from "../../Redux/Store";
import { setAppointmentList, setError, setLoading } from "../../Redux/Reducers";

import { getAppointmentsApi } from "../../api";
import AppointmentsTable from "./AppointmentsTable";
import DepartmentsSelect from "../DepartmentsSelect";
import StatusesSelect from "../StatusesSelect";

import { Button } from "antd";
import styles from "./Appointments.module.scss";
import { useTranslation } from "react-i18next";

export default function Appointments() {
  const { isAuth } = useCustomSelector((state) => state.appointmentReducer);
  const { t } = useTranslation();
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
      <p>{t("Appointments")}</p>

      <AppointmentsTable />
    </div>
  );
}
