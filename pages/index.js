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
      {/* <h1>My weather app {input}</h1> */}

      {weatherData && (
        <>
          <h1>
            {weatherData.name}, {weatherData.sys.country}
          </h1>
          <p>{weatherData.weather[0].description}</p>
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
        </>
      )}
      <input
        type="text"
        className={styles.searchInput}
        defaultValue="Search a city"
        value={input}
        onFocus={(e) => (e.target.value = "")}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => something(e)}
      />
      <button className={styles.searchBtn} onClick={clickHandler}>
        Search
      </button>
    </div>
  );
}
