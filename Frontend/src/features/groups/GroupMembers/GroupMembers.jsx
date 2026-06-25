import * as styles from "./GroupMembers.module.css";
import EntityCard from "../../../components/entities/EntityCard/EntityCard";
import SearchUser from "../../users/SearchUser/SearchUser";

function GroupMembers({ members, readOnly, handleMember }) {
  const handleAddMember = (member) => {
    handleMember(member, "add");
  };

  const handleRmvMember = (member) => {
    handleMember(member, "rmv");
  };

  return (
    <div
      className={styles.groupProfileMembersContainer}
      data-testid="GroupMembers"
    >
      <div className={styles.groupProfileMemberTitle}>
        <h3>Members</h3>
        {!readOnly && (
          <div className={styles.groupMemberAdd}>
            <SearchUser
              msg={"search for new members to add to the group"}
              handleNewUser={handleAddMember}
            />
          </div>
        )}
      </div>
      <div className={styles.groupProfileMembers}>
        {members.map((member) => {
          return (
            <div key={member.id} className={styles.groupProfileMembersCards}>
              <div className={styles.groupProfileMemberCard}>
                <EntityCard entity={member} />
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
    </div>
  );
}

export default GroupMembers;
