import * as styles from "./ProfileForm.module.css";
import { useState, useEffect, useRef } from "react";
import { capitalize } from "../../../helpers/strHelpers";
import { updateUser, fetchUser } from "../../../services/userServices";
import { getImageFile } from "../../../helpers/fileHelpers";
import CloseButton from "../../../components/common/CloseButton/CloseButton";
import ImagePreview from "../../../components/images/ImagePreview/ImagePreview";
import PasswordForm from "../PasswordForm/PasswordForm";

function ProfileForm({ userId, handleProfile }) {
  let ref = useRef(null);
  const loggedUserId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);

  const [portrait, setPortrait] = useState(null);

  const [userKeys, setUserKeys] = useState([]);

  const [userValues, setUserValues] = useState([]);

  const [file, setFile] = useState(null);

  const [isPwdChosen, setIsPwdChosen] = useState(false);

  const handlePwdForm = () => {
    setIsPwdChosen(false);
  };

  const readOnly =
    loggedUserId == null ? false : loggedUserId == userId ? false : true;

  const handleChange = (event, ind) => {
    const newValue = event.target.value;
    const newArr = userValues.map((item, i) => (i == ind ? newValue : item));

    setUserValues(newArr);
  };

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

          setPortrait(result.portrait);

          delete result.id;
          delete result.portrait;
          delete result.isActive;
          delete result.lastActive;
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
    <div
      className={styles.profileFormContainer}
      id={readOnly ? styles.profileFormReadOnly : null}
      data-testid="ProfileFormContainer"
    >
      {!readOnly ? (
        <div className={styles.profileFormChoices}>
          <div
            className={styles.profileFormChoice}
            id={!isPwdChosen ? styles.profileChosenOption : null}
            onClick={() => setIsPwdChosen(false)}
          >
            Edit Profile
          </div>
          <div
            className={styles.profileFormChoice}
            id={isPwdChosen ? styles.profileChosenOption : null}
            onClick={() => setIsPwdChosen(true)}
          >
            Change Password
          </div>
        </div>
      ) : null}

      {isPwdChosen ? (
        <div className={styles.passwordFormBackground}>
          <div className={styles.passwordFormContent}>
            {" "}
            <PasswordForm userId={userId} handlePwdForm={handlePwdForm} />
          </div>
        </div>
      ) : null}
      {!user ? (
        <div>Loading data...</div>
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
              <ImagePreview file={file} cancelFile={cancelFile} />
            ) : (
              <img
                src={portrait}
                alt="your portrait"
                id={styles.profilePortrait}
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

          {userValues.map((item, ind) => {
            return (
              <div key={ind}>
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
                        readOnly={readOnly ? true : false}
                        data-testid={userKeys[ind] + "Input"}
                      />
                    )}{" "}
                  </label>
                ) : null}
              </div>
            );
          })}
          {!readOnly && (
            <button type="submit" data-testid="ProfileFormBtn">
              {" "}
              Save Changes
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default ProfileForm;
