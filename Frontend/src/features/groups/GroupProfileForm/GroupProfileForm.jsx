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
  const [members, setMembers] = useState([]);
  const [membersToAdd, setMembersToAdd] = useState([]);
  const [membersToRmv, setMembersToRmv] = useState([]);
  const [file, setFile] = useState(null);
  const [update, setUpdate] = useState(null);

  const cancelFile = () => {
    const e = ref.current;
    e.target.value = null;
    setFile(null);
  };

  const handleMember = (member, op) => {
    console.log("hand m");
    console.log(member);
    let newArr = [];
    if (op == "rmv") {
      newArr = members.filter((item) => {
        if (item.id != member.id) {
          return item;
        }
      });
      const newRmvArr = [member.id]; //[...membersToRmv, member.id];
      setMembersToRmv(newRmvArr);
    } else {
      newArr = members.map((item) => {
        return item;
      });
      const newAddArr = [member.id];
      setMembersToAdd(newAddArr);
      newArr.push(member);
    }

    setMembers(newArr);
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

    const result = await updateGroup(groupId, formData);

    setGroup(result);

    // handleProfile();
  };

  useEffect(() => {
    if (groupId) {
      const getGroup = async () => {
        const result = await fetchGroup(groupId);

        setGroup(result);
        setTitle(result.title);
        setMembers(result.chat.members);

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
          members={members}
          readOnly={readOnly}
          handleUpdate={handleUpdate}
          handleMember={handleMember}
        />
        <input type="hidden" name="users" value={membersToAdd} />
        <input type="hidden" name="rmvdUsers" value={membersToRmv} />
      </div>
      {!readOnly ? <button type="submit">Submit</button> : null}
    </form>
  );
}

export default GroupProfileForm;
