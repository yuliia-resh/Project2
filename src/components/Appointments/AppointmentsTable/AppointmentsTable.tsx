import { useCustomSelector } from "../../../Redux/Store";
import styles from "./AppointmentsTable.module.scss";
import { Table } from "antd";
import { NavLink } from "react-router-dom";

function AppointmentsTable() {
  const { appointments } = useCustomSelector(
    (state) => state.appointmentReducer
  );

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

  const handleClick = (e: any) => {
    console.log(e);
  };

  return (
    <div className={styles.table}>
      <Table
        rowClassName={(index) => index && styles.cursor}
        onRow={(record) => {
          return {
            onClick: () => {
              console.log(record);
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

export default AppointmentsTable;
