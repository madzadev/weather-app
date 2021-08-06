import React from "react";
import {
  convertTime,
  degToCompass,
  kmToM,
  mpsToMph,
  timeToAMPM,
} from "../services/converters";
import { isPM } from "../services/utils";
import MetricCard from "./MetricCard";

const Metrics = ({ styles, data, systemUsed }) => {
  return (
    <div className={styles.statsBox}>
      <MetricCard
        title={"Humidity"}
        iconSrc={"/icons/025-humidity.png"}
        metric={data.main.humidity}
        unit={"%"}
        styles={styles}
      />

      <MetricCard
        title={"Wind speed"}
        iconSrc={"/icons/017-wind.png"}
        metric={
          systemUsed == "metric" ? data.wind.speed : mpsToMph(data.wind.speed)
        }
        unit={systemUsed == "metric" ? "m/s" : "m/h"}
        styles={styles}
      />

      <MetricCard
        title={"Wind direction"}
        iconSrc={"/icons/014-compass.png"}
        metric={degToCompass(data.wind.deg)}
        styles={styles}
      />

      <MetricCard
        title={"Visibility"}
        iconSrc={"/icons/binocular.png"}
        metric={
          systemUsed == "metric"
            ? (data.visibility / 1000).toPrecision(2)
            : kmToM(data.visibility / 1000)
        }
        unit={systemUsed == "metric" ? "km" : "miles"}
        styles={styles}
      />

      <MetricCard
        title={"Sunrise"}
        iconSrc={"/icons/040-sunrise.png"}
        metric={
          systemUsed == "metric"
            ? `${parseInt(
                convertTime(data.sys.sunrise, data.timezone)[0].split(":")[0]
              )}:${
                convertTime(data.sys.sunrise, data.timezone)[0].split(":")[1]
              }`
            : timeToAMPM(convertTime(data.sys.sunrise, data.timezone)[0])
        }
        styles={styles}
      />

      <MetricCard
        title={"Sunset"}
        iconSrc={"/icons/041-sunset.png"}
        metric={
          systemUsed == "metric"
            ? convertTime(data.sys.sunset, data.timezone)[0]
            : timeToAMPM(convertTime(data.sys.sunset, data.timezone)[0])
        }
        unit={
          systemUsed == "imperial"
            ? isPM(convertTime(data.sys.sunset, data.timezone)[0])
            : ""
        }
        styles={styles}
      />
    </div>
  );
};

export default Metrics;
