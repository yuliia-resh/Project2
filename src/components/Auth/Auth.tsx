import { useDispatch } from "react-redux";
import { useCustomSelector } from "../../Redux/Store";
import { setIsAuth } from "../../Redux/Reducers";

import { Button } from "antd";
import styles from "./Auth.module.scss";

export default function Auth() {
  const { isAuth } = useCustomSelector((state) => state.appointmentReducer);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsAuth(!isAuth));
  };

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
