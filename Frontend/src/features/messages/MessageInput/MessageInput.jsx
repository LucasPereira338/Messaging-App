import * as styles from "./MessageInput.module.css";
import { postNewMessage } from "../../../services/messageServices";

function MessageInput({ user, talkingWith, updateIsNewMessage }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    formValues.token = user.token;

    await postNewMessage(formValues);

    updateIsNewMessage();
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
        <input type="hidden" name="authorId" value={user.id} />
        <input type="hidden" name="receiverId" value={talkingWith.id} />
        <textarea
          type="text"
          name="content"
          id={styles.messageInput}
          placeholder="Type a message..."
        />
        <button id={styles.msgInpBtn} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
