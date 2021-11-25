import { statusesSelect } from "../../constants/select";
import { Select } from "antd";
import styles from "./StatusesSelect.module.scss";

const { Option } = Select;

function StatusesSelect() {
  return (
    <Select defaultValue="Select status" className={styles.statuses} bordered>
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
