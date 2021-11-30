import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCustomSelector } from "../../Redux/Store";
import { setError } from "../../Redux/Reducers";
import { Authenthication } from "../../Redux/Reducers";

import { Button } from "antd";
import styles from "./Auth.module.scss";

declare global {
  interface Window {
    gapi: any;
  }
}

export default function Auth() {
  const { isAuth } = useCustomSelector((state) => state.appointmentReducer);

  const dispatch = useDispatch();

  const handleClick = () => {
    try {
      isAuth
        ? window.gapi.auth2.getAuthInstance().signOut()
        : window.gapi.auth2.getAuthInstance().signIn();
    } catch (error: any) {
      dispatch(setError(error.message));
      alert("Something went wrong. Sory(");
    }
  };

  useEffect(() => {
    dispatch(Authenthication(dispatch));
  }, []);

  return (
    <div className={styles.buttonArea}>
      <Button
        shape="round"
        size="large"
        className={styles.button}
        onClick={handleClick}
      >
        {isAuth ? "Log out" : "Log in"}
      </Button>
    </div>
  );
}
