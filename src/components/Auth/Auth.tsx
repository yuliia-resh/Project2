import { useDispatch } from "react-redux";
import { useCustomSelector } from "../../redux/store";
import { setError } from "../../redux/reducers/AppointmentSlice";

import { Button } from "antd";
import styles from "./Auth.module.scss";

declare global {
  interface Window {
    gapi: any;
  }
}

export default function Auth() {
  const { authToken } = useCustomSelector((state) => state.appointmentReducer);

  const dispatch = useDispatch();

  const onAuthClick = () => {
    try {
      authToken
        ? window.gapi.auth2.getAuthInstance().signOut()
        : window.gapi.auth2.getAuthInstance().signIn();
    } catch (error: any) {
      dispatch(setError(error.message));
      alert("Something went wrong. Sory(");
    }
  };

  return (
    <div className={styles.buttonArea}>
      <Button
        shape="round"
        size="large"
        className={styles.button}
        onClick={onAuthClick}
      >
        {authToken ? "Log out" : "Log in"}
      </Button>
    </div>
  );
}
