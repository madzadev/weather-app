import { useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  const [input, setInput] = useState();
  const [weatherData, setWeatherData] = useState();

  const clickHandler = async () => {
    const res = await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setWeatherData({ ...data });
    console.log(data);
  };

  return (
    <div className={styles.wrapper}>
      {/* <h1>My weather app {input}</h1> */}

      {weatherData && (
        <>
          <h1>
            {weatherData.name}, {weatherData.sys.country}
          </h1>
          <p>{weatherData.weather[0].description}</p>
          <Image
            alt="weatherIcon"
            src={`/icons/002-sunny.svg`}
            height="300px"
            width="300px"
          />

          <h1 className={styles.mainTemp}>
            {Math.round(weatherData.main.temp)}°
          </h1>
          <p>Feels like {Math.round(weatherData.main.feels_like)}°</p>
        </>
      )}
      <input
        className={styles.search}
        defaultValue="Search city"
        type="text"
        onFocus={(e) => (e.target.value = "")}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={clickHandler}>Search</button>
    </div>
  );
}
