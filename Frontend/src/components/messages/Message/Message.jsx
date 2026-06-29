import * as styles from "./Message.module.css";

function Message({ message, handleMsgToDel }) {
  const backend = import.meta.env.VITE_BACKEND;
  const msgImg = backend + "assets/" + message.image;
  const portrait = backend + "assets/" + message.portrait;

  const createdAt = new Date(message.createdAt).toString();
  const time = createdAt.substring(0, createdAt.indexOf("GMT"));

  const isAuthor = message.userId == message.authorId ? true : false;

  return (
    <article className={styles.messageContainer} data-testid="Message">
      {" "}
      <img src={portrait} className={styles.userPortrait} role="Portrait" />
      <div className={styles.msgWithTime}>
        <div className={styles.authorInfo}>
          <div className={styles.msgUsername}>{message.username}</div>
          <div className={styles.msgTime}>{time}</div>
        </div>
        {message.image ? (
          <img
            src={msgImg}
            id={styles.msgImg}
            className={styles.messageContent}
            role="MsgImg"
          />
        ) : null}
        <div
          id={isAuthor ? styles.messageAuthor : null}
          className="general-borders"
        >
          <div
            id={isAuthor ? styles.messageContentAuthor : null}
            className={styles.messageContent}
          >
            <div id={isAuthor ? styles.msgTxtReceiver : styles.msgTxt}>
              {message.content}
            </div>
            {isAuthor && (
              <img
                src="../../../../icons/trash-can.png"
                alt="trash can"
                onClick={() => handleMsgToDel(message)}
                role="Delete"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default Message;
