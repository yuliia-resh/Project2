import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCustomSelector } from "../../redux/store";
import {
  setDepartments,
  setError,
} from "../../redux/reducers/AppointmentSlice";

import { getDepartmentsApi } from "../../api";

import { Select } from "antd";
import styles from "./DepartmentSelect.module.scss";

const { Option } = Select;

type PropsType = {
  handleChange: (value: string) => void;
};

function DepartmentsSelect(props: PropsType) {
  const { departments } = useCustomSelector(
    (state) => state.appointmentReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const { data } = await getDepartmentsApi();
        dispatch(setDepartments(data));
      } catch (error: any) {
        dispatch(setError(error.message));
      }
    };

    getDepartments();
  }, [dispatch]);

  return (
    <Select
      defaultValue="All"
      className={styles.departments}
      bordered
      onChange={props.handleChange}
    >
      {departments.map((dep, index) => {
        return (
          <Option key={index} value={dep}>
            {dep}
          </Option>
        );
      })}
    </Select>
  );
}

export default DepartmentsSelect;
