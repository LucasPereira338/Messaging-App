import UserCard from "../../components/users/UserCard/UserCard";
import ChatBox from "../../components/messages/ChatBox/ChatBox";
import MessageSidebar from "../../components/messages/MessageSidebar/MessageSidebar";
import { addUserId } from "../../helpers/arrayHelpers";
import { fetchUserContacts } from "../../services/messageServices";
import { fetchUser } from "../../services/userServices";
//import { fetchUserGroups } from "../../services/groupServices";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import * as styles from "./MessageBoard.module.css";

function MessageBoard() {
  let user = useLocation().state;
  const userId = user.id;

  const [contacts, setContacts] = useState([{ id: 0 }]);
  const [talkingWith, setTalkingWith] = useState({
    id: 0,
    name: "fetching... ",
  });
  let navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchContacts = async () => {
        const response = await fetchUserContacts({
          id: userId,
        }); //there is a inefficiency in this, as i only really want the user ids
        console.log("response is");
        console.log(response);
        if (response.message) {
          console.log("there is a response message indeed" + response);
          localStorage.removeItem("token");
          return "logging out";
        }
        let allMessages = response;
        addUserId(allMessages, userId);

        const result = { data: allMessages };
        console.log("messages is gonna be");
        console.log(result);

        setContacts(result);
      };
      fetchContacts();
    } catch (e) {
      console.error(e);
    }
  }, [userId]);

  useEffect(() => {
    if (typeof contacts.data !== "undefined") {
      const fetchTalkingWith = async () => {
        const id =
          contacts.data[0].userId == contacts.data[0].authorId
            ? contacts.data[0].receiverId
            : contacts.data[0].authorId;
        const result = await fetchUser({ id: id });

        setTalkingWith(result);
      };
      fetchTalkingWith();
    }
  }, [contacts]);

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
        contacts={contacts}
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
