import { useHistory, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { deleteAppointmentById } from "../../redux/reducers/AppointmentSlice";

import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";

type PropsType = {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  isModalVisible: boolean;
};

export default function ModalDelete(props: PropsType) {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ id: string }>();

  const handleOk = async () => {
    try {
      await dispatch(deleteAppointmentById(+params.id));
      alert("Deleted successfully!");
      history.push("/");
    } catch {
      alert("Appointment didn't deleted! Something went wrong, sory(");
    } finally {
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
