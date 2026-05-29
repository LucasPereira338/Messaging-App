import { useLocation, useNavigate } from "react-router";
import ProfileForm from "../../features/users/ProfileForm/ProfileForm";
import PageSidebar from "../../components/navigation/PageSidebar/PageSidebar";
import ProfileSidebar from "../../components/users/ProfileSidebar/ProfileSidebar";
import * as styles from "./Profile.module.css";
import { useState } from "react";

function Profile() {
  let user = useLocation().state;
  let navigate = useNavigate("/");

  const [choice, setChoice] = useState("Profile");
  console.log(choice);
  const handleChoice = (data) => {
    setChoice(data);
  };
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
      <div className={styles.profileSidebarContainer}>
        <ProfileSidebar handleChoice={handleChoice} choice={choice} />
      </div>
      <div className={styles.profileContent}>
        <ProfileForm userId={user.id} />
      </div>
    </div>
  );
}

export default Profile;
