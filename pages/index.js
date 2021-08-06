import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import MetricCard from "./components/MetricCard";

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
      "S/SE",
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

  const convertTime = (unixSeconds, timezone) => {
    const time = new Date((unixSeconds + timezone) * 1000)
      .toISOString()
      .match(/(\d{2}:\d{2})/);

    return time;
  };

  const ctoF = (c) => (c * 9) / 5 + 32;
  const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);
  const kmToM = (km) => (km / 1.609).toFixed(1);

  const timeToAMPM = (time) => {
    let hours = time.split(":")[0];
    let minutes = time.split(":")[1];
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ":" + minutes;
  };

  const isPM = (time) => {
    let hours = time.split(":")[0];
    if (hours >= 12) {
      return "PM";
    } else {
      return "AM";
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

        <div className={styles.statsBox}>
          <MetricCard
            title={"Humidity"}
            iconSrc={"/icons/025-humidity.png"}
            metric={weatherData.main.humidity}
            unit={"%"}
            styles={styles}
          />

          <MetricCard
            title={"Wind speed"}
            iconSrc={"/icons/017-wind.png"}
            metric={
              systemUsed == "metric"
                ? weatherData.wind.speed
                : mpsToMph(weatherData.wind.speed)
            }
            unit={systemUsed == "metric" ? "m/s" : "m/h"}
            styles={styles}
          />

          <MetricCard
            title={"Wind direction"}
            iconSrc={"/icons/014-compass.png"}
            metric={degToCompass(weatherData.wind.deg)}
            styles={styles}
          />

          <MetricCard
            title={"Visibility"}
            iconSrc={"/icons/binocular.png"}
            metric={
              systemUsed == "metric"
                ? (weatherData.visibility / 1000).toPrecision(2)
                : kmToM(weatherData.visibility / 1000)
            }
            unit={systemUsed == "metric" ? "km" : "miles"}
            styles={styles}
          />

          <MetricCard
            title={"Sunrise"}
            iconSrc={"/icons/040-sunrise.png"}
            metric={
              systemUsed == "metric"
                ? `${parseInt(
                    convertTime(
                      weatherData.sys.sunrise,
                      weatherData.timezone
                    )[0].split(":")[0]
                  )}:${
                    convertTime(
                      weatherData.sys.sunrise,
                      weatherData.timezone
                    )[0].split(":")[1]
                  }`
                : timeToAMPM(
                    convertTime(
                      weatherData.sys.sunrise,
                      weatherData.timezone
                    )[0]
                  )
            }
            styles={styles}
          />

          <MetricCard
            title={"Sunset"}
            iconSrc={"/icons/041-sunset.png"}
            metric={
              systemUsed == "metric"
                ? convertTime(weatherData.sys.sunset, weatherData.timezone)[0]
                : timeToAMPM(
                    convertTime(weatherData.sys.sunset, weatherData.timezone)[0]
                  )
            }
            unit={
              systemUsed == "imperial"
                ? isPM(
                    convertTime(weatherData.sys.sunset, weatherData.timezone)[0]
                  )
                : ""
            }
            styles={styles}
          />
        </div>
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
