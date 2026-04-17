import * as styles from "./MessageInput.module.css";

function MessageInput() {
  return (
    <div className={styles.messageInputContainer} data-testid="MessageInput">
      <input
        type="text"
        name="content"
        className={styles.messageInput}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </div>
  );
}

export default MessageInput;
