import * as styles from "./MessageInput.module.css";

function MessageInput() {
  return (
    <div
      id={styles.messageInputContainer}
      className="general-borders"
      data-testid="MessageInput"
    >
      <input
        type="text"
        name="content"
        id={styles.messageInput}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </div>
  );
}

export default MessageInput;
