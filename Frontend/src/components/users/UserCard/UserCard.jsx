import * as styles from "./UserCard.module.css";

function UserCard({ user }) {
  const backend = import.meta.env.VITE_BACKEND;
  const portrait = backend + "assets/" + user.portrait;

  return (
    <div
      id={styles.userCard}
      className="general-borders"
      data-testid="container"
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
