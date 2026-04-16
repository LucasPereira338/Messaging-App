import { useLocation } from "react-router";
import UserCard from "../components/users/UserCard/UserCard";
import ChatBox from "../components/messages/ChatBox/ChatBox";
import * as styles from "./MessageBoard.module.css";

function MessageBoard() {
  let user = useLocation().state;

  return (
    <div className={styles.MessageBoard}>
      <UserCard user={user} />
      <ChatBox />
    </div>
  );
}

export default MessageBoard;
