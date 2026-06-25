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

function ChatBox({ updateChats, handleChats, handleProfile }) {
  const { currentChat } = useContext(MessageContext);
  const { user } = useContext(MessageContext);
  const [messages, setMessages] = useState([]);
  const [msgToDel, setMsgToDel] = useState(false);

  const handleMsgToDel = (data) => {
    setMsgToDel(data);
  };

  useEffect(() => {
    if (currentChat && user) {
      try {
        const fetchChat = async () => {
          let result = await fetchChatMessages(currentChat.chatId);
          const msgs = addMemberDataToMsg(result, user.id);
          setMessages(msgs);
        };

        fetchChat();
      } catch (e) {
        console.error(e);
      }
    }
  }, [currentChat, updateChats, user]);

  useEffect(() => {
    if (msgToDel) {
      const delMsg = async () => {
        await deleteMessage(msgToDel);

        handleChats();
      };
      delMsg();
    }

    return () => {
      setMsgToDel(null);
    };
  }, [msgToDel, handleChats]);

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
          <EntityCard entity={currentChat} handleClick={handleProfile} />
        )}
      </div>
      {currentChat && (
        <div className={styles.chatMessagesContainer}>
          <ChatMessages messages={messages} handleMsgToDel={handleMsgToDel} />
        </div>
      )}

      {currentChat && (
        <div className={styles.messageInputContainer}>
          <MessageInput handleChats={handleChats} />
        </div>
      )}
    </section>
  );
}

export default ChatBox;
