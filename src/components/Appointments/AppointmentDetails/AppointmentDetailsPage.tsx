import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getCurrentAppointment,
  updateAppointment,
} from "../../../redux/reducers/AppointmentSlice";

import { AppointmentType } from "../../../types";

import { convertPhoneNumber } from "../../../utils/convertPhoneNumber";
import StatusesSelect from "../../StatusesSelect";
import ModalDelete from "../../Modals/ModalDelete";
import Loading from "../../Loading";

import { Space, Card, Button } from "antd";
import styles from "./AppointmentDetails.module.scss";
import dayjs from "dayjs";

export default function AppointmentDetailsPage() {
  const [isLoading, setLoading] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState<any>();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [convertedPhoneNumber, setConvertedPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const action: any = await dispatch(getCurrentAppointment(+params.id));
        setCurrentAppointment({
          ...action.payload,
          date: dayjs(action.payload.date).format("DD.MM.YYYY hh:mm:ss"),
        });
        setConvertedPhoneNumber(convertPhoneNumber(action.payload.number));
      } catch {
        alert("Something went wrong (");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [dispatch, params.id]);

  const handleStatusChange = async (value: string) => {
    const updatedAppointment: AppointmentType = {
      ...currentAppointment,
      status: value,
    };

    try {
      setLoading(true);
      await dispatch(updateAppointment(updatedAppointment));
      setCurrentAppointment(updatedAppointment);
      alert("Status changed succesfully!");
    } catch {
      alert("Status wasn't changed! Something went wrong, sory(");
    } finally {
      setLoading(false);
    }
  };

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div className={styles.options}>
            <StatusesSelect
              handleChange={handleStatusChange}
              currentStatus={currentAppointment?.status}
            />
            <NavLink to={`/appointments/${currentAppointment?.id}/edit`}>
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
          >{`Appointment #${currentAppointment?.id} Details`}</p>
          <Space direction="horizontal">
            <Card title="General information" className={styles.cartInfo}>
              <p>Appointment date: {currentAppointment?.date}</p>
              <p>Department: {currentAppointment?.department}</p>
              <p>Notes: {currentAppointment?.notes}</p>
            </Card>
            <Card title="Contact information" className={styles.cartInfo}>
              <p>
                Patien full name: {currentAppointment?.firstName}{" "}
                {currentAppointment?.secondName}
              </p>
              <p>Contact number: {convertedPhoneNumber}</p>
            </Card>
            <ModalDelete
              isModalVisible={isDeleteModalVisible}
              setModalVisible={setDeleteModalVisible}
            />
          </Space>
        </>
      )}
    </>
  );
}
