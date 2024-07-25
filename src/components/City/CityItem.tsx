import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { ApiType, useGlobalContext} from "../../contexts/CitiesContexts";
import { formatDate } from "./City";
// import { formatDate } from "react-datepicker/dist/date_utils";

type CityItemProps = {
  city: ApiType | undefined;
};

export default function CityItem({ city }: CityItemProps) {
  const {currentCity,deleteCity} =useGlobalContext()
  
  if (!city) return null;
  const { emoji, cityName, date, id, position} = city;


  function handleClick(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        deleteCity(id)     
  }


  return (
    <li >
      <Link className={`${styles.cityItem} ${id === currentCity?.id ?styles["cityItem--active"]:""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.time}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
      </Link>
    </li>
  );
}
