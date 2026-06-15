import * as styles from "./MessageInput.module.css";
import { useState, useContext, useRef } from "react";
import { postNewMessage } from "../../../services/messageServices";
import { getImageFile } from "../../../helpers/fileHelpers";
import { MessageContext } from "../../../contexts/MessageContext";
import ImagePreview from "../../../components/images/ImagePreview/ImagePreview";

function MessageInput({ handleChats }) {
  const { currentChat } = useContext(MessageContext);
  const user = localStorage.getItem("userId") || "";
  let ref = useRef(null);
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    ref.current = e;
    const selectedFile = getImageFile(e);
    setFile(selectedFile);
  };

  const cancelFile = () => {
    const e = ref.current;
    e.target.value = null;
    setFile(null);
  };

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

    handleChats();

    setMsg("");
  };

  return (
    <div
      id={styles.messageInput}
      className="general-borders"
      data-testid="MessageInput"
    >
      <form
        data-testid="MessageInputForm"
        className={styles.messageInputForm}
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="chatId" value={currentChat.chatId} />
        <input type="hidden" name="authorId" value={user} />
        <textarea
          type="text"
          name="content"
          id={styles.messageTxtArea}
          placeholder="Type a message..."
          value={msg}
          onChange={handleTyping}
          onKeyDown={handleEnter}
          data-testid="TextArea"
        />
        <div className={styles.msgImgContainer}>
          {file ? (
            <div className={styles.msgImgPreview} data-testid="msgImgPreview">
              <ImagePreview file={file} cancelFile={cancelFile} size="small" />
            </div>
          ) : null}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button id={styles.msgInpBtn} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
