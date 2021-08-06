import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Metrics from "./components/Metrics";
import { convertTime, ctoF, timeToAMPM } from "./services/converters";
import { isPM } from "./services/utils";

export default function Home() {
  const [input, setInput] = useState("Riga");
  const [systemUsed, setSystemUsed] = useState("metric");
  const [weatherData, setWeatherData] = useState();

  const getData = async () => {
    const res = await fetch("api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();

    setWeatherData({ ...data });
    setInput("");
  };

  const enterKeydown = (event) => {
    if (event.keyCode === 13) {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const changeSystem = () =>
    systemUsed == "metric"
      ? setSystemUsed("imperial")
      : setSystemUsed("metric");

  var weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
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
          {systemUsed == "metric"
            ? Math.round(weatherData.main.temp)
            : Math.round(ctoF(weatherData.main.temp))}
          °{systemUsed == "metric" ? "C" : "F"}
        </h1>
        <p>
          Feels like{" "}
          {systemUsed == "metric"
            ? Math.round(weatherData.main.feels_like)
            : Math.round(ctoF(weatherData.main.feels_like))}
          °{systemUsed == "metric" ? "C" : "F"}
        </p>
      </div>

      <div className={styles.statsWrapper}>
        <div className={styles.titleAndSearch}>
          <h2 style={{ textAlign: "left" }}>
            {
              weekday[
                new Date(
                  convertTime(weatherData.dt, weatherData.timezone).input
                ).getUTCDay()
              ]
            }
            ,{" "}
            {systemUsed == "metric"
              ? parseInt(
                  convertTime(weatherData.dt, weatherData.timezone)[0].split(
                    ":"
                  )[0]
                )
              : timeToAMPM(
                  convertTime(weatherData.dt, weatherData.timezone)[0]
                ).split(":")[0]}
            :00{" "}
            {systemUsed == "imperial"
              ? isPM(convertTime(weatherData.dt, weatherData.timezone)[0])
              : ""}
          </h2>

          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search a city..."
            value={input}
            onFocus={(e) => {
              e.target.value = "";
              e.target.placeholder = "";
            }}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              enterKeydown(e);
              e.target.placeholder = "Search a city...";
            }}
          />
        </div>

        <Metrics styles={styles} data={weatherData} systemUsed={systemUsed} />
        <div className={styles.switchBox}>
          <p
            className={styles.switch}
            style={{ color: systemUsed == "metric" ? "green" : "black" }}
            onClick={changeSystem}
          >
            Metric System
          </p>
          <p
            className={styles.switch}
            style={{ color: systemUsed == "metric" ? "black" : "green" }}
            onClick={changeSystem}
          >
            Imperial System
          </p>
        </div>
      </div>
    </div>
  ) : weatherData && weatherData.message ? (
    <div className={styles.errScr}>
      <div>
        <h1 style={{ marginBottom: "30px" }}>City not found, try again!</h1>
        <input
          type="text"
          className={styles.searchInput}
          onFocus={(e) => (e.target.value = "")}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => enterKeydown(e)}
        />
      </div>
    </div>
  ) : (
    <div className={styles.errScr}>
      <h1>Loading data...</h1>
    </div>
  );
}
