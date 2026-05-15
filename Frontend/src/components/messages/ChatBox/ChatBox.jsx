import * as styles from "./ChatBox.module.css";
import MessageInput from "../../../features/messages/MessageInput/MessageInput";
import UserCard from "../../users/UserCard/UserCard";
import Message from "../Message/Message";
import ChatMessages from "../ChatMessages/ChatMessages";
import { deleteMessage } from "../../../services/messageServices";
import { fetchChatMessages } from "../../../services/chatServices";
import { addUserId } from "../../../helpers/arrayHelpers";
import { useState, useEffect } from "react";

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
      console.log("trying to fetch messages of a chat involving ");
      console.log(currentChat);
      const result = await fetchChatMessages(currentChat.chatId);

      addUserId(result[0].messages, localStorage.getItem("userId"));
      console.log("chat mgs: ");
      console.log(result[0].messages);

      setMessages(result[0].messages);
    };
    fetchChat();
  }, [currentChat, isNewMessage]);

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
