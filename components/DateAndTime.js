import { getWeekDay, getTime, getAMPM } from "../services/utils";

export const DateAndTime = ({ weatherData, systemUsed }) => (
  <h2>
    {`${getWeekDay(weatherData)}, ${getTime(
      systemUsed,
      weatherData.dt,
      weatherData.timezone
    )} ${getAMPM(systemUsed, weatherData.dt, weatherData.timezone)}`}
  </h2>
);
