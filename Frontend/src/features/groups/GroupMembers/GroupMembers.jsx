import * as styles from "./GroupMembers.module.css";
import { useState } from "react";
import { removeGroupMembers } from "../../../services/groupServices";
import EntityCard from "../../../components/entities/EntityCard/EntityCard";
import SearchUser from "../../users/SearchUser/SearchUser";

function GroupMembers({
  groupId,
  members,
  readOnly,
  handleUpdate,
  handleMembers,
}) {
  const [removeMembers, setRemoveMembers] = useState([]);

  const [addToggle, setAddToggle] = useState(false);

  const [addMember, setAddMember] = useState(null);

  const handleAddMember = (member) => {
    handleMembers(member, "add");
  };

  const handleRmvMember = (member) => {
    console.log(member);
    handleMembers(member, "rmv");
    let newArr = removeMembers.map((item) => {
      return item;
    });
    newArr.push(member.id);
    setRemoveMembers(newArr);
  };

  const handleConfirmation = async () => {
    await removeGroupMembers(groupId, { users: removeMembers });

    handleUpdate();
  };
  console.log(addToggle);
  return (
    <div className={styles.groupProfileMembersContainer}>
      <h3 className={styles.groupProfileMemberTitle}>Members</h3>
      <div className={styles.groupProfileMembers}>
        {members.map((member, ind) => {
          return (
            <div className={styles.groupProfileMembersCards}>
              <div className={styles.groupProfileMemberCard}>
                <EntityCard key={ind} entity={member} />
              </div>
              {member.id != localStorage.getItem("userId") && !readOnly ? (
                <button
                  type="button"
                  onClick={() => handleRmvMember(member)}
                  className={styles.memberBtn}
                >
                  Remove Member
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
      {addToggle ? (
        <div className={styles.groupMemberAdd}>
          <SearchUser />{" "}
        </div>
      ) : (
        <button type="button" onClick={setAddToggle}>
          +
        </button>
      )}
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
