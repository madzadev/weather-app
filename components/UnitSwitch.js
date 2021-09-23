import styles from "./UnitSwitch.module.css";

export const UnitSwitch = ({ onClick, systemUsed }) => {
  return (
    <div className={styles.wrapper}>
      <p
        className={`${styles.switch} ${
          systemUsed == "metric" ? styles.active : styles.inactive
        }`}
        onClick={onClick}
      >
        Metric System
      </p>
      <p
        className={`${styles.switch} ${
          systemUsed == "metric" ? styles.inactive : styles.active
        }`}
        onClick={onClick}
      >
        Imperial System
      </p>
    </div>
  );
};
