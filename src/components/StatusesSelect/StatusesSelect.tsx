import { Select } from "antd";
import { statusesSelect } from "../../constants/select";

const { Option } = Select;

function StatusesSelect() {
  return (
    <Select defaultValue="Select status" style={{ width: 200 }} bordered={true}>
      {statusesSelect.map((status) => {
        return <Option value={status}>{status}</Option>;
      })}
    </Select>
  );
}

export default StatusesSelect;
