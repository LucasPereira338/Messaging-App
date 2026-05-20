import * as styles from "./ContentChoice.module.css";

function ContentChoice({ content, handleContent }) {
  const possibleChoices = ["All", "Users", "Groups"];
  return (
    <section className={styles.contentChoice}>
      <div
        className={styles.contentChoiceItem}
        id={possibleChoices[0] == content ? styles.chosen : null}
        onClick={handleContent}
      >
        {possibleChoices[0]}
      </div>
      <div
        className={styles.contentChoiceItem}
        id={possibleChoices[1] == content ? styles.chosen : null}
        onClick={handleContent}
      >
        {possibleChoices[1]}
      </div>
      <div
        className={styles.contentChoiceItem}
        id={possibleChoices[2] == content ? styles.chosen : null}
        onClick={handleContent}
      >
        {possibleChoices[2]}
      </div>
    </section>
  );
}

export default ContentChoice;
