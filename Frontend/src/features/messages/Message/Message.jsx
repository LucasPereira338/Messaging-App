import * as styles from "./Message.module.css";
//import { useState, useEffect } from "react";

function Message({ message }) {
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
          {message.content}
        </div>
      ) : (
        <div
          id={styles.messageContentReceiver}
          className={styles.messageContent}
        >
          {message.content}
        </div>
      )}
    </div>
  );
}

export default Message;
