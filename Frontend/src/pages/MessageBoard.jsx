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
  const [lastMessage, setLastMessage] = useState({ id: 0 });

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetchUserMessages({
        id: userId,
        token: token,
      });
      let allMessages = response;
      for (let i = 0; i <= response.length - 1; i++) {
        allMessages[0].userId = userId;
      }

      setMessages(allMessages);
      setLastMessage(response[0]);
    };
    fetchMessages();
  }, [token, userId]);

  return (
    <div className={styles.MessageBoard}>
      <MessageSidebar messages={messages} />
      <ChatBox message={lastMessage} />
    </div>
  );
}

export default MessageBoard;
