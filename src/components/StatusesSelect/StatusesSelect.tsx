import { statusesSelect } from "../../constants/select";
import { Select } from "antd";
import styles from "./StatusesSelect.module.scss";

const { Option } = Select;

function StatusesSelect(props: any) {
  return (
    <Select
      defaultValue={props.currentStatus || "All"}
      className={styles.statuses}
      bordered
      onChange={props.handleChange}
    >
      {statusesSelect.map((status, index) => {
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
