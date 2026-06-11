import * as styles from "./ChatMessages.module.css";
import Message from "../Message/Message";

function ChatMessages({ messages = [], setMsgToDel }) {
  return (
    <section className={styles.chatMessages} data-testid="ChatMessages">
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
