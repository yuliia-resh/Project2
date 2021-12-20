import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAppointments } from "../../redux/reducers/AppointmentSlice";

import { useTranslation } from "react-i18next";

import Accessor from "../../Accessor";
import AppointmentsTable from "./AppointmentsTable";
import DepartmentsSelect from "../DepartmentsSelect";
import ModalAdd from "../Modals/NewAppointmentModal";
import StatusesSelect from "../StatusesSelect";

import { Button } from "antd";
import styles from "./Appointments.module.scss";

type SelectedFiltersType = {
  department: string;
  status: string;
};

export default function AppointmentsPage() {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFiltersType>({
    department: "All",
    status: "All",
  });
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(getAppointments(selectedFilters));
      } catch {
        alert("Something went wrong(");
      }
    };

    getData();
  }, [selectedFilters, dispatch]);

  const handleSelectDepartment = (value: string) => {
    setSelectedFilters({ ...selectedFilters, department: value });
  };

  const handleSelectStatus = (value: string) => {
    setSelectedFilters({ ...selectedFilters, status: value });
  };

  const showAddModal = () => {
    setAddModalVisible(true);
  };

  return (
    <>
      <div className={styles.appointWrap}>
        <div className={styles.head}>
          <Accessor authOnly>
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
              <StatusesSelect
                currentStatus="All"
                handleChange={handleSelectStatus}
              />
            </div>
          </div>
        </div>
        <p>{t("Appointments")}</p>

        <AppointmentsTable />
      </div>
      <ModalAdd
        isAddModalVisible={isAddModalVisible}
        setAddModalVisible={setAddModalVisible}
      />
    </>
  );
}
