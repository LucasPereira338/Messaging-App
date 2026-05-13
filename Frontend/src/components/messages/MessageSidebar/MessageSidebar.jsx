import * as styles from "./MessageSidebar.module.css";
import UserCard from "../../users/UserCard/UserCard";
import SearchUser from "../../../features/users/SearchUser/SearchUser";
import { fetchUsersInList } from "../../../services/userServices";
import { pushUniqueIds } from "../../../helpers/arrayHelpers";
import { useState, useEffect } from "react";

function MessageSidebar({ contacts, talkingWith, handleTalkingWith }) {
  const [users, setUsers] = useState([{ id: 0, name: "pending..." }]);

  const [section, setSection] = useState("All");
  console.log(section);

  useEffect(() => {
    if (typeof contacts.data !== "undefined") {
      try {
        const fetchUsers = async () => {
          const arr = contacts.data;

          const contactsIds = [];
          pushUniqueIds(contactsIds, arr);

          const obj = { data: contactsIds };

          const response = await fetchUsersInList(obj);

          setUsers(response);
        };
        fetchUsers();
      } catch (e) {
        console.error(e);
      }
    }
  }, [contacts]);

  const handleNewUser = (data) => {
    const hasData = users.some((item) => item.id === data.id);
    if (hasData == false) {
      const newArr = users.map((item) => {
        return item;
      });

      newArr.push(data);

      setUsers(newArr);
    }
  };

  return (
    <div
      id={styles.messagesSidebar}
      className="general-borders"
      data-testid="MessageSidebar"
    >
      <h3 className={styles.messagesSidebarTitle}> Messages </h3>
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
            Contacts
          </li>
          <li
            id={styles.contentChoiceItem}
            onClick={(e) => setSection(e.target.textContent)}
          >
            Groups
          </li>
        </ul>
      </div>
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
