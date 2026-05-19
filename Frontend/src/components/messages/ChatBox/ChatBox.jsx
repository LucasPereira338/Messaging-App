import * as styles from "./ChatBox.module.css";
import MessageInput from "../../../features/messages/MessageInput/MessageInput";
import UserCard from "../../users/UserCard/UserCard";
import Message from "../Message/Message";
import ChatMessages from "../ChatMessages/ChatMessages";
import { useState, useEffect } from "react";
import { deleteMessage } from "../../../services/messageServices";
import { fetchChatMessages } from "../../../services/chatServices";
import { addUserId } from "../../../helpers/arrayHelpers";

function ChatBox({ currentChat }) {
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
      const result = await fetchChatMessages(currentChat.chatId);

      addUserId(result[0].messages, localStorage.getItem("userId"));

      setMessages(result[0].messages);
    };
    fetchChat();
  }, [currentChat, isNewMessage]);

  useEffect(() => {
    if (msgToDel) {
      const delMsg = async () => {
        await deleteMessage(msgToDel);

        updateIsNewMessage();
      };
      delMsg();
    }
  }, [msgToDel]);

  return (
    <div id={styles.chatBox} className="general-borders" data-testid="ChatBox">
      <UserCard
        user={currentChat.username ? currentChat : "null"}
        group={currentChat.title ? currentChat : "null"}
      />
      <ChatMessages messages={messages} setMsgToDel={setMsgToDel} />
      <MessageInput
        user={localStorage.getItem("userId")}
        talkingWith={currentChat}
        updateIsNewMessage={updateIsNewMessage}
      />
    </div>
  );
}

export default ChatBox;
