import * as styles from "./MessageBoard.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchUserChoices } from "../../helpers/helpers";
import { MessageContext } from "../../contexts/MessageContext";
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
    setContent(choice);
  };

  const handleChats = () => {
    setupdateChats(Math.random());
  };

  const handleCreateGroup = () => {
    if (isCreateGroup) {
      setIsCreateGroup(false);
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

  const handleProfile = () => {
    if (openProfile) {
      setUserUpdated(Math.random());
    }
    setOpenProfile(!openProfile);
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
  }, [userId, user, updateChats, content]);

  return (
    <MessageContext value={{ user, chats, currentChat, content }}>
      <main className={styles.MessageBoard}>
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
            <ChatBox updateChats={updateChats} handleChats={handleChats} />
          </div>
        ) : (
          <div className={styles.groupFormPageContainer}>
            <GroupForm />
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
