import * as styles from "./MessageSidebar.module.css";
import { useState, useEffect, useContext } from "react";
import {
  arrayObjToStr,
  pushUniqueIdsAndChatId,
  filterChatGroups,
} from "../../../helpers/arrayHelpers";
import { fetchChatsMembers } from "../../../services/chatServices";
import { MessageContext } from "../../../contexts/MessageContext";
import { postNewChat } from "../../../services/chatServices";
import EntityCard from "../../entities/EntityCard/EntityCard";
import SearchUser from "../../../features/users/SearchUser/SearchUser";
import Checkbox from "../../ui/Checkbox/Checkbox";

//There's a logic issue to be fixed in the differentiation between not having any chats vs fetching the chats
function MessageSidebar({ handleCurrentChat, handleCreateGroup }) {
  const { chats } = useContext(MessageContext);
  const { currentChat } = useContext(MessageContext);
  const { content } = useContext(MessageContext);

  const [chatsMembers, setChatsMembers] = useState([]);

  const [onlineOnly, setOnlineOnly] = useState(false);

  const handleOnline = () => {
    setOnlineOnly(!onlineOnly);
  };

  useEffect(() => {
    if (chats.length > 0) {
      try {
        const fetchMembers = async () => {
          const arr = arrayObjToStr(chats);
          let response;

          response = await fetchChatsMembers(arr);

          let uniqueUsers = [];

          pushUniqueIdsAndChatId(uniqueUsers, response);

          let groups = [];
          filterChatGroups(groups, response);

          let uniqueUsersAndGroups = uniqueUsers;
          groups.forEach((item) => {
            uniqueUsersAndGroups.push(item);
          });
          if (onlineOnly) {
            uniqueUsersAndGroups = uniqueUsersAndGroups.filter((item) => {
              if (item.isActive || item.title) {
                return item;
              }
            });
          }
          if (content == "Groups") {
            setChatsMembers(groups);
          } else {
            setChatsMembers(uniqueUsersAndGroups);
          }
        };
        fetchMembers();
      } catch (e) {
        console.error(e);
      }
    }
  }, [chats, content, onlineOnly]);

  useEffect(() => {
    try {
      if (chatsMembers.length > 0 && !currentChat) {
        handleCurrentChat(chatsMembers[0]);
      }
    } catch (e) {
      console.error(e);
    }
  });

  const handleNewUser = async (data) => {
    const hasData = chatsMembers.some((item) => item.id === data.id);
    if (data.chatId == null) {
      const chat = await postNewChat(data);
      data.chatId = chat.id;
    }
    if (hasData == false) {
      const newArr = chatsMembers.map((item) => {
        return item;
      });

      newArr.push(data);

      setChatsMembers(newArr);
    }
  };

  return (
    <section
      id={styles.messagesSidebar}
      className="general-borders"
      data-testid="MessageSidebar"
    >
      <h3 id={styles.messagesSidebarTitle}> Your Messages </h3>
      {content == "All" || content == "Chats" ? (
        <div>
          <SearchUser handleNewUser={handleNewUser} />
          <Checkbox handleToggle={handleOnline} />
        </div>
      ) : (
        <button type="submit" onClick={handleCreateGroup}>
          Create Group
        </button>
      )}

      {chatsMembers.length > 0 && !currentChat ? (
        <div className={styles.MessageSidebarLoading}>Loading Chats...</div>
      ) : (
        <div>
          {chatsMembers.length == 0 ? (
            <h5
              className={styles.messageSidebarNoChats}
              data-testid="NoChatHeader"
            >
              You don't have any chats yet!
            </h5>
          ) : (
            <div>
              <div
                className={styles.sidebarUsersList}
                data-testid="ChatsMembers"
                role="presentation"
              >
                {chatsMembers.map((item) => {
                  return (
                    <EntityCard
                      key={item.id}
                      entity={item}
                      currentChat={currentChat}
                      handleClick={handleCurrentChat}
                      msg={item.message}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default MessageSidebar;
