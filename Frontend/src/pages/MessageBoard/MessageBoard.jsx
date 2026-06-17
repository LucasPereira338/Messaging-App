import * as styles from "./MessageBoard.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchUserChoices } from "../../helpers/helpers";
import { MessageContext } from "../../contexts/MessageContext";
import { pushUniqueIdsAndChatId } from "../../helpers/arrayHelpers";
import { fetchUser } from "../../services/userServices";
import EntityCard from "../../components/entities/EntityCard/EntityCard";
import ChatBox from "../../components/messages/ChatBox/ChatBox";
import MessageSidebar from "../../components/messages/MessageSidebar/MessageSidebar";
import GroupForm from "../../features/groups/GroupForm/GroupForm";
import PageSidebar from "../../components/navigation/PageSidebar/PageSidebar";
import ProfileForm from "../../features/users/ProfileForm/ProfileForm";

function MessageBoard() {
  let navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState(null);

  const [chats, setChats] = useState(null);

  const [currentChat, setCurrentChat] = useState(null);

  const [content, setContent] = useState("All");

  const [isCreateGroup, setIsCreateGroup] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);

  const [userUpdated, setUserUpdated] = useState();

  const [updateChats, setupdateChats] = useState();

  const handleContent = (choice) => {
    if (choice != "Logout") {
      setContent(choice);
    } else {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handleChats = () => {
    setupdateChats(Math.random());
  };

  const handleCreateGroup = () => {
    if (isCreateGroup) {
      setIsCreateGroup(false);
      handleChats();
    } else {
      setIsCreateGroup(true);
    }
  };

  const handleCurrentChat = (twData) => {
    setCurrentChat(twData);
    if (isCreateGroup) {
      setIsCreateGroup(false);
    }
  };

  const handleProfile = (entity) => {
    if (openProfile == userId) {
      setUserUpdated(Math.random());
    }
    if (openProfile) {
      setOpenProfile(false);
    }
    if (!openProfile) {
      setOpenProfile(entity.id);
    }
  };

  useEffect(() => {
    const getLoggedUser = async () => {
      const result = await fetchUser(userId);

      setUser(result);
    };
    getLoggedUser();
  }, [userId, userUpdated]);

  useEffect(() => {
    if (content != "Logout") {
      try {
        const fetchChats = async () => {
          const response = await fetchUserChoices(content, userId);

          let chatsMembers = [];
          pushUniqueIdsAndChatId(chatsMembers, response);

          setChats(chatsMembers);
        };
        fetchChats();
      } catch (e) {
        console.error(e);
      }
    }
  }, [userId, user, updateChats, content]);

  return (
    <MessageContext value={{ user, chats, currentChat, content }}>
      <main className={styles.MessageBoard}>
        {openProfile && (
          <div className={styles.profileFormContainer}>
            <div className={styles.profileFormContent}>
              <ProfileForm userId={openProfile} handleProfile={handleProfile} />
            </div>
          </div>
        )}
        <div className={styles.pageSidebarContainer}>
          <PageSidebar handleContent={handleContent} />
        </div>
        <div className={styles.messageSidebarContainer}>
          <MessageSidebar
            handleCurrentChat={handleCurrentChat}
            handleCreateGroup={handleCreateGroup}
            handleChats={handleChats}
          />
        </div>

        {isCreateGroup == false ? (
          <div className={styles.chatBoxContainer}>
            <ChatBox
              updateChats={updateChats}
              handleChats={handleChats}
              handleProfile={handleProfile}
            />
          </div>
        ) : (
          <div className={styles.groupFormPageContainer}>
            <GroupForm handleCreateGroup={handleCreateGroup} />
          </div>
        )}

        <article id={styles.loggedUser} className="general-borders">
          <EntityCard entity={user} handleClick={handleProfile} />
        </article>
      </main>
    </MessageContext>
  );
}

export default MessageBoard;
