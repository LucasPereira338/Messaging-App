import * as styles from "./ChatBox.module.css";
import MessageInput from "../../../features/messages/MessageInput/MessageInput";
import EntityCard from "../../entities/EntityCard/EntityCard";
import Message from "../Message/Message";
import ChatMessages from "../ChatMessages/ChatMessages";
import { useState, useEffect, useContext } from "react";
import { deleteMessage } from "../../../services/messageServices";
import { fetchChatMessages } from "../../../services/chatServices";
import { addMemberDataToMsg } from "../../../helpers/arrayHelpers";
import { MessageContext } from "../../../contexts/MessageContext";

function ChatBox() {
  const { currentChat } = useContext(MessageContext);
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
      let result = await fetchChatMessages(currentChat.chatId);

      const msgs = addMemberDataToMsg(result, localStorage.getItem("userId"));

      setMessages(msgs);
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
    <section
      id={styles.chatBox}
      className="general-borders"
      data-testid="ChatBox"
    >
      <EntityCard entity={currentChat} />
      <ChatMessages messages={messages} setMsgToDel={setMsgToDel} />
      <MessageInput
        user={localStorage.getItem("userId")}
        updateIsNewMessage={updateIsNewMessage}
      />
    </section>
  );
}

export default ChatBox;
