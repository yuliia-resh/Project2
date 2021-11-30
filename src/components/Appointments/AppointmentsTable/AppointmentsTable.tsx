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
        new Date(`${currAppointment.date} ${currAppointment.time}`).valueOf() -
        new Date(`${prevAppointment.date} ${prevAppointment.time}`).valueOf()
      );
    }
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
      title: "Time",
      dataIndex: "time",
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

  const handleClick = (id: number) => {
    history.push(`/appointments/:${id}`);
  };

  return (
    <div className={styles.table}>
      <Table
        onRow={(record: AppointmentType) => {
          return {
            onClick: () => {
              handleClick(record.id);
              dispatch(setCurrentAppointment(record));
            },
          };
        }}
        columns={columns}
        dataSource={sortedAppointments}
        rowKey="id"
      />
    </div>
  );
}
