import styles from "./ErrorScreen.module.css";

const ErrorScreen = ({ errorMessage, children }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.message}>{errorMessage}</h1>
      {children}
    </div>
  );
};

export default ErrorScreen;
