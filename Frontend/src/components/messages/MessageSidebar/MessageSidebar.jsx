import * as styles from "./MessageSidebar.module.css";
import UserCard from "../../users/UserCard/UserCard";
import { fetchUsersInList } from "../../../services/userServices";
import { useState, useEffect } from "react";

function MessageSidebar({ messages }) {
  const [users, setUsers] = useState([{ id: 0, content: "pending..." }]);

  useEffect(() => {
    const fetchUsers = async () => {
      const arr = messages.data;
      console.log("arr; ");
      console.log(arr);
      const messagesIds = [];
      for (let i = 0; i <= arr.length - 1; i++) {
        if (!messagesIds.includes(arr[i].authorId)) {
          messagesIds.push(arr[i].authorId);
        }
        if (!messagesIds.includes(arr[i].receiverId)) {
          messagesIds.push(arr[i].receiverId);
        }
      }
      console.log("messages ids: ");
      console.log(messagesIds);
      const obj = { data: messagesIds, token: messages.token };
      const response = await fetchUsersInList(obj);
      console.log("users fetched from list: ");
      console.log(response);
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
        return <UserCard key={item.id} user={item} message={messages[0]} />;
      })}
    </div>
  );
}

export default MessageSidebar;
