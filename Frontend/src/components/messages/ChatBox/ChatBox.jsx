import * as styles from "./ChatBox.module.css";
import MessageInput from "../MessageInput/MessageInput";

function ChatBox() {
  return (
    <div className={styles.chatBox} data-testid="ChatBox">
      <MessageInput />
    </div>
  );
}

export default ChatBox;
