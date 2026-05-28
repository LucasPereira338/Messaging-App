import * as styles from "./Message.module.css";

function Message({ message, setMsgToDel }) {
  const backend = import.meta.env.VITE_BACKEND;
  const msgImg = backend + "assets/" + message.image;
  const portrait = backend + "assets/" + message.portrait;

  const createdAt = new Date(message.createdAt).toString();
  const time = createdAt.substring(0, createdAt.indexOf("GMT"));

  const isAuthor = message.userId == message.authorId ? true : false;

  return (
    <div className={styles.messageContainer}>
      {" "}
      <img src={portrait} className={styles.userPortrait} />
      <div className={styles.msgWithTime}>
        <div className={styles.authorInfo}>
          <div className={styles.msgUsername}>{message.username}</div>
          <div className={styles.msgTime}>{time}</div>
        </div>

        <div
          id={isAuthor ? styles.messageAuthor : styles.message}
          className="general-borders"
          aria-label="message"
        >
          <div
            id={isAuthor ? styles.messageContentAuthor : null}
            className={styles.messageContent}
          >
            {message.image ? (
              <img
                src={msgImg}
                id={isAuthor ? styles.msgImgAuthor : msgImg}
                className={styles.messageContent}
              />
            ) : null}

            <div id={isAuthor ? styles.msgTxtReceiver : styles.msgTxt}>
              {message.content}
            </div>
            {isAuthor && (
              <img
                src="../../../../icons/trash-can.png"
                alt="trash can"
                onClick={() => setMsgToDel(message)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
