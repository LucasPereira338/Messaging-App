import * as styles from "./GroupProfile.module.css";
import {
  removeGroupMembers,
  deleteGroup,
} from "../../../services/groupServices";
import CloseButton from "../../../components/common/CloseButton/CloseButton";
import GroupProfileForm from "../GroupProfileForm/GroupProfileForm";

function GroupProfile({ group, handleProfile }) {
  const userId = localStorage.getItem("userId");
  const readOnly = group.adminId == userId ? false : true;

  const handleGroupExit = async () => {
    await removeGroupMembers(group.id, { users: [userId] });
    handleProfile();
  };

  const handleGroupDeletion = async () => {
    await deleteGroup(group.id);

    handleProfile();
  };

  return (
    <div className={styles.groupProfile}>
      {readOnly ? (
        <button className={styles.quitOrDelGroupBtn} onClick={handleGroupExit}>
          Leave Group
        </button>
      ) : (
        <button
          className={styles.quitOrDelGroupBtn}
          onClick={handleGroupDeletion}
        >
          Delete Group
        </button>
      )}

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
