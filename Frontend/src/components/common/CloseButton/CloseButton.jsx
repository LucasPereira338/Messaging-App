import * as styles from "./CloseButton.module.css";

function CloseButton({ handleClick }) {
  return (
    <h5 className={styles.closeBtn} onClick={handleClick}>
      X
    </h5>
  );
}

export default CloseButton;
