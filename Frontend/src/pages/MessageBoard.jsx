import { useLocation } from "react-router";
import UserCard from "../components/users/UserCard/UserCard";

function MessageBoard() {
  let user = useLocation().state;
  console.log(user);
  return (
    <div className="messageBoard">
      <UserCard />
    </div>
  );
}

export default MessageBoard;
