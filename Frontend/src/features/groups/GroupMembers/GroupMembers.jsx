import * as styles from "./GroupMembers.module.css";
import { useState } from "react";
import { removeGroupMembers } from "../../../services/groupServices";
import EntityCard from "../../../components/entities/EntityCard/EntityCard";

function GroupMembers({ groupId, members, readOnly, handleGroup }) {
  const [removeMembers, setRemoveMembers] = useState([]);

  const handleMember = (memberId) => {
    let newArr = removeMembers.map((item) => {
      return item;
    });
    newArr.push(memberId);
    setRemoveMembers(newArr);
  };

  const handleConfirmation = async () => {
    await removeGroupMembers(groupId, removeMembers);

    handleGroup();
  };

  return (
    <div className={styles.groupProfileMembersContainer}>
      <h3 className={styles.groupProfileMemberTitle}>Members</h3>
      <div className={styles.groupProfileMembers}>
        {members.map((member) => {
          return (
            <div className={styles.groupProfileMembersCards}>
              <div className={styles.groupProfileMemberCard}>
                <EntityCard key={member.id} entity={member} />
              </div>
              {member.id != localStorage.getItem("userId") && !readOnly ? (
                <button
                  type="button"
                  onClick={() => handleMember(member.id)}
                  className={styles.memberBtn}
                >
                  Remove Member
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
      {!readOnly && (
        <button
          type="button"
          onClick={handleConfirmation}
          className={styles.confirmBtn}
        >
          {" "}
          Confirm Removal of Members
        </button>
      )}
    </div>
  );
}

export default GroupMembers;
