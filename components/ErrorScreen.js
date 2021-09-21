import styles from "./ErrorScreen.module.css";

const ErrorScreen = ({ onFocus, onChange, onKeyDown }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.message}>City not found, try again!</h1>
      <input
        type="text"
        className={styles.input}
        onFocus={onFocus}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default ErrorScreen;
