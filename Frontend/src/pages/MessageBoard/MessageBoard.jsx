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
import GroupProfile from "../../features/groups/GroupProfile/GroupProfile";
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

  const [updateChats, setUpdateChats] = useState();

  const [onlineOnly, setOnlineOnly] = useState(false);

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
    setUpdateChats(Math.random());
  };

  const handleCreateGroup = (group) => {
    if (isCreateGroup) {
      setIsCreateGroup(false);
      handleChats();
      handleCurrentChat(group);
    } else {
      setIsCreateGroup(true);
    }
  };

  const handleCurrentChat = (twData) => {
    setCurrentChat(twData);
    console.log("current chat");
    console.log(twData);
    if (isCreateGroup) {
      setIsCreateGroup(false);
    }
  };

  const handleProfile = (entity) => {
    if (openProfile == userId) {
      setUserUpdated(Math.random());
    }
    if (openProfile) {
      if (typeof entity != "undefined") {
        handleChats();
        setCurrentChat(null);
      }
      setOpenProfile(false);
    }
    if (!openProfile) {
      setOpenProfile(entity);
    }
  };

  const handleOnline = () => {
    setOnlineOnly(!onlineOnly);
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

          if (onlineOnly) {
            chatsMembers = chatsMembers.filter((item) => {
              if (item.isActive == true) {
                return item;
              }
            });
          }

          setChats(chatsMembers);
        };
        fetchChats();
      } catch (e) {
        console.error(e);
      }
    }
  }, [userId, user, updateChats, content, onlineOnly]);

  useEffect(() => {
    if (chats) {
      const defaultChat = async () => {
        await setCurrentChat(chats[0]);
      };
      if (chats.length > 0 && !currentChat) {
        defaultChat();
      } else if (chats.length > 0 && !chats.includes(currentChat)) {
        defaultChat();
      }
    }
  }, [chats, currentChat]);

  return (
    <MessageContext value={{ user, chats, currentChat, content, onlineOnly }}>
      <main className={styles.MessageBoard}>
        {openProfile && (
          <div className={styles.profileFormContainer}>
            <div className={styles.profileFormContent}>
              {openProfile.title ? (
                <GroupProfile
                  group={openProfile}
                  handleProfile={handleProfile}
                />
              ) : (
                <ProfileForm
                  userId={openProfile.id}
                  handleProfile={handleProfile}
                />
              )}
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
            handleOnline={handleOnline}
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
