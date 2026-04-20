import * as styles from "./ChatBox.module.css";
import MessageInput from "../MessageInput/MessageInput";
import UserCard from "../../users/UserCard/UserCard";
import { fetchUser } from "../../../services/userServices";
import { useState, useEffect } from "react";

function ChatBox({ message }) {
  const [user, setUser] = useState({ id: "0" });
  useEffect(() => {
    let interlocutorId;
    if (message.userId != message.authorId) {
      interlocutorId = message.authorId;
    } else {
      interlocutorId = message.receiverId;
    }
    const fetchCurrentInterlocutor = async () => {
      const response = await fetchUser({ id: interlocutorId });

      setUser(response);
    };

    if (message.id != 0) {
      fetchCurrentInterlocutor();
    }
  }, [message]);

  return (
    <div id={styles.chatBox} className="general-borders" data-testid="ChatBox">
      <UserCard user={user} />
      <MessageInput />
    </div>
  );
}

export default ChatBox;
