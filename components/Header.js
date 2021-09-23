import styles from "./Header.module.css";

export const Header = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
