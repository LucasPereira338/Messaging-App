import * as styles from "./PageSidebar.module.css";

function PageSidebar({ content, handleContent }) {
  const possibleChoices = ["All", "Chats", "Groups"];
  const commonPath = "../../../../icons/";
  return (
    <section id={styles.pageSidebar}>
      {possibleChoices.map((item, ind) => {
        return (
          <div
            key={item}
            className={styles.pageSidebarItem}
            id={possibleChoices[ind] == content ? styles.chosen : null}
            o
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
              onClick={() => handleContent(item)}
              alt="All"
            />
          </div>
        );
      })}

      <img
        src="../../../../icons/logout.png"
        className={styles.icon}
        id={styles.logoutIcon}
        alt=""
      />
    </section>
  );
}

export default PageSidebar;
