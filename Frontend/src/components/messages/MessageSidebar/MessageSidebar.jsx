import * as styles from "./MessageSidebar.module.css";
import UserCard from "../../users/UserCard/UserCard";

function MessageSidebar() {
  return (
    <div
      id={styles.messagesSidebar}
      className="general-borders"
      data-testid="MessageSidebar"
    >
      <h3 className={styles.messagesSidebarTitle}> Messages</h3>
    </div>
  );
}

export default MessageSidebar;
