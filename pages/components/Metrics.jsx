import React from "react";
import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/utils";
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
        metric={getWindSpeed(systemUsed, data.wind.speed)}
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
        metric={getVisibility(systemUsed, data.visibility)}
        unit={systemUsed == "metric" ? "km" : "miles"}
        styles={styles}
      />

      <MetricCard
        title={"Sunrise"}
        iconSrc={"/icons/040-sunrise.png"}
        metric={getTime(systemUsed, data.sys.sunrise, data.timezone)}
        unit={getAMPM(systemUsed, data.sys.sunrise, data.timezone)}
        styles={styles}
      />

      <MetricCard
        title={"Sunset"}
        iconSrc={"/icons/041-sunset.png"}
        metric={getTime(systemUsed, data.sys.sunset, data.timezone)}
        unit={getAMPM(systemUsed, data.sys.sunset, data.timezone)}
        styles={styles}
      />
    </div>
  );
};

export default Metrics;
