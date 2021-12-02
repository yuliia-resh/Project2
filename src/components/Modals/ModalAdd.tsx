import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "../../Redux/Reducers";

import { addAppointmentApi } from "../../api";
import AppointmentForm from "../Appointments/AppointmentForm";

import { Modal } from "antd";
import { AppointmentType } from "../../types";

type PropsType = {
  setAddModalVisible: Dispatch<SetStateAction<boolean>>;
  isAddModalVisible: boolean;
};

export default function ModalAdd(props: PropsType) {
  const dispatch = useDispatch();

  const handleAdd = async (values: AppointmentType) => {
    try {
      dispatch(setLoading(true));
      await addAppointmentApi({
        ...values,
        date: new Date(values.date).valueOf(),
        status: "Pending",
      });
      alert("Added successfully!");
    } catch (error: any) {
      dispatch(setError(error.message));
      alert("Something went wrong(");
    } finally {
      dispatch(setLoading(false));
      props.setAddModalVisible(false);
    }
  };

  return (
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
  );
}
