import styles from "./Header.module.css";

const Header = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default Header;
