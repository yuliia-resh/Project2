import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Authenthication, setError } from "./redux/reducers/AppointmentSlice";

import Loading from "./components/Loading";
import Routes from "./routes";
import { useCustomSelector } from "./redux/store";

export default function App() {
  const { isLoading, authToken } = useCustomSelector(
    (state) => state.appointmentReducer
  );

  const [isLocalLoading, setLocalLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const Auth = () => {
      setLocalLoading(true);
      try {
        dispatch(Authenthication(dispatch));
      } catch (error: any) {
        dispatch(setError(error.message));
      } finally {
        setLocalLoading(false);
      }
    };
    Auth();
  }, [dispatch]);

  return (
    <>
      {isLocalLoading && isLoading && !authToken && <Loading />}
      {!isLocalLoading && !isLoading && (authToken || authToken === "") && (
        <Routes />
      )}
    </>
  );
}
