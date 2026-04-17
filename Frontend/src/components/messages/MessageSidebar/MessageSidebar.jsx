import * as styles from "./MessageSidebar.module.css";

function MessageSidebar() {
  return (
    <div className={styles.messagesSidebar} data-testid="MessageSidebar">
      <h3 className={styles.messagesSidebarTitle}> Messages</h3>
    </div>
  );
}

export default MessageSidebar;
