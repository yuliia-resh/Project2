import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setAppointmentList,
  setError,
} from "../../redux/reducers/AppointmentSlice";

import { addAppointmentApi, getAppointmentsApi } from "../../api";
import AppointmentForm from "../Appointments/AppointmentForm";

import { Modal } from "antd";
import { AppointmentType } from "../../types";
import Loading from "../Loading";

type PropsType = {
  setAddModalVisible: Dispatch<SetStateAction<boolean>>;
  isAddModalVisible: boolean;
};

export default function ModalAdd(props: PropsType) {
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleAdd = async (values: AppointmentType) => {
    try {
      setLoading(true);
      await addAppointmentApi({
        ...values,
        date: new Date(values.date).valueOf(),
        status: "Pending",
      });
      const { data } = await getAppointmentsApi();
      dispatch(setAppointmentList(data));
      props.setAddModalVisible(false);
      alert("Added successfully!");
    } catch (error: any) {
      dispatch(setError(error.message));
      props.setAddModalVisible(false);
      alert("Something went wrong(");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Modal
            title="Add appointment"
            visible={props.isAddModalVisible}
            footer={[]}
          >
            <AppointmentForm
              setModalVisible={props.setAddModalVisible}
              handleAddSubmit={handleAdd}
            />
          </Modal>
        </>
      )}
    </>
  );
}
