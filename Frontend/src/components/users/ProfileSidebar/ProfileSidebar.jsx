import * as styles from "./ProfileSidebar.module.css";

function ProfileSidebar({ handleChoice, choice }) {
  const possibleChoices = ["Profile", "Edit", "Change Password"];

  return (
    <div id={styles.profileSidebar} className="general-borders">
      <div id={styles.profileSidebarUserContainer} className="general-borders">
        <h3>Username's Profile</h3>
      </div>
      {possibleChoices.map((item, ind) => {
        return (
          <div
            key={item}
            className={styles.profileSidebarItem}
            id={possibleChoices[ind] == choice ? styles.chosen : null}
            onClick={() => handleChoice(item)}
          >
            <div id={styles.profileSidebarItemTxt}>{item}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ProfileSidebar;
