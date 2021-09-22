import styles from "./Header.module.css";

const Header = ({ children }) => {
  return <div className={styles.titleAndSearch}>{children}</div>;
};

export default Header;
