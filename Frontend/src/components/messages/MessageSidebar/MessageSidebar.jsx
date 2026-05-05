import * as styles from "./MessageSidebar.module.css";
import UserCard from "../../users/UserCard/UserCard";
import SearchUser from "../../../features/users/SearchUser/SearchUser";
import { fetchUsersInList } from "../../../services/userServices";
import { pushUniqueIds } from "../../../helpers/arrayHelpers";
import { useState, useEffect } from "react";

function MessageSidebar({ messages, talkingWith, handleTalkingWith }) {
  const [users, setUsers] = useState([{ id: 0, name: "pending..." }]);

  useEffect(() => {
    if (typeof messages.data !== "undefined") {
      try {
        const fetchUsers = async () => {
          const arr = messages.data;

          const messagesIds = [];
          pushUniqueIds(messagesIds, arr);

          const obj = { data: messagesIds };

          const response = await fetchUsersInList(obj);

          setUsers(response);
        };
        fetchUsers();
      } catch (e) {
        console.error(e);
      }
    }
  }, [messages]);

  const handleNewUser = (data) => {
    const newArr = users.map((item) => {
      return item;
    });

    newArr.push(data);

    setUsers(newArr);
  };

  return (
    <div
      id={styles.messagesSidebar}
      className="general-borders"
      data-testid="MessageSidebar"
    >
      <h3 className={styles.messagesSidebarTitle}> Messages </h3>
      <SearchUser handleNewUser={handleNewUser} />
      {typeof users == "undefined" ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className={styles.sidebarUsersList}>
            {users.map((item) => {
              return (
                <UserCard
                  key={item.id}
                  user={item}
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
