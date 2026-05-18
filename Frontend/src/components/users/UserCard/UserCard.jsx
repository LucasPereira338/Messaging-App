import * as styles from "./UserCard.module.css";

function UserCard({
  user = "null",
  group = "null",
  talkingWith = "null",
  handleTalkingWith = "null",
}) {
  const path = user != "null" ? user.portrait : group.portrait;
  const backend = import.meta.env.VITE_BACKEND;
  const portrait = backend + "assets/" + path;
  const name = user != "null" ? user.name : group.title;

  return (
    <div
      id={talkingWith.id == user.id ? styles.userCardActive : styles.userCard}
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
