import { Dispatch, SetStateAction } from "react";
import AppointmentEdit from "../Appointments/AppointmentEdit";
import { Modal } from "antd";

type PropsType = {
  setAddModalVisible: Dispatch<SetStateAction<boolean>>;
  isAddModalVisible: boolean;
};

export default function ModalAdd(props: PropsType) {
  const handleCancel = () => {
    props.setAddModalVisible(false);
  };

  const handleOk = () => {
    alert("ok");
    props.setAddModalVisible(false);
  };
  return (
    <>
      <Modal
        title="Add appointment"
        visible={props.isAddModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AppointmentEdit />
      </Modal>
    </>
  );
}
