import EntityCard from "../../components/entities/EntityCard/EntityCard";
import ChatBox from "../../components/messages/ChatBox/ChatBox";
import MessageSidebar from "../../components/messages/MessageSidebar/MessageSidebar";
import GroupForm from "../../features/groups/GroupForm/GroupForm";
import PageSidebar from "../../components/navigation/PageSidebar/PageSidebar";
import ProfileForm from "../../features/users/ProfileForm/ProfileForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchUserChoices } from "../../helpers/helpers";
import { MessageContext } from "../../contexts/MessageContext";
import { fetchUser } from "../../services/userServices";
import * as styles from "./MessageBoard.module.css";

function MessageBoard() {
  let navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({ id: "fetching..." });

  const [chats, setChats] = useState([{ id: 0 }]);

  const [currentChat, setCurrentChat] = useState({ id: 0 });

  const [content, setContent] = useState("All");

  const [isCreateGroup, setIsCreateGroup] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);

  const [userUpdated, setUserUpdated] = useState();

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
    //this certainly works, but it is a weird (and lazy) way to do it, i should change this later
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
    setUserUpdated(Math.random());
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const getLoggedUser = async () => {
      const result = await fetchUser(userId);

      setUser(result);
    };
    getLoggedUser();
  }, [userId, userUpdated]);

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
    if (currentChat.id == userId) {
      const openProf = async () => {
        setOpenProfile(true);
      };
      openProf();
    }
  }, [currentChat, userId]);

  return (
    <MessageContext value={{ chats, currentChat, content }}>
      <main
        className={styles.MessageBoard}
        id={isCreateGroup ? styles.popUpBackground : null}
      >
        {openProfile && (
          <div className={styles.profileFormContainer}>
            <div className={styles.profileFormContent}>
              <ProfileForm userId={userId} handleProfile={handleProfile} />
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
          <EntityCard
            entity={user.username ? user : { name: "aaaa" }}
            handleCurrentChat={handleCurrentChat}
          />
        </article>
      </main>
    </MessageContext>
  );
}

export default MessageBoard;
