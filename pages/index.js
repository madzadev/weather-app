import { useState, useEffect } from "react";

import MainCard from "../components/MainCard";
import Metrics from "../components/Metrics";
import SwitchBox from "../components/SwitchBox";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

import { convertTime, timeToAMPM } from "../services/converters";
import { isPM } from "../services/utils";

import styles from "../styles/Home.module.css";

const App = () => {
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

  useEffect(() => {
    getData();
  }, []);

  const enterKeydown = (e) => {
    if (e.keyCode === 13) {
      getData();
    }
  };

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
      <MainCard
        city={weatherData.name}
        country={weatherData.sys.country}
        description={weatherData.weather[0].description}
        iconName={weatherData.weather[0].icon}
        systemUsed={systemUsed}
        weatherData={weatherData}
      />

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

        <Metrics data={weatherData} systemUsed={systemUsed} />
        <SwitchBox onClick={changeSystem} systemUsed={systemUsed} />
      </div>
    </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen
      onFocus={(e) => (e.target.value = "")}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => enterKeydown(e)}
    />
  ) : (
    <LoadingScreen />
  );
};

export default App;
