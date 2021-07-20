import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  const [input, setInput] = useState("mumbai");
  const [systemUsed, setSystemUsed] = useState("metric");
  const [weatherData, setWeatherData] = useState();

  const clickHandler = async () => {
    const res = await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, systemUsed }),
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

  const convertTime = (unixSeconds, timezone) => {
    const time = new Date((unixSeconds + timezone) * 1000)
      .toISOString()
      .match(/(\d{2}:\d{2})/);

    return time;
  };

  const changeSystem = () => {
    console.log("system changed");
  };

  // console.log(convertTime(weatherData.dt, weatherData.timezone));

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
        </div>
      )}
      <div className={styles.statsWrapper}>
        <div className={styles.titleAndSearch}>
          <h2 style={{ textAlign: "left" }}>
            Today at:{" "}
            {convertTime(weatherData.dt, weatherData.timezone)[0].split(":")[0]}
            :00
          </h2>
          <input
            type="text"
            className={styles.searchInput}
            defaultValue="Search a city..."
            onFocus={(e) => (e.target.value = "")}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => something(e)}
          />
        </div>

        {weatherData && (
          <div className={styles.statsBox}>
            <div className={styles.statsCard}>
              <p>Humidity</p>
              <div className={styles.statsCardContent}>
                <Image
                  alt="weatherIcon"
                  src={`/icons/025-humidity.png`}
                  height="100px"
                  width="100px"
                />
                <div>
                  <h1>{weatherData.main.humidity}</h1>
                  <p>%</p>
                </div>
              </div>
            </div>
            <div className={styles.statsCard}>
              <p>Wind speed</p>
              <div className={styles.statsCardContent}>
                <Image
                  alt="weatherIcon"
                  src={`/icons/017-wind.png`}
                  height="100px"
                  width="100px"
                />
                <div>
                  <h1>{weatherData.wind.speed}</h1>
                  <p>m/s</p>
                </div>
              </div>
            </div>
            <div className={styles.statsCard}>
              <p>Wind direction</p>
              <div className={styles.statsCardContent}>
                <Image
                  alt="weatherIcon"
                  src={`/icons/014-compass.png`}
                  height="100px"
                  width="100px"
                />
                <div>
                  <h1>{degToCompass(weatherData.wind.deg)}</h1>
                </div>
              </div>
            </div>
            <div className={styles.statsCard}>
              <p>Visibility</p>
              <div className={styles.statsCardContent}>
                <Image
                  alt="weatherIcon"
                  src={`/icons/binocular.png`}
                  height="100px"
                  width="100px"
                />
                <div>
                  <h1>{weatherData.visibility / 1000}</h1>
                  <p>km</p>
                </div>
              </div>
            </div>
            <div className={styles.statsCard}>
              <p>Sunrise</p>
              <div className={styles.statsCardContent}>
                <Image
                  alt="weatherIcon"
                  src={`/icons/040-sunrise.png`}
                  height="100px"
                  width="100px"
                />
                <div>
                  <h1>
                    {
                      convertTime(
                        weatherData.sys.sunrise,
                        weatherData.timezone
                      )[0]
                    }
                  </h1>
                  <p>AM</p>
                </div>
              </div>
            </div>
            <div className={styles.statsCard}>
              <p>Sunset</p>
              <div className={styles.statsCardContent}>
                <Image
                  alt="weatherIcon"
                  src={`/icons/041-sunset.png`}
                  height="100px"
                  width="100px"
                />
                <div>
                  <h1>
                    {
                      convertTime(
                        weatherData.sys.sunset,
                        weatherData.timezone
                      )[0]
                    }
                  </h1>
                  <p>PM</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
