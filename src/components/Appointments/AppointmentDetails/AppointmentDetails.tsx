import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setError } from "../../../redux/reducers/AppointmentSlice";

import { getCurrentAppointmentApi, updateAppointmentApi } from "../../../api";
import { convertPhoneNumber } from "../../../utils/convertPhoneNumber";
import StatusesSelect from "../../StatusesSelect";
import ModalDelete from "../../Modals/ModalDelete";
import Loading from "../../Loading";

import { Space, Card, Button } from "antd";
import styles from "./AppointmentDetails.module.scss";

export default function AppointmentDetails() {
  const [isLoading, setLoading] = useState(false);

  const [currentAppointment, setCurrentAppointment] = useState<any>();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [convertedPhoneNumber, setConvertedPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();

  const handleStatusChange = async (value: string) => {
    const updatedAppointment: any = { ...currentAppointment, status: value };

    try {
      setLoading(true);
      await updateAppointmentApi(updatedAppointment);
      setCurrentAppointment(updatedAppointment);
      alert("Status changed succesfully!");
    } catch (error: any) {
      dispatch(setError(error.message));
      alert("Status wasn't changed! Something went wrong, sory(");
    } finally {
      setLoading(false);
    }
  };

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  useEffect(() => {
    const getCurrentAppointment = async () => {
      setLoading(true);
      try {
        const { data } = await getCurrentAppointmentApi(+params.id);
        setCurrentAppointment(data);
        setConvertedPhoneNumber(convertPhoneNumber(data.number));
      } catch (error: any) {
        dispatch(setError(error.message));
      } finally {
        setLoading(false);
      }
    };

    getCurrentAppointment();
  }, [dispatch, params.id]);

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
              <p>
                Appointment date:{" "}
                {new Date(currentAppointment?.date).toLocaleString()}
              </p>
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
