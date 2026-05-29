import EntityCard from "../../components/entities/EntityCard/EntityCard";
import ChatBox from "../../components/messages/ChatBox/ChatBox";
import MessageSidebar from "../../components/messages/MessageSidebar/MessageSidebar";
import GroupForm from "../../features/groups/GroupForm/GroupForm";
import PageSidebar from "../../components/navigation/PageSidebar/PageSidebar";
import ProfileForm from "../../features/users/ProfileForm/ProfileForm";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { fetchUserChoices } from "../../helpers/helpers";
import { MessageContext } from "../../contexts/MessageContext";
import * as styles from "./MessageBoard.module.css";

function MessageBoard() {
  let user = useLocation().state;
  let navigate = useNavigate();

  const userId = user.id;

  const [chats, setChats] = useState([{ id: 0 }]);

  const [currentChat, setCurrentChat] = useState({ id: 0 });

  const [content, setContent] = useState("All");

  const [isCreateGroup, setIsCreateGroup] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);

  const handleContent = (choice) => {
    setContent(choice);
  };

  const handleCreateGroup = () => {
    if (isCreateGroup) {
      setIsCreateGroup(false);
    } else {
      setIsCreateGroup(true);
    }
  };

  const handleCurrentChat = (twData) => {
    //this is inefficient and lazy as fuck, i should change this later
    if (twData.id == user.id) {
      const actualChat = currentChat;

      setCurrentChat(twData);
      setTimeout(() => {
        setCurrentChat(actualChat);
      }, 10);
    } else {
      setCurrentChat(twData);
    }
  };

  const handleProfile = () => {
    setOpenProfile(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    try {
      const fetchChats = async () => {
        const response = await fetchUserChoices(content, userId);

        setChats(response);
      };
      fetchChats();
    } catch (e) {
      console.error(e);
    }
  }, [userId, content]);

  useEffect(() => {
    if (currentChat.id == user.id) {
      const openProf = async () => {
        setOpenProfile(true);
      };
      openProf();
    }
  }, [currentChat, user]);

  return (
    <MessageContext value={{ chats, currentChat, content }}>
      <main
        className={styles.MessageBoard}
        id={isCreateGroup ? styles.popUpBackground : null}
      >
        {openProfile && (
          <div className={styles.profileFormContainer}>
            <div className={styles.profileFormContent}>
              <ProfileForm userId={user.id} handleProfile={handleProfile} />
            </div>
          </div>
        )}
        <div className={styles.pageSidebarContainer}>
          <PageSidebar
            handleContent={handleContent}
            handleLogout={handleLogout}
          />
        </div>
        <div className={styles.messageSidebarContainer}>
          <MessageSidebar
            handleCurrentChat={handleCurrentChat}
            handleCreateGroup={handleCreateGroup}
          />
        </div>

        {isCreateGroup == false ? (
          <div className={styles.chatBoxContainer}>
            <ChatBox />
          </div>
        ) : (
          <GroupForm />
        )}

        <article id={styles.loggedUser} className="general-borders">
          <EntityCard entity={user} handleCurrentChat={handleCurrentChat} />
        </article>
      </main>
    </MessageContext>
  );
}

export default MessageBoard;
