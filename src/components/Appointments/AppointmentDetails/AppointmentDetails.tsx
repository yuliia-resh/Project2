import { Route } from "react-router";

import { Space, Card } from "antd";
import { useCustomSelector } from "../../../Redux/Store";

export default function AppointmentDetails() {
  const { currentAppointment } = useCustomSelector(
    (state) => state.appointmentReducer
  );

  return (
    <Route path={`/appointments/${currentAppointment.id}`}>
      <div>
        <p>{`Appointment #${currentAppointment.id} Details`}</p>
        <Space direction="vertical">
          <Card title="Card" style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card title="Card" style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Space>
      </div>
    </Route>
  );
}
