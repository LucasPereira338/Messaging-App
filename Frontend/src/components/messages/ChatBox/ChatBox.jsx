import * as styles from "./ChatBox.module.css";
import MessageInput from "../../../features/messages/MessageInput/MessageInput";
import UserCard from "../../users/UserCard/UserCard";
import Message from "../Message/Message";
import ChatMessages from "../ChatMessages/ChatMessages";
import { fetchChatMessages } from "../../../services/messageServices";
import { addUserId } from "../../../helpers/arrayHelpers";
import { useState, useEffect } from "react";

function ChatBox({ user, talkingWith }) {
  const [messages, setMessages] = useState([
    { id: "0", content: "pending..." },
  ]);

  const [isNewMessage, setIsNewMessage] = useState(false);

  const updateIsNewMessage = (value) => {
    setIsNewMessage(isNewMessage + value);
  };
  useEffect(() => {
    const fetchChat = async () => {
      const result = await fetchChatMessages(user, talkingWith);

      addUserId(result, user.id);

      setMessages(result);
    };
    fetchChat();
  }, [user, talkingWith, isNewMessage]);

  return (
    <div id={styles.chatBox} className="general-borders" data-testid="ChatBox">
      <UserCard user={talkingWith} />
      <ChatMessages messages={messages} />
      <MessageInput
        user={user}
        talkingWith={talkingWith}
        updateIsNewMessage={updateIsNewMessage}
      />
    </div>
  );
}

export default ChatBox;
