import { useState, useEffect } from "react";
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
    console.log(data);
    setWeatherData({ ...data });
    setInput("");
  };

  const something = (event) => {
    if (event.keyCode === 13) {
      clickHandler();
    }
  };

  return (
    <div className={styles.wrapper}>
      {weatherData && (
        <>
          <h1 className={styles.locationTitle}>
            {weatherData.name}, {weatherData.sys.country}
          </h1>
          <p className={styles.weatherDescription}>
            {weatherData.weather[0].description}
          </p>
          <Image
            alt="weatherIcon"
            src={`/icons/${weatherData.weather[0].icon}.svg`}
            height="300px"
            width="300px"
          />

          <h1 className={styles.mainTemp}>
            {Math.round(weatherData.main.temp)}°
          </h1>
          <p>Feels like {Math.round(weatherData.main.feels_like)}°</p>
          <p>Humidity: {weatherData.main.humidity}</p>
          <p>Wind: {weatherData.wind.speed}</p>
        </>
      )}
      <input
        type="text"
        className={styles.searchInput}
        defaultValue="Search a cities..."
        value={input}
        onFocus={(e) => (e.target.value = "")}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => something(e)}
      />
    </div>
  );
}
