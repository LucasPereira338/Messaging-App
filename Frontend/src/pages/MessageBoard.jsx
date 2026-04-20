import { useLocation } from "react-router";
import UserCard from "../components/users/UserCard/UserCard";
import ChatBox from "../components/messages/ChatBox/ChatBox";
import MessageSidebar from "../components/messages/MessageSidebar/MessageSidebar";
import { fetchUserMessages } from "../services/messageServices";
import { useEffect, useState } from "react";
import * as styles from "./MessageBoard.module.css";

function MessageBoard() {
  let user = useLocation().state;
  const userId = user.id;
  const token = user.token;

  const [messages, setMessages] = useState({ id: 0, content: "loading..." });

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetchUserMessages({
        id: userId,
        token: token,
      });

      setMessages(response);
    };
    fetchMessages();
  }, [token, userId]);

  return (
    <div className={styles.MessageBoard}>
      <MessageSidebar />
      <UserCard user={user} />
      <ChatBox />
    </div>
  );
}

export default MessageBoard;
