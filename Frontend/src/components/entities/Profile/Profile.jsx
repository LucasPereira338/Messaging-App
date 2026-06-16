import * as styles from "./Profile.module.css";

function Profile() {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileSidebar}>
        <div className={styles.profileSidebarOpt}>Edit profile</div>
        <div className={styles.profileSidebarOpt}>Change Password</div>
      </div>
    </div>
  );
}
