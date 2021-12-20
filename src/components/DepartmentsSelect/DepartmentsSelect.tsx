import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getDepartments } from "../../redux/reducers/AppointmentSlice";

import { Select } from "antd";
import styles from "./DepartmentSelect.module.scss";
import Loading from "../Loading";

const { Option } = Select;

type PropsType = {
  handleChange: (value: string) => void;
};

export default function DepartmentsSelect(props: PropsType) {
  const [isLoading, setLoading] = useState(false);

  const departmentsSelector = (state: RootState) => {
    return state.appointmentReducer.departments;
  };
  const departments = useSelector(departmentsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await dispatch(getDepartments());
      setLoading(false);
    };

    getData();
  }, [dispatch]);

  enum DepartmentsSelectEnum {
    All = "All",
  }

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <Select
          defaultValue={DepartmentsSelectEnum.All}
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
      )}
    </>
  );
}
