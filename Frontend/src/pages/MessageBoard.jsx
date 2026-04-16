import { useLocation } from "react-router";

function MessageBoard() {
  let user = useLocation().state;
  console.log(user);
  return <div>placeholder for {user.username}</div>;
}

export default MessageBoard;
