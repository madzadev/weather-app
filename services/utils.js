import { convertTime, kmToM, mpsToMph, timeToAMPM } from "./converters";

export const getWeekDay = (weatherData) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[
    new Date(
      convertTime(weatherData.dt, weatherData.timezone).input
    ).getUTCDay()
  ];
};

export const isPM = (time) => {
  let hours = time.split(":")[0];
  return hours >= 12 ? "PM" : "AM";
};

export const getWindSpeed = (systemUsed, windInMph) =>
  systemUsed == "metric" ? windInMph : mpsToMph(windInMph);

export const getVisibility = (systemUsed, visibilityInKm) =>
  systemUsed == "metric"
    ? (visibilityInKm / 1000).toPrecision(2)
    : kmToM(visibilityInKm / 1000);

export const getTime = (systemUsed, currentTime, timezone) =>
  systemUsed == "metric"
    ? `${parseInt(convertTime(currentTime, timezone)[0].split(":")[0])}:${
        convertTime(currentTime, timezone)[0].split(":")[1]
      }`
    : timeToAMPM(convertTime(currentTime, timezone)[0]);

export const getAMPM = (systemUsed, currentTime, timezone) =>
  systemUsed == "imperial" ? isPM(convertTime(currentTime, timezone)[0]) : "";
