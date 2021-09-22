import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/utils";
import MetricCard from "./MetricsCard";

import styles from "./MetricsBox.module.css";

const MetricsBox = ({ data, systemUsed }) => {
  return (
    <div className={styles.wrapper}>
      <MetricCard
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={data.main.humidity}
        unit={"%"}
      />

      <MetricCard
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={getWindSpeed(systemUsed, data.wind.speed)}
        unit={systemUsed == "metric" ? "m/s" : "m/h"}
      />

      <MetricCard
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(data.wind.deg)}
      />

      <MetricCard
        title={"Visibility"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(systemUsed, data.visibility)}
        unit={systemUsed == "metric" ? "km" : "miles"}
      />

      <MetricCard
        title={"Sunrise"}
        iconSrc={"/icons/sunrise.png"}
        metric={getTime(systemUsed, data.sys.sunrise, data.timezone)}
        unit={getAMPM(systemUsed, data.sys.sunrise, data.timezone)}
      />

      <MetricCard
        title={"Sunset"}
        iconSrc={"/icons/sunset.png"}
        metric={getTime(systemUsed, data.sys.sunset, data.timezone)}
        unit={getAMPM(systemUsed, data.sys.sunset, data.timezone)}
      />
    </div>
  );
};

export default MetricsBox;
