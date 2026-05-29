import * as styles from "./ChatMessages.module.css";
import Message from "../Message/Message";

function ChatMessages({ messages = [{ id: 0 }], setMsgToDel }) {
  return (
    <section
      className={styles.chatMessagesContainer}
      aria-label="chat-messages"
    >
      {messages
        ? messages.map((item) => {
            return (
              <Message key={item.id} message={item} setMsgToDel={setMsgToDel} />
            );
          })
        : null}
    </section>
  );
}

export default ChatMessages;
