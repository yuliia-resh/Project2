import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

export default function Accessor(props: any) {
  const authTokenSelector = (state: RootState) => {
    return state.appointmentReducer.authToken;
  };
  const authToken = useSelector(authTokenSelector);
  const { children } = props;

  return <>{authToken && props.authOnly && { ...children }}</>;
}
