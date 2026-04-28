import { useLocation } from "react-router";
import ProfileForm from "../../features/users/ProfileForm/ProfileForm";
import * as styles from "./Profile.module.css";

function Profile() {
  let user = useLocation().state;
  return (
    <div className={styles.profile}>
      <ProfileForm userId={user.id} />
    </div>
  );
}

export default Profile;
