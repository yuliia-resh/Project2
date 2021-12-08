import { useCustomSelector } from "./redux/store";

export default function Accessor(props: any) {
  const { authToken } = useCustomSelector((state) => state.appointmentReducer);
  const { children } = props;
  return <>{authToken && { ...children }}</>;
}
