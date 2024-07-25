
import Map from "../../ui/Map/Map";
import Sidebar from "../../ui/Sidebar/Sidebar";
import User from "../../components/User/User";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
