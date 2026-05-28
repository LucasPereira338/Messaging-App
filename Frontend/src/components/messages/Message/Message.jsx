import * as styles from "./Message.module.css";

function Message({ message, setMsgToDel }) {
  const backend = import.meta.env.VITE_BACKEND;
  const msgImg = backend + "assets/" + message.image;
  const isAuthor = message.userId == message.authorId ? true : false;

  return (
    <div
      id={isAuthor ? styles.messageContainerAuthor : styles.messageContainer}
      className="general-borders"
      aria-label="message"
    >
      {message.image ? (
        <img
          src={msgImg}
          id={isAuthor ? styles.msgImgAuthor : msgImg}
          className={styles.messageContent}
        />
      ) : null}
      {isAuthor ? (
        <div id={styles.messageContentAuthor} className={styles.messageContent}>
          <div className={styles.msgTxt}>{message.content}</div>
          <img
            src="../../../../icons/trash-can.png"
            alt="trash can"
            onClick={() => setMsgToDel(message)}
          />
        </div>
      ) : (
        <div
          id={styles.messageContentReceiver}
          className={styles.messageContent}
        >
          <div className={styles.msgTxt}>{message.content}</div>
        </div>
      )}
    </div>
  );
}

export default Message;
