import * as styles from "./GroupForm.module.css";
import { useState } from "react";
import { createGroup } from "../../../services/groupServices";
import { getImageFile } from "../../../helpers/fileHelpers";
import SearchUser from "../../users/SearchUser/SearchUser";
import EntityCard from "../../../components/entities/EntityCard/EntityCard";
import ImagePreview from "../../../components/images/ImagePreview/ImagePreview";

function GroupForm() {
  const defaultImg =
    import.meta.env.VITE_BACKEND + "assets/profiles/portraits/blank.svg";

  const [membersIds, setMembersIds] = useState("");
  const [members, setMembers] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = getImageFile(e);
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await createGroup(formData);

    alert(`Group "${result.title}" created successfully!`);
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
              <ImagePreview file={file} size="medium" />
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

          <label htmlFor="title" className={styles.groupFormInp}>
            Title: <input type="text" name="title" autoComplete="off" />
          </label>

          <label
            htmlFor="users"
            className={styles.groupFormInp}
            id={styles.members}
          >
            Members: <SearchUser handleNewUser={handleNewUser} width="group" />
          </label>

          <input type="hidden" name="users" value={membersIds} />
          {members.map((item) => {
            return <EntityCard key={item.id} entity={item} />;
          })}
          <button type="submit" id={styles.groupFormBtn}>
            Create Group
          </button>
        </div>
      </form>
    </div>
  );
}

export default GroupForm;
