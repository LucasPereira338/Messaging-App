import * as styles from "./MessageSidebar.module.css";
import UserCard from "../../users/UserCard/UserCard";
import { fetchUsersInList } from "../../../services/userServices";
import { pushUniqueIds } from "../../../helpers/arrayHelpers";
import { useState, useEffect } from "react";

function MessageSidebar({ messages }) {
  const [users, setUsers] = useState([{ id: 0, name: "pending..." }]);
  const [talkingWith, setTalkingWith] = useState("none");

  useEffect(() => {
    if (typeof messages !== "undefined") {
      const fetchUsers = async () => {
        const arr = messages.data;

        const messagesIds = [];
        pushUniqueIds(messagesIds, arr);

        const obj = { data: messagesIds, token: messages.token };
        const response = await fetchUsersInList(obj);

        setUsers(response);
      };
      fetchUsers();
    }
  }, [messages]);

  const handleTalkingWith = (id) => {
    setTalkingWith(id);
  };

  return (
    <div
      id={styles.messagesSidebar}
      className="general-borders"
      data-testid="MessageSidebar"
    >
      <h3 className={styles.messagesSidebarTitle}> Messages </h3>
      {typeof messages == "undefined" ? (
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
