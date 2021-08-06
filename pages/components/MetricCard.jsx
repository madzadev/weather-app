import React from "react";
import Image from "next/image";

const MetricCard = ({ title, iconSrc, metric, unit = "", styles }) => {
  return (
    <div className={styles.statsCard}>
      <p>{title}</p>
      <div className={styles.statsCardContent}>
        <Image alt="weatherIcon" src={iconSrc} height="100px" width="100px" />
        <div>
          <h1>{metric}</h1>
          <p>{unit}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
