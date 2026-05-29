import * as styles from "./PageSidebar.module.css";
import { MessageContext } from "../../../contexts/MessageContext";
import { useContext } from "react";

function PageSidebar({ handleContent, handleLogout }) {
  const possibleChoices = ["All", "Chats", "Groups"];
  const { content } = useContext(MessageContext);
  const commonPath = "../../../../icons/";
  return (
    <section id={styles.pageSidebar}>
      {possibleChoices.map((item, ind) => {
        return (
          <div
            key={item}
            className={styles.pageSidebarItem}
            id={possibleChoices[ind] == content ? styles.chosen : null}
            onClick={() => handleContent(item)}
          >
            <img
              src={
                item == "All"
                  ? commonPath + "all.png"
                  : item == "Chats"
                    ? commonPath + "user.png"
                    : commonPath + "group.png"
              }
              className={styles.icon}
              alt="All"
            />
            <div id={styles.pageSidebarItemTxt}>{item}</div>
          </div>
        );
      })}
      <div className={styles.pageSidebarItem}>
        <img
          src="../../../../icons/logout.png"
          className={styles.icon}
          id={styles.logoutIcon}
          onClick={handleLogout}
          alt="logout"
        />
        <div id={styles.pageSidebarItemTxt}>Logout</div>
      </div>
    </section>
  );
}

export default PageSidebar;
