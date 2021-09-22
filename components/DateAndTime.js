import { convertTime, timeToAMPM } from "../services/converters";
import { isPM } from "../services/utils";

import styles from "./DateAndTime.module.css";

const DateAndTime = ({ weatherData, systemUsed }) => {
  var weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <h2 className={styles.title}>
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
            convertTime(weatherData.dt, weatherData.timezone)[0].split(":")[0]
          )
        : timeToAMPM(
            convertTime(weatherData.dt, weatherData.timezone)[0]
          ).split(":")[0]}
      :00{" "}
      {systemUsed == "imperial"
        ? isPM(convertTime(weatherData.dt, weatherData.timezone)[0])
        : ""}
    </h2>
  );
};

export default DateAndTime;
