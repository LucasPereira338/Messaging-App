import * as styles from "./UserCard.module.css";

function UserCard({ user }) {
  return (
    <div className={styles.userCard}>
      <img
        src={user.portrait}
        alt={`profile picture of ${user.username}`}
        className={styles.cardPortrait}
      />
      <div className={styles.cardUsername}>{user.username}</div>
    </div>
  );
}

export default UserCard;
