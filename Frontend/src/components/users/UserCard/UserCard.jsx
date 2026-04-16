import * as styles from "./UserCard.module.css";

function UserCard({ user }) {
  const backend = import.meta.env.VITE_BACKEND;
  const portrait = backend + "assets/" + user.portrait;
  return (
    <div className={styles.userCard}>
      <img
        src={portrait}
        alt={`profile picture of ${user.username}`}
        className={styles.cardPortrait}
      />
      <div className={styles.cardUsername}>{user.username}</div>
    </div>
  );
}

export default UserCard;
