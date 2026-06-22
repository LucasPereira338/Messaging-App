import * as styles from "./GroupProfileForm.module.css";
import { useState, useEffect, useRef } from "react";
import { fetchGroup, updateGroup } from "../../../services/groupServices";
import { getImageFile } from "../../../helpers/fileHelpers";
import ImagePreview from "../../../components/images/ImagePreview/ImagePreview";

function GroupProfileForm({ groupId, readOnly }) {
  let ref = useRef(null);
  const [group, setGroup] = useState(null);
  const [portrait, setPortrait] = useState(null);
  const [file, setFile] = useState(null);

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
        const backend = import.meta.env.VITE_BACKEND;

        setPortrait(backend + "assets/" + result.portrait);

        //setGroupValues(Object.values(result));
      };
      getGroup();
    }
  }, [groupId]);

  if (!group) {
    return <div className={styles.groupLoading}> Loading... </div>;
  }
  return (
    <form className={styles.groupProfileForm} onSubmit={handleSubmit}>
      <div id={styles.imgInpContainer}>
        {" "}
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
          readOnly={readOnly ? true : false}
          value={group.title}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default GroupProfileForm;
