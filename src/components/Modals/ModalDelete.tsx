import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "../../Redux/Reducers";
import { useCustomSelector } from "../../Redux/Store";

import { deleteAppointmentById } from "../../api";

import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";

type PropsType = {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  isModalVisible: boolean;
};

export default function ModalDelete(props: PropsType) {
  const { currentAppointment } = useCustomSelector(
    (state) => state.appointmentReducer
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const handleOk = async () => {
    try {
      dispatch(setLoading(true));
      await deleteAppointmentById(currentAppointment.id);
      alert("Deleted successfully!");
      history.push("/");
    } catch (error: any) {
      dispatch(setError(error.message));
      alert("Appointment didn't deleted! Something went wrong, sory(");
    } finally {
      dispatch(setLoading(false));
      props.setModalVisible(false);
    }
  };

  const handleCancel = () => {
    props.setModalVisible(false);
  };

  return (
    <Modal
      title="Delette appointment"
      visible={props.isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Are you shure you want to delete this appointment?</p>
    </Modal>
  );
}
