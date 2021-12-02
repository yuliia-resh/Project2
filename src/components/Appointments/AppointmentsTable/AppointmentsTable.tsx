import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCustomSelector } from "../../../Redux/Store";
import { setCurrentAppointment } from "../../../Redux/Reducers";

import { AppointmentType } from "../../../types";

import { Table } from "antd";
import styles from "./AppointmentsTable.module.scss";

export default function AppointmentsTable() {
  const { appointments } = useCustomSelector(
    (state) => state.appointmentReducer
  );

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

  const dispatch = useDispatch();

  const columns = [
    {
      title: "First name",
      dataIndex: "firstName",
      render: (text: string) => <a>{text}</a>,
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

  const history = useHistory();

  const handleClick = (record: AppointmentType) => {
    history.push(`/appointments/:${record.id}`);

    const currentAppointment = appointments.find(
      (appointment: AppointmentType) => {
        return appointment.id === record.id;
      }
    );
    dispatch(setCurrentAppointment(currentAppointment));
  };

  return (
    <div className={styles.table}>
      <Table
        onRow={(record: AppointmentType) => {
          return {
            onClick: () => {
              handleClick(record);
            },
          };
        }}
        columns={columns}
        dataSource={resultAppointments}
        rowKey="id"
      />
    </div>
  );
}
