import styles from "./LoadingScreen.module.css";

const LoadingScreen = ({ loadingMessage }) => {
  return (
    <div className={styles.wrapper}>
      <h1>{loadingMessage}</h1>
    </div>
  );
};

export default LoadingScreen;
