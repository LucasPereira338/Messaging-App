import * as styles from "./Message.module.css";

function Message({ message, setMsgToDel }) {
  const backend = import.meta.env.VITE_BACKEND;
  const msgImg = backend + "assets/" + message.image;
  const isAuthor = message.userId == message.authorId ? true : false;
  console.log("messages");
  console.log(message);

  const portrait = backend + "assets/" + message.portrait;

  return (
    <div
      id={isAuthor ? styles.messageContainerAuthor : null}
      className={styles.messageContainer}
    >
      {" "}
      <img src={portrait} className={styles.userPortrait} />
      <div
        id={isAuthor ? styles.messageAuthor : styles.message}
        className="general-borders"
        aria-label="message"
      >
        {isAuthor ? (
          <div
            id={styles.messageContentAuthor}
            className={styles.messageContent}
          >
            {message.image ? (
              <img
                src={msgImg}
                id={isAuthor ? styles.msgImgAuthor : msgImg}
                className={styles.messageContent}
              />
            ) : null}
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
            {message.image ? (
              <img
                src={msgImg}
                id={isAuthor ? styles.msgImgAuthor : msgImg}
                className={styles.messageContent}
              />
            ) : null}
            <div id={styles.msgTxtReceiver}>{message.content}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
