import { Route } from "react-router";

import { Space, Card } from "antd";
import { useCustomSelector } from "../../../Redux/Store";

import styles from "./Appointment.module.scss";

export default function AppointmentDetails() {
  const { currentAppointment } = useCustomSelector(
    (state) => state.appointmentReducer
  );

  return (
    <div>
      <p>{`Appointment #${currentAppointment.id} Details`}</p>
      <Space direction="vertical">
        <Card title="Card" className={styles.cartInfo}>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card title="Card" className={styles.cartInfo}>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Space>
    </div>
  );
}
