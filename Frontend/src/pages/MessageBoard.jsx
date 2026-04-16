import { useLocation } from "react-router";
import UserCard from "../components/users/UserCard/UserCard";

function MessageBoard() {
  let user = useLocation().state;
  console.log("in message board: ");
  console.log(user);
  return (
    <div className="messageBoard">
      <UserCard user={user} />
    </div>
  );
}

export default MessageBoard;
