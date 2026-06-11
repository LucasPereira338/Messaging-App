import * as styles from "./ChatMessages.module.css";
import { useRef, useEffect } from "react";
import Message from "../Message/Message";

function ChatMessages({ messages = [], setMsgToDel }) {
  const msgsRef = useRef(null);

  useEffect(() => {
    const msgs = msgsRef.current;
    if (msgs) {
      msgs.scrollTop = msgs.scrollHeight;
    }
  }, [messages]);

  return (
    <section
      className={styles.chatMessages}
      data-testid="ChatMessages"
      ref={msgsRef}
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
