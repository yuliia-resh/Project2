import { useHistory } from "react-router-dom";
import { useCustomSelector } from "../../../redux/store";

import { AppointmentType } from "../../../types";

import { Table } from "antd";
import styles from "./AppointmentsTable.module.scss";

export default function AppointmentsTable() {
  const { appointments } = useCustomSelector(
    (state) => state.appointmentReducer
  );

  const history = useHistory();

  const appointmentsForSort = [...appointments];
  const sortedAppointments = appointmentsForSort.sort(
    (prevAppointment: AppointmentType, currAppointment: AppointmentType) => {
      return (
        (currAppointment.date as number) - (prevAppointment.date as number)
      );
    }
  );

  const resultAppointments = sortedAppointments.map(
    (appointment: AppointmentType) => {
      return {
        ...appointment,
        date: new Date(appointment.date).toLocaleString("RU-ru", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      };
    },
    []
  );

  const columns = [
    {
      title: "First name",
      dataIndex: "firstName",
      render: (text: string) => <p className={styles.firstName}>{text}</p>,
    },
    {
      title: "Second name",
      dataIndex: "secondName",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const handleRowClick = (recordId: number) => {
    history.push(`/appointments/${recordId}`);
  };

  return (
    <>
      <div className={styles.table}>
        <Table
          onRow={(record: AppointmentType) => {
            return {
              onClick: () => {
                handleRowClick(record.id);
              },
            };
          }}
          columns={columns}
          dataSource={resultAppointments}
          rowKey="id"
        />
      </div>
    </>
  );
}
