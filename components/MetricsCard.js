import Image from "next/image";
import styles from "./MetricsCard.module.css";

const MetricsCard = ({ title, iconSrc, metric, unit }) => {
  return (
    <div className={styles.wrapper}>
      <p>{title}</p>
      <div className={styles.content}>
        <Image alt="weatherIcon" src={iconSrc} height="100px" width="100px" />
        <div>
          <h1>{metric}</h1>
          <p>{unit}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
