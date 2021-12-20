import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewAppointment } from "../../redux/reducers/AppointmentSlice";

import AppointmentForm from "../Appointments/AppointmentForm";

import { Modal } from "antd";
import { AppointmentType } from "../../types";
import Loading from "../Loading";

type PropsType = {
  setAddModalVisible: Dispatch<SetStateAction<boolean>>;
  isAddModalVisible: boolean;
};

export default function NewAppointmentModal(props: PropsType) {
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleAdd = async (values: AppointmentType) => {
    setLoading(true);
    try {
      await dispatch(addNewAppointment(values));
      alert("Added successfully!");
    } catch {
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
        <Modal
          title="Add appointment"
          visible={props.isAddModalVisible}
          footer={null}
        >
          <AppointmentForm
            setModalVisible={props.setAddModalVisible}
            handleAddSubmit={handleAdd}
          />
        </Modal>
      )}
    </>
  );
}
