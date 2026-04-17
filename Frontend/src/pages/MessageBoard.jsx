import { useLocation } from "react-router";
import UserCard from "../components/users/UserCard/UserCard";
import ChatBox from "../components/messages/ChatBox/ChatBox";
import MessageSidebar from "../components/messages/MessageSidebar/MessageSidebar";
import * as styles from "./MessageBoard.module.css";

function MessageBoard() {
  let user = useLocation().state;

  return (
    <div className={styles.MessageBoard}>
      <MessageSidebar />
      <UserCard user={user} />
      <ChatBox />
    </div>
  );
}

export default MessageBoard;
