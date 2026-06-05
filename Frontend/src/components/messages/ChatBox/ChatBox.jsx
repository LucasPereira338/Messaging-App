import * as styles from "./ChatBox.module.css";
import { useState, useEffect, useContext } from "react";
import { deleteMessage } from "../../../services/messageServices";
import { fetchChatMessages } from "../../../services/chatServices";
import { addMemberDataToMsg } from "../../../helpers/arrayHelpers";
import { MessageContext } from "../../../contexts/MessageContext";
import MessageInput from "../../../features/messages/MessageInput/MessageInput";
import EntityCard from "../../entities/EntityCard/EntityCard";
import Message from "../Message/Message";
import ChatMessages from "../ChatMessages/ChatMessages";

function ChatBox() {
  const { currentChat } = useContext(MessageContext);
  const user = localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [msgToDel, setMsgToDel] = useState(false);

  const updateIsNewMessage = () => {
    setIsNewMessage(Math.random());
  };
  console.log(currentChat);
  useEffect(() => {
    if (currentChat) {
      try {
        const fetchChat = async () => {
          let result = await fetchChatMessages(currentChat.chatId);
          console.log(result);
          const msgs = addMemberDataToMsg(result, user);

          setMessages(msgs);
        };

        fetchChat();
      } catch (e) {
        console.error(e);
      }
    }
  }, [currentChat, isNewMessage, user]);

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
      <div className={styles.entityCardContainer}>
        {!currentChat ? (
          <h3>Use the search bar to find new people to chat with!</h3>
        ) : (
          <EntityCard entity={currentChat} />
        )}
      </div>
      {currentChat && (
        <div className={styles.chatMessagesContainer}>
          <ChatMessages messages={messages} setMsgToDel={setMsgToDel} />
        </div>
      )}

      {currentChat && (
        <MessageInput user={user} updateIsNewMessage={updateIsNewMessage} />
      )}
    </section>
  );
}

export default ChatBox;
