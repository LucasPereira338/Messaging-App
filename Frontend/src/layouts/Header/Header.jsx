import * as styles from "./Header.module.css";

function Header({ isLoggedIn }) {
  return (
    <div className={styles.header}>
      <h3 className={styles.headerTitle}>Message Board</h3>
      {isLoggedIn ? (
        <button type="submit" className={styles.headerBtn}>
          Log Off
        </button>
      ) : (
        <button type="submit" className={styles.headerBtn}>
          Sign Up
        </button>
      )}
    </div>
  );
}

export default Header;
