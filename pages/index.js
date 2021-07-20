import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  const [input, setInput] = useState();
  const [isCurrentActive, setIsCurrentActive] = useState(true);
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

  function degToCompass(num) {
    var val = Math.floor(num / 22.5 + 0.5);
    var arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[val % 16];
  }

  return (
    <div className={styles.wrapper}>
      {weatherData && (
        <div className={styles.weatherWrapper}>
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
          <p>
            Wind:{" "}
            {`${weatherData.wind.speed} to ${
              weatherData.wind.gust
            } ${degToCompass(weatherData.wind.deg)}`}
          </p>
          <p>
            Time:{" "}
            {new Date(
              weatherData.dt * 1000 + weatherData.timezone * 1000
            ).toLocaleString("en-US")}
          </p>
          <p>Sunrise: {weatherData.sys.sunrise}</p>
          <p>Sunstet: {weatherData.sys.sunset}</p>
        </div>
      )}
      <div className={styles.statsWrapper}>
        <h1>Stats info</h1>
        <div className={styles.statsBox}>
          <div>Stats card1</div>
          <div>Stats card2</div>
          <div>Stats card3</div>
          <div>Stats card4</div>
          <div>Stats card5</div>
          <div>Stats card6</div>
        </div>
      </div>
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
