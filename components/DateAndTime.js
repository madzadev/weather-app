import { getWeekDay, getTime, getAMPM } from "../services/utils";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, systemUsed }) => {
  return (
    <h2 className={styles.title}>
      {`${getWeekDay(weatherData)}, ${getTime(
        systemUsed,
        weatherData.dt,
        weatherData.timezone
      )} ${getAMPM(systemUsed, weatherData.dt, weatherData.timezone)}`}
    </h2>
  );
};