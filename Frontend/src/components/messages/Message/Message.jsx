import * as styles from "./Message.module.css";
//import { useState, useEffect } from "react";

function Message({ message, setMsgToDel }) {
  //const backend = import.meta.env.VITE_BACKEND;
  //const portrait = backend + "assets/" + user.portrait;
  const isAuthor = message.userId == message.authorId ? true : false;

  return (
    <div
      id={isAuthor ? styles.messageContainerAuthor : styles.messageContainer}
      className="general-borders"
      aria-label="message"
    >
      {isAuthor ? (
        <div id={styles.messageContentAuthor} className={styles.messageContent}>
          <div className={styles.msgTxt}>{message.content}</div>
          <img
            src="../../../../public/icons/trash-can.png"
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
