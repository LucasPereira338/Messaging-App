import * as styles from "./MessageSidebar.module.css";
import UserCard from "../../users/UserCard/UserCard";
import SearchUser from "../../../features/users/SearchUser/SearchUser";
import {
  arrayOfObjToArrayOfStr,
  pushUniqueIdsAndChatId,
} from "../../../helpers/arrayHelpers";
//import { fetchUsersInList } from "../../../services/userServices";
import { fetchChatsMembers } from "../../../services/chatServices";
import { useState, useEffect } from "react";

function MessageSidebar({
  chats,
  talkingWith,
  handleTalkingWith,
  handleCreateGroup,
}) {
  const [chatsMembers, setChatsMembers] = useState([
    { id: 0, name: "pending..." },
  ]);

  const [section, setSection] = useState("All");
  console.log(section);

  useEffect(() => {
    if (typeof chats !== "undefined") {
      try {
        const fetchUsers = async () => {
          const arr = arrayOfObjToArrayOfStr(chats);

          const response = await fetchChatsMembers(arr);

          const uniqueUsers = [];

          pushUniqueIdsAndChatId(uniqueUsers, response);

          let groups = [];
          response.forEach((item) => {
            if (item.group != null) {
              item.group.chatId = item.id;
              groups.push(item.group);
            }
          });
          const uniqueUsersAndGroups = uniqueUsers;
          groups.forEach((item) => {
            uniqueUsersAndGroups.push(item);
          });

          setChatsMembers(uniqueUsersAndGroups);
        };
        fetchUsers();
      } catch (e) {
        console.error(e);
      }
    }
  }, [chats]);

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
    <div
      id={styles.messagesSidebar}
      className="general-borders"
      data-testid="MessageSidebar"
    >
      <h3 className={styles.messagesSidebarTitle}> Messages </h3>
      <button type="submit" onClick={handleCreateGroup}>
        Create Group
      </button>
      <SearchUser handleNewUser={handleNewUser} />
      <div>Create Group</div>
      <div className={styles.contentChoiceContainer}>
        <ul className={styles.contentChoiceList}>
          <li
            id={styles.contentChoiceItem}
            onClick={(e) => setSection(e.target.textContent)}
          >
            All
          </li>
          <li
            id={styles.contentChoiceItem}
            onClick={(e) => setSection(e.target.textContent)}
          >
            Chats
          </li>
          <li
            id={styles.contentChoiceItem}
            onClick={(e) => setSection(e.target.textContent)}
          >
            Groups
          </li>
        </ul>
      </div>
      {typeof chats == "undefined" ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className={styles.sidebarUsersList}>
            {chatsMembers.map((item) => {
              return (
                <UserCard
                  key={item.id}
                  user={item.username ? item : "null"}
                  group={item.title ? item : "null"}
                  talkingWith={talkingWith}
                  handleTalkingWith={handleTalkingWith}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageSidebar;
