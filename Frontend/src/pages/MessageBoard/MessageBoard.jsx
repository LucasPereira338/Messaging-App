import EntityCard from "../../components/entities/EntityCard/EntityCard";
import ChatBox from "../../components/messages/ChatBox/ChatBox";
import MessageSidebar from "../../components/messages/MessageSidebar/MessageSidebar";
import { fetchUserChats } from "../../services/chatServices";
import GroupForm from "../../features/groups/GroupForm/GroupForm";
//import { fetchUser } from "../../services/userServices";
//import { fetchUserGroups } from "../../services/groupServices";
import PageSidebar from "../../components/navigation/PageSidebar/PageSidebar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import * as styles from "./MessageBoard.module.css";

function MessageBoard() {
  let user = useLocation().state;
  const userId = user.id;

  const [chats, setChats] = useState([{ id: 0 }]);
  const [currentChat, setCurrentChat] = useState({
    id: 0,
    name: "fetching... ",
  });

  const [content, setContent] = useState("All");

  const handleContent = (choice) => {
    setContent(choice);
  };

  const [isCreateGroup, setIsCreateGroup] = useState(false);

  const handleCreateGroup = () => {
    if (isCreateGroup) {
      setIsCreateGroup(false);
    } else {
      setIsCreateGroup(true);
    }
  };

  let navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchChats = async () => {
        const response = await fetchUserChats({
          id: userId,
        });

        setChats(response);
      };
      fetchChats();
    } catch (e) {
      console.error(e);
    }
  }, [userId]);

  useEffect(() => {
    if (currentChat.id == user.id) {
      navigate("/profile", { state: user });
    }
  }, [currentChat, navigate, user]);

  const handleTalkingWith = (twData) => {
    const twUserData = twData;

    setCurrentChat(twUserData);
  };

  return (
    <div className={styles.MessageBoard}>
      <PageSidebar content={content} handleContent={handleContent} />
      <MessageSidebar
        chats={chats}
        talkingWith={currentChat}
        handleTalkingWith={handleTalkingWith}
        handleCreateGroup={handleCreateGroup}
        content={content}
      />
      {isCreateGroup == false ? (
        <ChatBox currentChat={currentChat} />
      ) : (
        <GroupForm />
      )}

      <div id={styles.loggedUser} className="general-borders">
        <EntityCard user={user} handleTalkingWith={handleTalkingWith} />
      </div>
    </div>
  );
}

export default MessageBoard;

/* when i was havin issues due to chat not being properly updated
return (
    <div className={styles.MessageBoard}>
      <MessageSidebar
        chats={chats}
        talkingWith={currentChat}
        handleTalkingWith={handleTalkingWith}
      />
      <ChatBox currentChat={currentChat} />
      <div id={styles.loggedUser} className="general-borders">
        <EntityCard chat={currentChat} handleTalkingWith={handleTalkingWith} />
      </div>
    </div>
  ); */
