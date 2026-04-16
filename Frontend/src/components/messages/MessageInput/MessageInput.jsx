import * as styles from "./MessageInput.module.css";

function MessageInput() {
  return (
    <div className={styles.messageInputContainer}>
      <input type="text" name="content" className={styles.messageInput} />
      <button type="submit">Send</button>
    </div>
  );
}

export default MessageInput;
