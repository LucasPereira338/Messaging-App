import * as styles from "./EntityCard.module.css";

function UserCard({
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
        <div className={styles.cardUsername}>{user ? user.username : null}</div>
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

export default UserCard;
