import { useHistory } from "react-router-dom";

import { useCustomSelector } from "../../../Redux/Store";

import styles from "./AppointmentsTable.module.scss";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { setCurrentAppointment } from "../../../Redux/Reducers";

export default function AppointmentsTable() {
  const { appointments } = useCustomSelector(
    (state) => state.appointmentReducer
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
  ];

  const history = useHistory();

  const handleClick = (id: number) => {
    history.push(`/appointments/${id}`);
  };

  return (
    <div className={styles.table}>
      <Table
        onRow={(record) => {
          return {
            onClick: () => {
              handleClick(record.id);
              dispatch(setCurrentAppointment(record));
            },
          };
        }}
        columns={columns}
        dataSource={appointments}
        rowKey="id"
      />
    </div>
  );
}
