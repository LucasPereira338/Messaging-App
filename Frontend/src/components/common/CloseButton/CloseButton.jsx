import * as styles from "./CloseButton.module.css";

function CloseButton({ handleClick }) {
  return (
    <button className={styles.closeBtn} onClick={handleClick}>
      X
    </button>
  );
}

export default CloseButton;
