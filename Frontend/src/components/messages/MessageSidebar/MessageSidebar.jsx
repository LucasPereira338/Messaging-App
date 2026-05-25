import * as styles from "./MessageSidebar.module.css";
import EntityCard from "../../entities/EntityCard/EntityCard";
import SearchUser from "../../../features/users/SearchUser/SearchUser";
import ContentChoice from "../../entities/ContentChoice/ContentChoice";
import {
  arrayObjToStr,
  pushUniqueIdsAndChatId,
  filterChatGroups,
} from "../../../helpers/arrayHelpers";
import { fetchChatsMembers } from "../../../services/chatServices";
import { MessageContext } from "../../../contexts/MessageContext";
import { postNewChat } from "../../../services/chatServices";
import Checkbox from "../../ui/Checkbox/Checkbox";
import { useState, useEffect, useContext } from "react";

function MessageSidebar({ handleCurrentChat, handleCreateGroup, content }) {
  const { chats } = useContext(MessageContext);
  const { currentChat } = useContext(MessageContext);
  console.log(chats);
  const [chatsMembers, setChatsMembers] = useState([
    { id: 0, name: "pending..." },
  ]);

  const [onlineOnly, setOnlineOnly] = useState(false);

  const handleOnline = () => {
    setOnlineOnly(!onlineOnly);
  };
  console.log(content);

  useEffect(() => {
    if (typeof chats !== "undefined") {
      try {
        const fetchMembers = async () => {
          const arr = arrayObjToStr(chats);
          let response;

          response = await fetchChatsMembers(arr);
          console.log("response: ");
          console.log(response);
          let uniqueUsers = [];

          pushUniqueIdsAndChatId(uniqueUsers, response);

          console.log("unique ids with chatId");
          console.log(uniqueUsers);
          console.log;
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
            console.log("unique users and groups");
            console.log(uniqueUsersAndGroups);
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
      if (chatsMembers[0].id != 0 && currentChat.id == 0) {
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
      <h3 className={styles.messagesSidebarTitle}> Your Messages </h3>
      {content == "All" || content == "Chats" ? (
        <SearchUser handleNewUser={handleNewUser} />
      ) : (
        <button type="submit" onClick={handleCreateGroup}>
          Create Group
        </button>
      )}
      <Checkbox handleToggle={handleOnline} />
      {typeof chats == "undefined" ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className={styles.sidebarUsersList}>
            {chatsMembers.map((item) => {
              return (
                <EntityCard
                  key={item.id}
                  entity={item}
                  currentChat={currentChat}
                  handleCurrentChat={handleCurrentChat}
                  msg={item.message}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default MessageSidebar;

/* b4 context 
import * as styles from "./MessageSidebar.module.css";
import EntityCard from "../../entities/EntityCard/EntityCard";
import SearchUser from "../../../features/users/SearchUser/SearchUser";
import ContentChoice from "../../entities/ContentChoice/ContentChoice";
import {
  arrayObjToStr,
  pushUniqueIdsAndChatId,
  filterChatGroups,
} from "../../../helpers/arrayHelpers";
import { fetchChatsMembers } from "../../../services/chatServices";
import Checkbox from "../../ui/Checkbox/Checkbox";
import { useState, useEffect } from "react";

function MessageSidebar({
  chats,
  currentChat,
  handlecurrentChat,
  handleCreateGroup,
  content,
}) {
  const [chatsMembers, setChatsMembers] = useState([
    { id: 0, name: "pending..." },
  ]);

  const [onlineOnly, setOnlineOnly] = useState(false);

  const handleOnline = () => {
    setOnlineOnly(!onlineOnly);
  };
  console.log(content);

  useEffect(() => {
    if (typeof chats !== "undefined") {
      try {
        const fetchMembers = async () => {
          const arr = arrayObjToStr(chats);
          let response;

          response = await fetchChatsMembers(arr);
          console.log("response: ");
          console.log(response);
          let uniqueUsers = [];

          pushUniqueIdsAndChatId(uniqueUsers, response);

          console.log("unique ids with chatId");
          console.log(uniqueUsers);
          console.log;
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
            console.log("unique users and groups");
            console.log(uniqueUsersAndGroups);
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
      if (chatsMembers[0].id != 0 && currentChat.id == 0) {
        handlecurrentChat(chatsMembers[0]);
      }
    } catch (e) {
      console.error(e);
    }
  });

  const handleNewUser = (data) => {
    const hasData = chatsMembers.some((item) => item.id === data.id);
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
      <h3 className={styles.messagesSidebarTitle}> Your Messages </h3>
      {content == "All" || content == "Chats" ? (
        <SearchUser handleNewUser={handleNewUser} />
      ) : (
        <button type="submit" onClick={handleCreateGroup}>
          Create Group
        </button>
      )}
      <Checkbox handleToggle={handleOnline} />
      {typeof chats == "undefined" ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className={styles.sidebarUsersList}>
            {chatsMembers.map((item) => {
              return (
                <EntityCard
                  key={item.id}
                  entity={item}
                  currentChat={currentChat}
                  handlecurrentChat={handlecurrentChat}
                  msg={item.message}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default MessageSidebar;
 */
