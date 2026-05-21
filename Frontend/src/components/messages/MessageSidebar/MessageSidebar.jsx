import * as styles from "./MessageSidebar.module.css";
import EntityCard from "../../entities/EntityCard/EntityCard";
import SearchUser from "../../../features/users/SearchUser/SearchUser";
import ContentChoice from "../../entities/ContentChoice/ContentChoice";
import {
  arrayOfObjToArrayOfStr,
  pushUniqueIdsAndChatId,
} from "../../../helpers/arrayHelpers";
import { fetchChatsMembers } from "../../../services/chatServices";
import { useState, useEffect } from "react";

function MessageSidebar({
  chats,
  talkingWith,
  handleTalkingWith,
  handleCreateGroup,
  content,
}) {
  const [chatsMembers, setChatsMembers] = useState([
    { id: 0, name: "pending..." },
  ]);

  console.log(content);

  useEffect(() => {
    if (typeof chats !== "undefined") {
      try {
        const fetchMembers = async () => {
          const arr = arrayOfObjToArrayOfStr(chats);
          let response;

          response = await fetchChatsMembers(arr);
          console.log("after the fetch");
          console.log(response);
          const uniqueUsers = [];

          uniqueUsers.forEach((item) => {
            if (item.group != null) {
              item.members = null;
            }
          });

          pushUniqueIdsAndChatId(uniqueUsers, response);

          let groups = [];
          response.forEach((item) => {
            if (item.group != null) {
              item.group.chatId = item.id;
              item.group.message = item.messages[0];
              groups.push(item.group);
            }
          });
          console.log("after the forEach");
          console.log(groups);
          const uniqueUsersAndGroups = uniqueUsers;
          groups.forEach((item) => {
            uniqueUsersAndGroups.push(item);
          });
          console.log("uniqueUsersAndGroups");
          console.log(uniqueUsersAndGroups);
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
  }, [chats, content]);

  useEffect(() => {
    try {
      if (chatsMembers[0].id != 0 && talkingWith.id == 0) {
        handleTalkingWith(chatsMembers[0]);
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
      <button type="submit" onClick={handleCreateGroup}>
        Create Group
      </button>
      <SearchUser handleNewUser={handleNewUser} />

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
                  talkingWith={talkingWith}
                  handleTalkingWith={handleTalkingWith}
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
