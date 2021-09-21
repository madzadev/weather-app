import { useState, useEffect } from "react";

import MainCard from "../components/MainCard";
import Dates from "../components/Dates";
import Search from "../components/Search";
import Metrics from "../components/Metrics";
import SwitchBox from "../components/SwitchBox";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

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
          <Dates weatherData={weatherData} systemUsed={systemUsed} />
          <Search
            placeHolder="Search a city..."
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
