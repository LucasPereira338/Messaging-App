import * as styles from "./Checkbox.module.css";

function Checkbox({ handleToggle }) {
  return (
    <label className={styles.checkboxLabel}>
      <input type="checkbox" onChange={handleToggle} />
      Show only online users
    </label>
  );
}

export default Checkbox;
