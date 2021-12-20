import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getStatuses } from "../../redux/reducers/AppointmentSlice";

import { Select } from "antd";
import styles from "./StatusesSelect.module.scss";
import Loading from "../Loading";

const { Option } = Select;

type PropsType = {
  currentStatus?: string;
  handleChange: (value: string) => void;
};

function StatusesSelect(props: PropsType) {
  const statusesSelector = (state: RootState) => {
    return state.appointmentReducer.statuses;
  };
  const statuses = useSelector(statusesSelector);

  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await dispatch(getStatuses());
      setLoading(false);
    };

    getData();
  }, [dispatch]);

  enum StatusesSelectEnum {
    All = "All",
  }

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <Select
          defaultValue={props.currentStatus || StatusesSelectEnum.All}
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
      )}
    </>
  );
}

export default StatusesSelect;
