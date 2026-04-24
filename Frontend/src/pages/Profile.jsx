import { useLocation } from "react-router";
import ProfileForm from "../features/users/ProfileForm/ProfileForm";

function Profile() {
  let user = useLocation().state;
  return (
    <div className="profile">
      <ProfileForm user={user} />
    </div>
  );
}

export default Profile;
