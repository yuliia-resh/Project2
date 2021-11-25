import { useDispatch } from "react-redux";
import { useCustomSelector } from "../../Redux/Store";
import { setError, setIsAuth } from "../../Redux/Reducers";

import { Button } from "antd";
import styles from "./Auth.module.scss";
import { useEffect } from "react";
import { ALPN_ENABLED } from "constants";

declare global {
  //should i move this to another file?
  interface Window {
    gapi: any;
  }
}

export default function Auth() {
  const { isAuth } = useCustomSelector((state) => state.appointmentReducer);

  const dispatch = useDispatch();

  const onAuthChange = () => {
    dispatch(setIsAuth(window.gapi.auth2.getAuthInstance().isSignedIn.get()));
  };

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
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "207654983612-21cfjl4km9id5l3g5ab87e8gebdthl0f.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          dispatch(setIsAuth(auth.isSignedIn.get()));
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  });

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
