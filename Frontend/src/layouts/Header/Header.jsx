import * as styles from "./Header.module.css";

function Header() {
  return (
    <div id={styles.header} className="header-footer">
      <h3 className={styles.headerTitle}>Messaging App</h3>
    </div>
  );
}

export default Header;
