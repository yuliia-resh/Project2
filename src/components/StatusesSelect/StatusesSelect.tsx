import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCustomSelector } from "../../redux/store";
import { setError, setStatuses } from "../../redux/reducers/AppointmentSlice";

import { getStatusesApi } from "../../api";

import { Select } from "antd";
import styles from "./StatusesSelect.module.scss";

const { Option } = Select;

type PropsType = {
  currentStatus?: string;
  handleChange: (value: string) => void;
};

function StatusesSelect(props: PropsType) {
  const { statuses } = useCustomSelector((state) => state.appointmentReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const getStatuses = async () => {
      try {
        const { data } = await getStatusesApi();
        dispatch(setStatuses(data));
      } catch (error: any) {
        dispatch(setError(error.message));
      }
    };

    getStatuses();
  }, [dispatch]);

  return (
    <Select
      defaultValue={props.currentStatus || "All"}
      className={styles.statuses}
      bordered
      onChange={props.handleChange}
    >
      {statuses.map((status, index) => {
        return (
          <Option key={index} value={status}>
            {status}
          </Option>
        );
      })}
    </Select>
  );
}

export default StatusesSelect;
