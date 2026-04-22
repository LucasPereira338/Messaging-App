import * as styles from "./MessageSidebar.module.css";
import UserCard from "../../users/UserCard/UserCard";
import { fetchUsersInList } from "../../../services/userServices";
import { useState, useEffect } from "react";

function MessageSidebar({ messages }) {
  const [users, setUsers] = useState([{ id: 0, name: "pending..." }]);

  useEffect(() => {
    const fetchUsers = async () => {
      const arr = messages.data;

      const messagesIds = [];
      for (let i = 0; i <= arr.length - 1; i++) {
        if (!messagesIds.includes(arr[i].authorId)) {
          messagesIds.push(arr[i].authorId);
        }
        if (!messagesIds.includes(arr[i].receiverId)) {
          messagesIds.push(arr[i].receiverId);
        }
      }

      const obj = { data: messagesIds, token: messages.token };
      const response = await fetchUsersInList(obj);

      setUsers(response);
    };
    fetchUsers();
  }, [messages]);

  return (
    <div
      id={styles.messagesSidebar}
      className="general-borders"
      data-testid="MessageSidebar"
    >
      <h3 className={styles.messagesSidebarTitle}> Messages </h3>
      {users.map((item) => {
        return <UserCard key={item.id} user={item} />;
      })}
    </div>
  );
}

export default MessageSidebar;
