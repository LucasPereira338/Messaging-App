import { useLocation } from "react-router";
import ProfileForm from "../../features/users/ProfileForm/ProfileForm";
import PageSidebar from "../../components/navigation/PageSidebar/PageSidebar";
import * as styles from "./Profile.module.css";
import { useNavigate } from "react-router";

function Profile() {
  let user = useLocation().state;
  let navigate = useNavigate("/");
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className={styles.profile}>
      <div className={styles.profilePageSidebar}>
        <PageSidebar handleLogout={handleLogout} />
      </div>
      <div className={styles.profileContent}>
        <ProfileForm userId={user.id} />
      </div>
    </div>
  );
}

export default Profile;
