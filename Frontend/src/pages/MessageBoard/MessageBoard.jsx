import UserCard from "../../components/users/UserCard/UserCard";
import ChatBox from "../../components/messages/ChatBox/ChatBox";
import MessageSidebar from "../../components/messages/MessageSidebar/MessageSidebar";
import { addUserId } from "../../helpers/arrayHelpers";
import { fetchUserMessages } from "../../services/messageServices";
import { fetchUser } from "../../services/userServices";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import * as styles from "./MessageBoard.module.css";

function MessageBoard() {
  let user = useLocation().state;
  const userId = user.id;

  const [messages, setMessages] = useState([{ id: 0, content: "loading..." }]);
  const [talkingWith, setTalkingWith] = useState({
    id: 0,
    name: "fetching... ",
  });
  let navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetchUserMessages({
        id: userId,
      });
      let allMessages = response;
      addUserId(allMessages, userId);

      const result = { data: allMessages };

      setMessages(result);
    };
    fetchMessages();
  }, [userId]);

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

  useEffect(() => {
    if (talkingWith.id == user.id) {
      navigate("/profile", { state: user });
    }
  }, [talkingWith, navigate, user]);

  const handleTalkingWith = (twData) => {
    const twUserData = twData;
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
      <div id={styles.loggedUser} className="general-borders">
        <UserCard user={user} handleTalkingWith={handleTalkingWith} />
      </div>
    </div>
  );
}

export default MessageBoard;
