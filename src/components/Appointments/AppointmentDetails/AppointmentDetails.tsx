import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCustomSelector } from "../../../Redux/Store";
import {
  setCurrentAppointment,
  setError,
  setLoading,
} from "../../../Redux/Reducers";

import { changeStatusApi } from "../../../api";
import StatusesSelect from "../../StatusesSelect";
import ModalDelete from "../../Modals/ModalDelete";

import { Space, Card, Button } from "antd";
import styles from "./AppointmentDetails.module.scss";

export default function AppointmentDetails() {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const { currentAppointment } = useCustomSelector(
    (state) => state.appointmentReducer
  );

  const dispatch = useDispatch();

  const handleStatusChange = async (value: string) => {
    const updatedAppointment = { ...currentAppointment, status: value };
    try {
      dispatch(setLoading(true));
      dispatch(setCurrentAppointment(updatedAppointment));
      await changeStatusApi(updatedAppointment);
      console.log(updatedAppointment);
      alert("Status changed succesfully!");
    } catch (error: any) {
      dispatch(setError(error.message));
      alert("Status didn't changed! Something went wrong, sory(");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  return (
    <>
      <div className={styles.options}>
        <StatusesSelect
          handleChange={handleStatusChange}
          currentStatus={currentAppointment.status}
        />
        <NavLink to={`/appointments/:${currentAppointment.id}/edit`}>
          <Button
            type="primary"
            shape="round"
            size="middle"
            className={styles.optionsLocate}
          >
            Edit
          </Button>
        </NavLink>
        <Button
          type="primary"
          shape="round"
          size="middle"
          className={styles.optionsLocate}
          onClick={showDeleteModal}
        >
          Delete
        </Button>
      </div>
      <p
        className={styles.appointmentTextSize}
      >{`Appointment #${currentAppointment.id} Details`}</p>
      <Space direction="horizontal">
        <Card title="General information" className={styles.cartInfo}>
          <p>
            Appointment date: {currentAppointment.date}{" "}
            {currentAppointment.time}
          </p>
          <p>Department: {currentAppointment.department}</p>
          <p>Notes: {currentAppointment.notes}</p>
        </Card>
        <Card title="Contact information" className={styles.cartInfo}>
          <p>
            Patien full name: {currentAppointment.firstName}{" "}
            {currentAppointment.secondName}
          </p>
          <p>Contact number: {currentAppointment.number}</p>
        </Card>
        <ModalDelete
          isModalVisible={isDeleteModalVisible}
          setModalVisible={setDeleteModalVisible}
        />
      </Space>
    </>
  );
}
