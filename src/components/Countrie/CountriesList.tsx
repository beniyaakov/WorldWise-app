
import { useGlobalContext } from "../../contexts/CitiesContexts";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "../Message/Message";
import Spinner from "../../ui/Spinners/Spinner";

// type CountriesList = { cities: ApiType[] | undefined; isLoading: boolean };

export default function CountriesList() {
  const {isLoading,cities} = useGlobalContext()
  if (isLoading) return <Spinner />;

  if (!cities?.length)
    return (
      <Message message="Add your first city by clicking a city on the map " />
    );
    

  const countries = cities.reduce<{ country: string, emoji:string }[]>((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  },[]);

  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => {
        return <CountryItem country={country} key={country.country} />;
      })}
    </ul>
  );
}
