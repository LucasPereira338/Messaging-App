import * as styles from "./GroupForm.module.css";
import { useState, useRef } from "react";
import { createGroup } from "../../../services/groupServices";
import { getImageFile } from "../../../helpers/fileHelpers";
import SearchUser from "../../users/SearchUser/SearchUser";
import EntityCard from "../../../components/entities/EntityCard/EntityCard";
import ImagePreview from "../../../components/images/ImagePreview/ImagePreview";
import CloseButton from "../../../components/common/CloseButton/CloseButton";

function GroupForm({ handleCreateGroup }) {
  const defaultImg =
    import.meta.env.VITE_BACKEND + "assets/profiles/portraits/blank.svg";

  let ref = useRef(null);

  const [membersIds, setMembersIds] = useState("");
  const [members, setMembers] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    ref.current = e;
    const selectedFile = getImageFile(e);
    setFile(selectedFile);
  };

  const cancelFile = () => {
    const e = ref.current;
    e.target.value = null;
    setFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (members.length == 0) {
      alert("Please choose at least one member");
    } else {
      const formData = new FormData(event.currentTarget);

      const result = await createGroup(formData);

      if (result.title) {
        alert(`Group "${result.title}" created successfully!`);
        handleCreateGroup();
      }
    }
  };

  const handleNewUser = (item) => {
    let newStrList;
    if (!membersIds) {
      newStrList = item.id;
    } else {
      newStrList = membersIds + "," + item.id;
    }
    setMembersIds(newStrList);
    const newArr = members.concat(item);
    setMembers(newArr);
  };

  const handleRemoveMember = (rmvInd) => {
    let newStrList = members.filter((item, ind) => {
      if (ind != rmvInd) {
        return item;
      }
    });
    console.log(newStrList);
    const newStrListIds = newStrList.map((item) => {
      return item;
    });
    setMembers(newStrList);
    console.log(newStrList);
    setMembersIds(newStrListIds);
    console.log(newStrListIds);
  };

  return (
    <div
      id={styles.groupFormContainer}
      className="general-borders"
      data-testid="GroupFormContainer"
    >
      <header className="general-borders" id={styles.groupFormHeader}>
        <h3>Group Creation</h3>
      </header>
      <form
        encType="multipart/form-data"
        className="general-borders"
        id={styles.groupForm}
        onSubmit={handleSubmit}
        role="form"
      >
        <div className={styles.groupFormContent}>
          <label id={styles.imgLabel}>
            Portrait:{" "}
            {file ? (
              <ImagePreview file={file} cancelFile={cancelFile} size="medium" />
            ) : (
              <img src={defaultImg} id={styles.defaultGroupImg} />
            )}
            <input
              type="file"
              name="portrait"
              accept="image/*"
              onChange={handleFileChange}
            />{" "}
          </label>

          <label
            htmlFor="title"
            id={styles.groupFormTitle}
            className={styles.groupFormInp}
          >
            Title: <input type="text" name="title" autoComplete="off" />
          </label>

          <label
            htmlFor="users"
            id={styles.groupFormMembers}
            className={styles.groupFormInp}
          >
            Members: <SearchUser handleNewUser={handleNewUser} width="group" />
          </label>

          <input type="hidden" name="users" value={membersIds} />
          <div id={styles.groupMembers}>
            {members.map((item, ind) => {
              return (
                <div id={styles.groupMember}>
                  {" "}
                  <div className={styles.groupMemberCard}>
                    <EntityCard key={item.id} entity={item} />
                  </div>
                  <div className={styles.groupMemberRmv}>
                    <CloseButton handleClick={() => handleRemoveMember(ind)} />
                  </div>
                </div>
              );
            })}
          </div>
          <button type="submit" id={styles.groupFormBtn}>
            Create Group
          </button>
        </div>
      </form>
    </div>
  );
}

export default GroupForm;
