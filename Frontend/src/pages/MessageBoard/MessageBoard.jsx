import { useLocation } from "react-router";
import UserCard from "../../components/users/UserCard/UserCard";
import ChatBox from "../../components/messages/ChatBox/ChatBox";
import MessageSidebar from "../../components/messages/MessageSidebar/MessageSidebar";
import { addUserId } from "../../helpers/arrayHelpers";
import { fetchUserMessages } from "../../services/messageServices";
import { fetchUser } from "../../services/userServices";
import { useEffect, useState } from "react";
import * as styles from "./MessageBoard.module.css";

function MessageBoard() {
  let user = useLocation().state;
  const userId = user.id;
  const token = user.token;

  const [messages, setMessages] = useState([{ id: 0, content: "loading..." }]);
  const [talkingWith, setTalkingWith] = useState({
    id: 0,
    name: "fetching... ",
  });

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetchUserMessages({
        id: userId,
        token: token,
      });
      let allMessages = response;
      addUserId(allMessages, userId);

      const result = { data: allMessages, token: token };

      setMessages(result);
    };
    fetchMessages();
  }, [token, userId]);

  useEffect(() => {
    if (typeof messages.data !== "undefined") {
      const fetchTalkingWith = async () => {
        const id =
          messages.data[0].userId == messages.data[0].authorId
            ? messages.data[0].receiverId
            : messages.data[0].authorId;
        const result = await fetchUser({ id: id });

        setTalkingWith(result);
      };
      fetchTalkingWith();
    }
  }, [messages]);

  const handleTalkingWith = (twData) => {
    const twUserData = twData;
    twUserData.token = token;
    setTalkingWith(twUserData);
  };

  return (
    <div className={styles.MessageBoard}>
      <MessageSidebar
        messages={messages}
        talkingWith={talkingWith}
        handleTalkingWith={handleTalkingWith}
      />
      <ChatBox user={user} talkingWith={talkingWith} />
      <div id="loggedUser" className="general-borders">
        <UserCard user={user} />
      </div>
    </div>
  );
}

export default MessageBoard;
