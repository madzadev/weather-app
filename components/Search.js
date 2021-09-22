import styles from "./Search.module.css";

const Search = ({ placeHolder, value, onFocus, onChange, onKeyDown }) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder={placeHolder}
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Search;
