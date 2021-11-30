import { departmentsSelect } from "../../constants/select";

import { Select } from "antd";
import styles from "./DepartmentSelect.module.scss";

const { Option } = Select;

type PropsType = {
  handleChange: (value: string) => void;
};

function DepartmentsSelect(props: PropsType) {
  return (
    <Select
      defaultValue="All"
      className={styles.departments}
      bordered
      onChange={props.handleChange}
    >
      {departmentsSelect.map((dep, index) => {
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
