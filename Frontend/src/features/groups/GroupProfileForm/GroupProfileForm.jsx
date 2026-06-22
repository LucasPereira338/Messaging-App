import * as styles from "./GroupProfileForm.module.css";
import { useState, useEffect, useRef } from "react";
import { fetchGroup, updateGroup } from "../../../services/groupServices";
import { getImageFile } from "../../../helpers/fileHelpers";
import ImagePreview from "../../../components/images/ImagePreview/ImagePreview";
import GroupMembers from "../GroupMembers/GroupMembers";

function GroupProfileForm({ groupId, readOnly }) {
  let ref = useRef(null);
  const [group, setGroup] = useState(null);
  const [title, setTitle] = useState(null);
  const [portrait, setPortrait] = useState(null);
  const [file, setFile] = useState(null);
  const [update, setUpdate] = useState(null);

  const cancelFile = () => {
    const e = ref.current;
    e.target.value = null;
    setFile(null);
  };

  const handleFileChange = (e) => {
    ref.current = e;
    const selectedFile = getImageFile(e);
    setFile(selectedFile);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setTitle(newValue);
  };

  const handleUpdate = () => {
    setUpdate(Math.random());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const result = await updateGroup(formData, groupId);

    setGroup(result);

    // handleProfile();
  };

  useEffect(() => {
    if (groupId) {
      const getGroup = async () => {
        const result = await fetchGroup(groupId);

        setGroup(result);
        setTitle(result.title);

        const backend = import.meta.env.VITE_BACKEND;

        setPortrait(backend + "assets/" + result.portrait);

        //setGroupValues(Object.values(result));
      };
      getGroup();
    }
  }, [groupId, update]);

  if (!group) {
    return <div className={styles.groupLoading}> Loading... </div>;
  }
  return (
    <form className={styles.groupProfileForm} onSubmit={handleSubmit}>
      <div className={styles.groupImgInpContainer}>
        {file ? (
          <ImagePreview file={file} cancelFile={cancelFile} />
        ) : (
          <img
            src={portrait}
            alt="group portrait"
            className={styles.groupProfilePortrait}
          />
        )}
        {!readOnly && (
          <input
            type="file"
            name="portrait"
            accept="image/*"
            onChange={handleFileChange}
          />
        )}
      </div>
      <div className={styles.labelInputContainer}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          className={styles.groupProfInp}
          readOnly={readOnly}
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className={styles.groupProfileMembersContainer}>
        <GroupMembers
          groupId={group.id}
          members={group.chat.members}
          readOnly={readOnly}
          handleUpdate={handleUpdate}
        />
      </div>
      {!readOnly ? <button type="submit">Submit</button> : null}
    </form>
  );
}

export default GroupProfileForm;
