import * as styles from "./ChatBox.module.css";
import MessageInput from "../MessageInput/MessageInput";

function ChatBox() {
  return (
    <div id={styles.chatBox} className="general-borders" data-testid="ChatBox">
      <MessageInput />
    </div>
  );
}

export default ChatBox;
