import * as styles from "./CloseButton.module.css";

function CloseButton({ handleClick, size = "medium" }) {
  return (
    <button
      className={styles.closeBtn}
      id={size == "small" ? styles.smallCloseBtn : null}
      onClick={handleClick}
    >
      X
    </button>
  );
}

export default CloseButton;
