import { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { AppointmentType } from "../../../types";

import { Table } from "antd";
import styles from "./AppointmentsTable.module.scss";
import dayjs from "dayjs";

export default function AppointmentsTable() {
  const appointmentsSelector = (state: RootState) => {
    return state.appointmentReducer.appointments;
  };
  const appointments = useSelector(appointmentsSelector);

  const history = useHistory();

  const appointmentsForSort = [...appointments];
  const sortedAppointments = appointmentsForSort.sort(
    (prevAppointment: AppointmentType, currAppointment: AppointmentType) => {
      return (
        (currAppointment.date as number) - (prevAppointment.date as number)
      );
    }
  );

  const resultAppointments = useMemo(() => {
    return sortedAppointments.map((appointment: AppointmentType) => {
      return {
        ...appointment,
        date: dayjs(appointment.date).format("DD.MM.YYYY HH:MM"),
      };
    }, []);
  }, [sortedAppointments]);

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

  const handleRowClick = useCallback(
    (recordId: number) => {
      history.push(`/appointments/${recordId}`);
    },
    [history]
  );

  return (
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
  );
}
