import * as styles from "./PageSidebar.module.css";

function PageSidebar({ content, handleContent }) {
  const possibleChoices = ["All", "Chats", "Groups"];
  return (
    <section className={styles.pageSidebar}>
      <div
        className={styles.pageSidebarItem}
        id={possibleChoices[0] == content ? styles.chosen : null}
        onClick={handleContent}
      >
        <img src="../../../../icons/all.png" className={styles.icon} alt="" />
      </div>
      <div
        className={styles.pageSidebarItem}
        id={possibleChoices[1] == content ? styles.chosen : null}
        onClick={handleContent}
      >
        <img src="../../../../icons/user.png" className={styles.icon} alt="" />
      </div>
      <div
        className={styles.pageSidebarItem}
        id={possibleChoices[2] == content ? styles.chosen : null}
        onClick={handleContent}
      >
        <img src="../../../../icons/group.png" className={styles.icon} alt="" />
      </div>

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
