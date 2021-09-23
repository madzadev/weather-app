import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/utils";
import MetricCard from "./MetricsCard";
import styles from "./MetricsBox.module.css";

const MetricsBox = ({ weatherData, systemUsed }) => {
  return (
    <div className={styles.wrapper}>
      <MetricCard
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={weatherData.main.humidity}
        unit={"%"}
      />
      <MetricCard
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={getWindSpeed(systemUsed, weatherData.wind.speed)}
        unit={systemUsed == "metric" ? "m/s" : "m/h"}
      />
      <MetricCard
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(weatherData.wind.deg)}
      />
      <MetricCard
        title={"Visibility"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(systemUsed, weatherData.visibility)}
        unit={systemUsed == "metric" ? "km" : "miles"}
      />
      <MetricCard
        title={"Sunrise"}
        iconSrc={"/icons/sunrise.png"}
        metric={getTime(
          systemUsed,
          weatherData.sys.sunrise,
          weatherData.timezone
        )}
        unit={getAMPM(
          systemUsed,
          weatherData.sys.sunrise,
          weatherData.timezone
        )}
      />
      <MetricCard
        title={"Sunset"}
        iconSrc={"/icons/sunset.png"}
        metric={getTime(
          systemUsed,
          weatherData.sys.sunset,
          weatherData.timezone
        )}
        unit={getAMPM(systemUsed, weatherData.sys.sunset, weatherData.timezone)}
      />
    </div>
  );
};

export default MetricsBox;
