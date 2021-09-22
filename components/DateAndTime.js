import { convertTime, timeToAMPM } from "../services/converters";
import { getWeekDay, getTime, isPM } from "../services/utils";

import styles from "./DateAndTime.module.css";

const DateAndTime = ({ weatherData, systemUsed }) => {
  return (
    <h2 className={styles.title}>
      {getWeekDay(weatherData)},{" "}
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
