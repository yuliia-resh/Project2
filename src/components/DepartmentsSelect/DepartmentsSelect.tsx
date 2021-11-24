import { useState } from "react";

import { departmentsSelect } from "../../constants/select";
import { Select } from "antd";
import styles from "./DepartmentSelect.module.scss";

const { Option } = Select;

function DepartmentsSelect() {
  return (
    <Select
      defaultValue="Select department"
      className={styles.departments}
      bordered={true} //cannot write just border. It can be only brodered with boolean value
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
