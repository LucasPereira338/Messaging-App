import * as styles from "./ChatBox.module.css";
import MessageInput from "../MessageInput/MessageInput";
import UserCard from "../../users/UserCard/UserCard";
import Message from "../../../features/messages/Message/Message";
import ChatMessages from "../../../features/messages/ChatMessages/ChatMessages";
import { fetchChatMessages } from "../../../services/messageServices";
import { addUserId } from "../../../helpers/arrayHelpers";
import { useState, useEffect } from "react";

function ChatBox({ user, talkingWith }) {
  const [messages, setMessages] = useState([
    { id: "0", content: "pending..." },
  ]);
  useEffect(() => {
    const fetchChat = async () => {
      const result = await fetchChatMessages(user, talkingWith);

      addUserId(result, user.id);

      setMessages(result);
    };
    fetchChat();
  }, [user, talkingWith]);

  return (
    <div id={styles.chatBox} className="general-borders" data-testid="ChatBox">
      <UserCard user={talkingWith} />
      <ChatMessages messages={messages} />
      <MessageInput />
    </div>
  );
}

export default ChatBox;
