// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { FormEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import BackButton from "../Button/BackButton";
import styles from "./Form.module.css";
import useUrlPosition from "../../hooks/useUrlPosition";
import Message from "../../components/Message/Message";
import Spinner from "../Spinners/Spinner";
import { useGlobalContext } from "../../contexts/CitiesContexts";

import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();
  console.log(lat);

  const { createCity, isLoading } = useGlobalContext();
  const navigate = useNavigate();

  const [isLoadingGeocoding, setisLoadingGeocoding] = useState<boolean>(false);
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState<string>("");
  const [emoji, setEmoji] = useState<string>();
  const [geoError, setGeoError] = useState<string>();

  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchCityData() {
      try {
        setisLoadingGeocoding(true);
        setGeoError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        console.log(res);
        if (!res.ok) throw new Error("fetch not working");

        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );

        if (!data) {
          throw new Error("something went wrong on fetching the data");
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(data.countryCode ? convertToEmoji(data.countryCode) : "");
      } catch (error) {
       if (error instanceof Error) {
        setGeoError(error.message);
      } else {
        setGeoError("An unknown error occurred.");
      }
      } finally {
        setisLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      id:"",
      cityName,
      country,
      emoji:emoji as string,
      date: date.toISOString(),
      notes,
      position: { lat:lat !== null ? parseFloat(lat) : 0, lng: lng !== null ? parseFloat(lng) : 0 },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="start by clinking somewhere on the map" />;

  if (geoError) return <Message message={geoError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""} `}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}

        <DatePicker
          onChange={(date: Date | null) => setDate(date)}
          selected={date}
          dateFormat={"dd/MM/yy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton></BackButton>
      </div>
    </form>
  );
}

export default Form;
