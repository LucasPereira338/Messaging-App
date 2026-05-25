import * as styles from "./MessageInput.module.css";
import { postNewMessage } from "../../../services/messageServices";
import { useState, useContext } from "react";
import { MessageContext } from "../../../contexts/MessageContext";

function MessageInput({ user, updateIsNewMessage }) {
  const { currentChat } = useContext(MessageContext);
  const [msg, setMsg] = useState("");
  const handleTyping = (e) => {
    setMsg(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form.requestSubmit();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await postNewMessage(formData);

    updateIsNewMessage();

    setMsg("");
  };

  return (
    <div
      id={styles.messageInputContainer}
      className="general-borders"
      data-testid="MessageInput"
    >
      <form
        aria-label="message-input-form"
        className={styles.messageInputForm}
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="chatId" value={currentChat.chatId} />
        <input type="hidden" name="authorId" value={user} />
        <textarea
          type="text"
          name="content"
          id={styles.messageInput}
          placeholder="Type a message..."
          value={msg}
          onChange={handleTyping}
          onKeyDown={handleEnter}
        />
        <input type="file" name="image" />
        <button id={styles.msgInpBtn} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
