import styles from "./LogIn.module.scss";
import { Button } from "antd";
import { useCustomSelector } from "../../Redux/Store";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../Redux/Reducers";

export default function LogIn() {
  const { isAuth } = useCustomSelector((state) => state.appointmentReducer);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsAuth(!isAuth));
  };

  return (
    <div className={styles.buttonArea}>
      <Button
        type="primary"
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
