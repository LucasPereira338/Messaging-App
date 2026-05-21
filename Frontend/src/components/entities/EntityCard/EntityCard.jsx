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

      <div
        id={entity.isActive ? styles.onlineCircle : null}
        className={entity != "null" ? styles.statusCircle : null}
      >
        {" "}
      </div>
    </div>
  );
}

export default EntityCard;

/* before refactoring user and group into entity
function EntityCard({
  user = "null",
  group = "null",
  talkingWith = "null",
  handleTalkingWith = "null",
  msg = "null",
}) {
  const path = user != "null" ? user.portrait : group.portrait;
  const backend = import.meta.env.VITE_BACKEND;
  const portrait = backend + "assets/" + path;
  const name = user != "null" ? user.name : group.title;
  const id = group != "null" ? group.id : user.id;

  return (
    <div
      id={talkingWith.id == id ? styles.userCardActive : styles.userCard}
      className="general-borders"
      data-testid="container"
      onClick={
        handleTalkingWith != "null"
          ? () => handleTalkingWith(user != "null" ? user : group)
          : null
      }
    >
      <img
        src={portrait}
        alt={`profile picture of ${user.username}`}
        className={styles.cardPortrait}
      />
      <div className={styles.userInfo}>
        <div className={styles.cardName}>{name}</div>
        {user != "null" ? (
          <div className={styles.cardUsername}>{user.username}</div>
        ) : null}

        {msg != "null" ? (
          <div className={styles.lastMsg}>{msg.content}</div>
        ) : null}
      </div>

      <div
        id={user.isActive ? styles.onlineCircle : null}
        className={user != "null" ? styles.statusCircle : null}
      >
        {" "}
      </div>
    </div>
  );
}

export default EntityCard; */
