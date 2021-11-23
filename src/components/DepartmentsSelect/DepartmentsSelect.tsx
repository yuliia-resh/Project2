import { Select } from "antd";
import { useState } from "react";
import { departmentsSelect } from "../../constants/select";

const { Option } = Select;

function DepartmentsSelect() {
  const [selectedDepartment, setSelectedDepartment] =
    useState("Select department");
  return (
    <Select
      defaultValue="Select department"
      style={{ width: 200 }}
      bordered={true}
    >
      {departmentsSelect.map((dep) => {
        return <Option value={dep}>{dep}</Option>;
      })}
    </Select>
  );
}

export default DepartmentsSelect;
