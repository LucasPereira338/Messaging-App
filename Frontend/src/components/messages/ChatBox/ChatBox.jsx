import * as styles from "./ChatBox.module.css";
import MessageInput from "../../../features/messages/MessageInput/MessageInput";
import UserCard from "../../users/UserCard/UserCard";
import Message from "../Message/Message";
import ChatMessages from "../ChatMessages/ChatMessages";
import {
  deleteMessage,
  fetchChatMessages,
} from "../../../services/messageServices";
import { addUserId } from "../../../helpers/arrayHelpers";
import { useState, useEffect } from "react";

function ChatBox({ user, talkingWith }) {
  const [messages, setMessages] = useState([
    { id: "0", content: "pending..." },
  ]);

  const [isNewMessage, setIsNewMessage] = useState(false);
  const [msgToDel, setMsgToDel] = useState(false);

  const updateIsNewMessage = () => {
    setIsNewMessage(Math.random());
  };

  useEffect(() => {
    const fetchChat = async () => {
      const result = await fetchChatMessages(user, talkingWith);

      addUserId(result, user.id);

      setMessages(result);
    };
    fetchChat();
  }, [user, talkingWith, isNewMessage]);

  useEffect(() => {
    if (msgToDel) {
      console.log("deleting a message");
      const delMsg = async () => {
        const result = await deleteMessage(msgToDel);
        console.log(result);
        setIsNewMessage(Math.random());
      };
      delMsg();
    }
  }, [msgToDel]);

  return (
    <div id={styles.chatBox} className="general-borders" data-testid="ChatBox">
      <UserCard user={talkingWith} />
      <ChatMessages messages={messages} setMsgToDel={setMsgToDel} />
      <MessageInput
        user={user}
        talkingWith={talkingWith}
        updateIsNewMessage={updateIsNewMessage}
      />
    </div>
  );
}

export default ChatBox;
