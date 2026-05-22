import * as styles from "./EntityCard.module.css";

function EntityCard({
  entity,
  talkingWith = "null",
  handleTalkingWith = "null",
  msg = "null",
}) {
  const backend = import.meta.env.VITE_BACKEND;
  const portrait = backend + "assets/" + entity.portrait;
  const name = entity.name != null ? entity.name : entity.title;

  return (
    <div
      id={talkingWith.id == entity.id ? styles.userCardActive : styles.userCard}
      className="general-borders"
      data-testid="container"
      onClick={
        handleTalkingWith != "null" ? () => handleTalkingWith(entity) : null
      }
    >
      <img
        src={portrait}
        alt={`portrait of ${entity.name}`}
        className={styles.cardPortrait}
      />
      <div className={styles.userInfo}>
        <div className={styles.cardName}>{name}</div>
        {entity.username != undefined ? (
          <div className={styles.cardUsername}>{entity.username}</div>
        ) : null}

        {msg != undefined ? (
          <div className={styles.lastMsg}>{msg.content}</div>
        ) : null}
      </div>
      {entity.name ? (
        <div
          id={entity.isActive ? styles.onlineCircle : null}
          className={entity != "null" ? styles.statusCircle : null}
        >
          {" "}
        </div>
      ) : null}
    </div>
  );
}

export default EntityCard;
