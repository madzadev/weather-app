import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { Search } from "../components/Search";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [input, setInput] = useState("Riga");
  const [execute, setExecute] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [systemUsed, setSystemUsed] = useState("metric");

  useEffect(() => {
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
    getData();
  }, [execute]);

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
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} systemUsed={systemUsed} />
          <Search
            placeHolder="Search a city..."
            value={input}
            onFocus={(e) => {
              e.target.value = "";
              e.target.placeholder = "";
            }}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              e.keyCode === 13 && setExecute(!execute);
              e.target.placeholder = "Search a city...";
            }}
          />
        </Header>
        <MetricsBox weatherData={weatherData} systemUsed={systemUsed} />
        <UnitSwitch onClick={changeSystem} systemUsed={systemUsed} />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen errorMessage="City not found, try again!">
      <Search
        onFocus={(e) => (e.target.value = "")}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && setExecute(!execute)}
      />
    </ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
