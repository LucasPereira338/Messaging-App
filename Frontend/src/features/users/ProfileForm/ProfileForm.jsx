import * as styles from "./ProfileForm.module.css";
import { capitalize } from "../../../helpers/strHelpers";
import { updateUser, fetchUser } from "../../../services/userServices";
import { useState, useEffect } from "react";
import ImagePreview from "../../../components/images/ImagePreview/ImagePreview";

function ProfileForm({ userId }) {
  const [user, setUser] = useState({ id: userId, name: "pending..." });

  const backend = import.meta.env.VITE_BACKEND;

  const portrait = backend + "assets/" + user.portrait;

  const userKeys = Object.keys(user);

  const [userValues, setUserValues] = useState(Object.values(user));

  const [file, setFile] = useState(null);

  const handleChange = (event, ind) => {
    const newValue = event.target.value;
    const newArr = userValues.map((item, i) => (i == ind ? newValue : item));

    setUserValues(newArr);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const formValues = Object.fromEntries(formData.entries());

    formData.id = formValues.id;
    const result = await updateUser(formData);

    console.log(result);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await fetchUser({ id: userId });

      setUser(result);
      const newArr = Object.values(result);

      setUserValues(Object.values(newArr));
    };
    fetchUserData();
  }, [userId]);

  return (
    <div id={styles.profileFormContainer} className="general-borders">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        id={styles.profileForm}
        autoComplete="off"
      >
        <div id={styles.imgInpContainer}>
          {" "}
          {file ? (
            <ImagePreview file={file} />
          ) : (
            <img
              src={portrait}
              alt="your portrait"
              id={styles.profilePortrait}
            />
          )}
          <input
            type="file"
            name="portrait"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {userValues.map((item, ind) => {
          return (
            <div key={ind} id={styles.labelInputContainer}>
              {userKeys[ind] != "id" && userKeys[ind] != "portrait" ? (
                <label htmlFor={userKeys[ind]} className={styles.childLabel}>
                  {capitalize(userKeys[ind])}:{" "}
                </label>
              ) : null}
              {userKeys[ind] == "description" ? (
                <textarea
                  name={userKeys[ind]}
                  className={styles.childInp}
                  value={item == null ? "" : item}
                  onChange={() => handleChange(event, ind)}
                ></textarea>
              ) : (
                <input
                  type={
                    userKeys[ind] == "id" || userKeys[ind] == "portrait"
                      ? "hidden"
                      : "text"
                  }
                  name={userKeys[ind]}
                  value={item == null ? "" : item}
                  onChange={() => handleChange(event, ind)}
                  className={styles.childInp}
                />
              )}{" "}
            </div>
          );
        })}
        <button type="submit"> Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileForm;

/* before ImagePreview
function ProfileForm({ userId }) {
  const [user, setUser] = useState({ id: userId, name: "pending..." });

  const backend = import.meta.env.VITE_BACKEND;

  const portrait = backend + "assets/" + user.portrait;

  const userKeys = Object.keys(user);

  const [userValues, setUserValues] = useState(Object.values(user));

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await fetchUser({ id: userId });

      setUser(result);
      const newArr = Object.values(result);

      setUserValues(Object.values(newArr));
    };
    fetchUserData();
  }, [userId]);

  const handleChange = (event, ind) => {
    const newValue = event.target.value;
    const newArr = userValues.map((item, i) => (i == ind ? newValue : item));

    setUserValues(newArr);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const formValues = Object.fromEntries(formData.entries());

    formData.id = formValues.id;
    const result = await updateUser(formData);

    console.log(result);
  };

  return (
    <div id={styles.profileFormContainer} className="general-borders">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        id={styles.profileForm}
        autoComplete="off"
      >
        <div id={styles.imgInpContainer}>
          {" "}
          <img src={portrait} alt="your portrait" id={styles.profilePortrait} />
          <input type="file" name="portrait" />
        </div>

        {userValues.map((item, ind) => {
          return (
            <div key={ind} id={styles.labelInputContainer}>
              {userKeys[ind] != "id" && userKeys[ind] != "portrait" ? (
                <label htmlFor={userKeys[ind]} className={styles.childLabel}>
                  {capitalize(userKeys[ind])}:{" "}
                  
                </label>
              ) : null}
              {userKeys[ind] == "description" ? (
                <textarea
                  name={userKeys[ind]}
                  className={styles.childInp}
                  value={item == null ? "" : item}
                  onChange={() => handleChange(event, ind)}
                ></textarea>
              ) : (
                <input
                  type={
                    userKeys[ind] == "id" || userKeys[ind] == "portrait"
                      ? "hidden"
                      : "text"
                  }
                  name={userKeys[ind]}
                  value={item == null ? "" : item}
                  onChange={() => handleChange(event, ind)}
                  className={styles.childInp}
                />
              )}{" "}
            </div>
          );
        })}
        <button type="submit"> Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileForm; */
