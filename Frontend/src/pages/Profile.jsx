import { useLocation } from "react-router";

function Profile() {
  let user = useLocation().state;
  return <div className="profile">Profile of {user.username}</div>;
}

export default Profile;
