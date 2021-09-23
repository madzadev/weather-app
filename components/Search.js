import styles from "./Search.module.css";

export const Search = ({
  placeHolder,
  value,
  onFocus,
  onChange,
  onKeyDown,
}) => {
  return (
    <input
      className={styles.search}
      type="text"
      placeholder={placeHolder}
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};
