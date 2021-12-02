import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCustomSelector } from "../../Redux/Store";
import { setAppointmentList, setError, setLoading } from "../../Redux/Reducers";

import { useTranslation } from "react-i18next";
import { getAppointmentsApi } from "../../api";
import { AppointmentType } from "../../types";

import AppointmentsTable from "./AppointmentsTable";
import DepartmentsSelect from "../DepartmentsSelect";
import ModalAdd from "../Modals/ModalAdd";
import StatusesSelect from "../StatusesSelect";
import Accessor from "../Accessor";

import { Button } from "antd";
import styles from "./Appointments.module.scss";

type SelectedFiltersType = {
  department: string;
  status: string;
};

export default function Appointments() {
  const { appointments } = useCustomSelector(
    (state) => state.appointmentReducer
  );

  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>({
    department: "All",
    status: "All",
  });
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getAppointments = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await getAppointmentsApi();
      if (
        selectedFilters.department === "All" &&
        selectedFilters.status === "All"
      ) {
        dispatch(setAppointmentList(data));
      } else if (
        selectedFilters.department !== "All" &&
        selectedFilters.status === "All"
      ) {
        dispatch(
          setAppointmentList(
            data.filter((item: AppointmentType) => {
              return item.department === selectedFilters.department;
            })
          )
        );
      } else if (
        selectedFilters.department === "All" &&
        selectedFilters.status !== "All"
      ) {
        dispatch(
          setAppointmentList(
            data.filter((item: AppointmentType) => {
              return item.status === selectedFilters.status;
            })
          )
        );
      } else if (
        selectedFilters.department !== "All" &&
        selectedFilters.status !== "All"
      ) {
        dispatch(
          setAppointmentList(
            data.filter((item: AppointmentType) => {
              return (
                item.department === selectedFilters.department &&
                item.status === selectedFilters.status
              );
            })
          )
        );
      }
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSelectDepartment = (value: string) => {
    setSelectedFilters({ ...selectedFilters, department: value });
  };

  const handleSelectStatus = (value: string) => {
    setSelectedFilters({ ...selectedFilters, status: value });
  };

  const showAddModal = () => {
    setAddModalVisible(true);
  };

  useEffect(() => {
    getAppointments();
  }, [selectedFilters, appointments]);

  return (
    <div className={styles.appointWrap}>
      <div className={styles.head}>
        <Accessor>
          <Button
            type="primary"
            shape="circle"
            size="large"
            onClick={showAddModal}
          >
            +
          </Button>
        </Accessor>

        <div className={styles.locateSelects}>
          <div>
            <p>Select department</p>
            <DepartmentsSelect handleChange={handleSelectDepartment} />
          </div>
          <div>
            <p>Select status</p>
            <StatusesSelect handleChange={handleSelectStatus} />
          </div>
        </div>
      </div>
      <p>{t("Appointments")}</p>

      <AppointmentsTable />
      <ModalAdd
        isAddModalVisible={isAddModalVisible}
        setAddModalVisible={setAddModalVisible}
      />
    </div>
  );
}
