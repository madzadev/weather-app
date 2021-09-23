import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, systemUsed }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(weatherData)}, ${getTime(
          systemUsed,
          weatherData.dt,
          weatherData.timezone
        )} ${getAMPM(systemUsed, weatherData.dt, weatherData.timezone)}`}
      </h2>
    </div>
  );
};
