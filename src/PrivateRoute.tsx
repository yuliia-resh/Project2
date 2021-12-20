import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { RootState } from "./redux/store";

type PropsType = {
  path: string;
  exact: boolean;
  children: any;
};

export default function PrivateRoute(props: PropsType) {
  const authTokenSelector = (state: RootState) => {
    return state.appointmentReducer.authToken;
  };
  const authToken = useSelector(authTokenSelector);

  const { children } = props;

  if (!authToken) return <Redirect to="/" />;

  return (
    <Route path={props.path} exact={props.exact}>
      {children}
    </Route>
  );
}
