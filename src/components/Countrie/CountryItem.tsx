
import { ApiType } from "../../contexts/CitiesContexts";
import styles from "./CountryItem.module.css";

type CountryItemProps = {
  country : ApiType | {country: string, emoji:string }
}

function CountryItem({ country }:CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
