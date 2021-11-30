import { useCustomSelector } from "../Redux/Store";

export default function Accessor(props: any) {
  const { isAuth } = useCustomSelector((state) => state.appointmentReducer);
  const { children } = props;
  return <>{isAuth && { ...children }}</>;
}
