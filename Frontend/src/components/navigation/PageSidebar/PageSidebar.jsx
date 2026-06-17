import * as styles from "./PageSidebar.module.css";
import { useContext } from "react";
import { MessageContext } from "../../../contexts/MessageContext";

function PageSidebar({ handleContent }) {
  const possibleChoices = ["All", "Chats", "Groups"];
  const { content } = useContext(MessageContext);
  const commonPath = "../../../../icons/";
  return (
    <aside id={styles.pageSidebar} data-testid="PageSidebar">
      {handleContent
        ? possibleChoices.map((item, ind) => {
            return (
              <div
                key={item}
                className={styles.pageSidebarItem}
                id={possibleChoices[ind] == content ? styles.chosen : null}
                onClick={() => handleContent(item)}
                data-testid={"ContentChoice" + item}
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
                  alt={item}
                />
                <div id={styles.pageSidebarItemTxt}>{item}</div>
              </div>
            );
          })
        : null}

      <div
        className={styles.pageSidebarItem}
        id={styles.logoutContainer}
        onClick={() => handleContent("Logout")}
        data-testid="LogoutChoice"
      >
        <img
          src="../../../../icons/logout.png"
          className={styles.icon}
          id={styles.logoutIcon}
          alt="logout"
        />
        <div id={styles.pageSidebarItemTxt}>Logout</div>
      </div>
    </aside>
  );
}

export default PageSidebar;
