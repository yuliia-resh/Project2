import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenthication, setError } from "./redux/reducers/AppointmentSlice";

import Loading from "./components/Loading";
import Routes from "./routes";
import { RootState } from "./redux/store";

export default function App() {
  const authTokenSelector = (state: RootState) => {
    return state.appointmentReducer.authToken;
  };
  const authToken = useSelector(authTokenSelector);

  const [isLocalLoading, setLocalLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = () => {
      setLocalLoading(true);
      try {
        dispatch(authenthication(dispatch));
      } catch (error: any) {
        dispatch(setError(error.message));
      } finally {
        setLocalLoading(false);
      }
    };
    auth();
  }, [dispatch]);

  return (
    <>
      {isLocalLoading && !authToken && <Loading />}
      {!isLocalLoading && (authToken || authToken === "") && <Routes />}
    </>
  );
}
