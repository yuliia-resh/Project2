import i18n from "../../translator";
import { Button } from "antd";
import styles from "./Languages.module.scss";

const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
};

export default function Languages() {
  return (
    <div className={styles.languages}>
      <Button
        shape="circle"
        size="large"
        className={styles.button}
        onClick={() => changeLanguage("ru")}
      >
        Ru
      </Button>
      <Button
        className={styles.button}
        shape="circle"
        size="large"
        onClick={() => changeLanguage("en")}
      >
        En
      </Button>
    </div>
  );
}
