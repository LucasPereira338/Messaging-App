import * as styles from "./ChatMessages.module.css";
import Message from "../Message/Message";

function ChatMessages({ messages }) {
  return (
    <div className={styles.chatMessagesContainer}>
      {messages.map((item) => {
        return <Message key={item.id} message={item} />;
      })}
    </div>
  );
}

export default ChatMessages;
