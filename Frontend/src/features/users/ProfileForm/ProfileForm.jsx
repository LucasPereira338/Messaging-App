import * as styles from "./ProfileForm.module.css";
import { useState, useEffect } from "react";
import { capitalize } from "../../../helpers/strHelpers";
import { updateUser, fetchUser } from "../../../services/userServices";
import { getImageFile } from "../../../helpers/fileHelpers";
import ImagePreview from "../../../components/images/ImagePreview/ImagePreview";
import CloseButton from "../../../components/common/CloseButton/CloseButton";

function ProfileForm({ userId, handleProfile }) {
  const [user, setUser] = useState(null);

  const [portrait, setPortrait] = useState(null);

  const [userKeys, setUserKeys] = useState([]);

  const [userValues, setUserValues] = useState([]);

  const [file, setFile] = useState(null);

  const handleChange = (event, ind) => {
    const newValue = event.target.value;
    const newArr = userValues.map((item, i) => (i == ind ? newValue : item));

    setUserValues(newArr);
  };

  const handleFileChange = (e) => {
    const selectedFile = getImageFile(e);
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const result = await updateUser(formData, userId);

    setUser(result);

    handleProfile();
  };

  useEffect(() => {
    if (userId) {
      try {
        const fetchUserData = async () => {
          const result = await fetchUser(userId);

          const backend = import.meta.env.VITE_BACKEND;

          setPortrait(backend + "assets/" + result.portrait);

          delete result.id;
          delete result.portrait;
          setUser(result);
          const newArrK = Object.keys(result);
          const newArrV = Object.values(result);

          setUserKeys(newArrK);

          setUserValues(newArrV);
        };
        fetchUserData();
      } catch (e) {
        console.error(e);
      }
    }
  }, [userId]);

  return (
    <div id={styles.profileFormContainer} data-testid="ProfileFormContainer">
      {!user ? (
        <div className={styles.profileFormLoading}>Loading data...</div>
      ) : (
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          id={styles.profileForm}
          autoComplete="off"
          data-testid="ProfileForm"
        >
          <div className={styles.closeBtnContainer}>
            <CloseButton handleClick={handleProfile} />
          </div>

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
                  <label
                    htmlFor={userKeys[ind]}
                    className={styles.childLabel}
                    role="label"
                  >
                    {capitalize(userKeys[ind])}:{" "}
                    {userKeys[ind] == "description" ? (
                      <textarea
                        name={userKeys[ind]}
                        className={styles.childInp}
                        value={item == null ? "" : item}
                        onChange={() => handleChange(event, ind)}
                      ></textarea>
                    ) : (
                      <input
                        type="text"
                        name={userKeys[ind]}
                        value={item == null ? "" : item}
                        onChange={() => handleChange(event, ind)}
                        className={styles.childInp}
                        data-testid={userKeys[ind] + "Input"}
                      />
                    )}{" "}
                  </label>
                ) : null}
              </div>
            );
          })}
          <button type="submit"> Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default ProfileForm;
