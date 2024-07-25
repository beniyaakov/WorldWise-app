import React from "react";
import { createContext, useEffect, useContext, useReducer, useCallback } from "react";
import reducer, { initialState } from "../hooks/reducer";

const BASE_URL = "http://localhost:3000";

export type ApiType = {
  id: string;
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
};

export type CurrentCityType = {
  cityName: string;
  emoji: string;
  date: string;
  notes: string;
  id: string;
};

type CitiesContextType = {
  cities: ApiType[] | undefined;
  isLoading: boolean;
  currentCity: CurrentCityType | undefined;
  getCity: (id: string) => void;
  createCity: (newCity: ApiType) => void;
  deleteCity: (id: string) => void;
  error:string
};

type CitiesContextsProps = {
  children: React.ReactNode;
};

const CitiesContext = createContext<CitiesContextType | null>(null);

export default function CitiesContexts({ children }: CitiesContextsProps) {
  const [{ cities, isLoading, currentCity,error }, dispatch] = useReducer(reducer,initialState);


  useEffect(() => {
    async function fetchCities(): Promise<void | Error> {
      dispatch({ type: "loading"});
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("error problem, 500");

        const data = await res.json();
        if (!data || data.length === 0) {
          throw new Error("No data found for the city");
        }

        dispatch({ type: "cities/loaded", payload: data });

        // setCities(data);
      } catch (error) {
        dispatch({ type: "rejected", payload: "there was an error loading the cities" });
        console.log(error);
      } 
    }

    fetchCities();
  }, []);

  const getCity = useCallback( async function getCity(id: string): Promise<void | Error> {
    if(id === String(currentCity.id)) return

    dispatch({ type: "loading"});
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error("error problem, 500");

      const data = await res.json();
      if (!data || data.length === 0) {
        throw new Error("No data found for the city");
      }

      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "there was an error loading the city" });

    } 
  },[currentCity.id])

  async function createCity(newCity: ApiType): Promise<void | Error> {
    dispatch({ type: "loading"});
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("error problem, 500");

      const data = await res.json();
      if (!data || data.length === 0) {
        throw new Error("No data found for the city");
      }

      dispatch({ type: "city/created",payload:data});
    } catch (error) {
      console.error("Error create the city data:", error);
      dispatch({ type: "rejected", payload: "there was an error created the city" });
    } 
  }

  async function deleteCity(id: string) {
    dispatch({ type: "loading"});
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted",payload:id});
    } catch (error) {
      console.error("Error delete city", error);
      dispatch({ type: "rejected", payload: "there was an error deleted the city" });
    } 
  }

  const values: CitiesContextType = {
    cities,
    isLoading,
    currentCity,
    error,
    getCity,
    createCity,
    deleteCity,
  };

  if (!CitiesContext) {
    throw new Error("wrong on context");
  }

  return (
    <CitiesContext.Provider value={values}>{children}</CitiesContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error(" wrong use, context is used outside the provider ");
  }
  return context;
}
