import styles from "./Loading.module.scss";
import classNames from "classnames";

const loadingStyles = classNames(styles.spinnerGrow, styles.textInfo);

export default function Loading() {
  return (
    <div className={styles.loadingBlock}>
      <div className={loadingStyles}></div>
    </div>
  );
}
