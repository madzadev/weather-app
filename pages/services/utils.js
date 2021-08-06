import { convertTime, kmToM, mpsToMph, timeToAMPM } from "./converters";

export const isPM = (time) => {
  let hours = time.split(":")[0];
  if (hours >= 12) {
    return "PM";
  } else {
    return "AM";
  }
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
