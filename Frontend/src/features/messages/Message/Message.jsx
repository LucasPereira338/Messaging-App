import * as styles from "./Message.module.css";
//import { useState, useEffect } from "react";

function Message({ user, message }) {
  //const backend = import.meta.env.VITE_BACKEND;
  //const portrait = backend + "assets/" + user.portrait;
  const isAuthor = user.id == message.authorId ? true : false;

  return (
    <div id={styles.messageContainer} className="general-borders">
      {isAuthor ? (
        <div id={styles.messageContentAuthor}> {message.content} </div>
      ) : (
        <div id={styles.messageContentReceiver}> {message.content} </div>
      )}
    </div>
  );
}

export default Message;
