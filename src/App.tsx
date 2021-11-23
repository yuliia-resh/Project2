import styles from "./App.module.scss";
import Appointments from "./components/Appointments/Appointments";
import LogIn from "./components/LogIn/LogIn";

function App() {
  return (
    <div className={styles.contentWrapp}>
      <LogIn />
      <Appointments />
    </div>
  );
}

export default App;
