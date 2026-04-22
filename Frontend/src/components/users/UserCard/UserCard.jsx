import * as styles from "./UserCard.module.css";

function UserCard({ user, talkingWith, handleTalkingWith }) {
  const backend = import.meta.env.VITE_BACKEND;
  const portrait = backend + "assets/" + user.portrait;

  return (
    <div
      id={talkingWith == user.id ? styles.userCardActive : styles.userCard}
      className="general-borders"
      data-testid="container"
      onClick={() => handleTalkingWith(user.id)}
    >
      <img
        src={portrait}
        alt={`profile picture of ${user.username}`}
        className={styles.cardPortrait}
      />
      <div className={styles.userInfo}>
        <div className={styles.cardName}>{user.name}</div>
        <div className={styles.cardUsername}>{user.username}</div>
      </div>
    </div>
  );
}

export default UserCard;
