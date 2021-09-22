import styles from "./ContentBox.module.css";

const ContentBox = ({ children }) => {
  return <div className={styles.statsWrapper}>{children}</div>;
};

export default ContentBox;
