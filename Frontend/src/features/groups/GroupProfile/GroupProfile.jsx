import * as styles from "./GroupProfile.module.css";
import CloseButton from "../../../components/common/CloseButton/CloseButton";
import GroupProfileForm from "../GroupProfileForm/GroupProfileForm";

function GroupProfile({ group, handleProfile }) {
  const userId = localStorage.getItem("userId");
  const readOnly = group.adminId == userId ? false : true;

  return (
    <div className={styles.groupProfile}>
      <div className={styles.groupProfileCloseBtn}>
        <CloseButton handleClick={handleProfile} />
      </div>
      <div className={styles.groupProfileFormContainer}>
        <GroupProfileForm groupId={group.id} readOnly={readOnly} />
      </div>
    </div>
  );
}

export default GroupProfile;
