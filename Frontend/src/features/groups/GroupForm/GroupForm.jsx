import * as styles from "./GroupForm.module.css";
import { useState } from "react";
import { createGroup } from "../../../services/groupServices";
import SearchUser from "../../users/SearchUser/SearchUser";
import EntityCard from "../../../components/entities/EntityCard/EntityCard";
import ImagePreview from "../../../components/images/ImagePreview/ImagePreview";
import { getImageFile } from "../../../helpers/fileHelpers";

function GroupForm() {
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

    console.log(result);
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
    <div className={styles.groupFormContainer}>
      <form
        encType="multipart/form-data"
        className={styles.groupForm}
        onSubmit={handleSubmit}
      >
        <label>
          Portrait: {file && <ImagePreview file={file} size="small" />}
          <input
            type="file"
            name="portrait"
            accept="image/*"
            onChange={handleFileChange}
          />{" "}
        </label>

        <label htmlFor="title">
          Title: <input type="text" name="title" />
        </label>

        <label htmlFor="users" className={styles.members}>
          Members: <SearchUser handleNewUser={handleNewUser} />
        </label>

        <input type="hidden" name="users" value={membersIds} />
        {members.map((item, ind) => {
          return <EntityCard key={ind} entity={item} />;
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GroupForm;
