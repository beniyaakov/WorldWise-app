import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../contexts/CitiesContexts";
import { useEffect } from "react";
import styles from "./City.module.css";

import Spinner from "../../ui/Spinners/Spinner";
import BackButton from "../../ui/Button/BackButton";

export const formatDate = (date: string) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(d);
};

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useGlobalContext();

   useEffect(() => {
    if (id) {
      getCity(id);
    }
  }, [id,getCity]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!currentCity) {
    console.error("City data is not available.");
    return <div>City data is not available.</div>;
  }


 
  
  // const lng = searchParams.get("lng");

  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };
  // if(!currentCity) throw new Error("something went wrong with fetching")
  const { cityName, emoji, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        {/* <p>{formatDate(date)}</p> */}
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton></BackButton>
      </div>
    </div>
  );
}

export default City;
