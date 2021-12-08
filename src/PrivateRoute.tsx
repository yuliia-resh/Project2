import { Route, Redirect } from "react-router-dom";
import { useCustomSelector } from "./redux/store";

type PropsType = {
  path: string;
  exact: boolean;
  children: any;
};

export default function PrivateRoute(props: PropsType) {
  const { authToken } = useCustomSelector((state) => state.appointmentReducer);
  const { children } = props;

  if (!authToken) return <Redirect to="/" />;

  return (
    <Route path={props.path} exact={props.exact}>
      {children}
    </Route>
  );
}
