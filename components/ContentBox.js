import styles from "./ContentBox.module.css";

const ContentBox = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default ContentBox;
