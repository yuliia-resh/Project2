import { Route, useHistory } from "react-router-dom";
import { useCustomSelector } from "./Redux/Store";

export default function PrivateRoute(props: any) {
  const { isAuth } = useCustomSelector((state) => state.appointmentReducer);
  const { children } = props;

  const history = useHistory();
  return (
    <Route path={props.path} exact={props.exact}>
      {isAuth ? { ...children } : history.replace("/")}
    </Route>
  );
}
