import { useGlobalContext } from "../../contexts/CitiesContexts";
import Spinner from "../../ui/Spinners/Spinner";
import Message from "../Message/Message";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";


export default function CityList() {
  const { isLoading, cities } = useGlobalContext();

  if (isLoading) return <Spinner />;

  if (!cities?.length)
    return (
      <Message message="Add your first city by clicking a city on the map " />
    );

  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => {
        return <CityItem city={city} key={city.id} />;
      })}
    </ul>
  );
}
