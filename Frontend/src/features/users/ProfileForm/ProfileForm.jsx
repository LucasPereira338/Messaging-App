import * as styles from "./ProfileForm.module.css";
import { useState } from "react";
import { capitalize } from "../../../helpers/strHelpers";
import {
  filterUserValues,
  filterKeysArray,
} from "../../../helpers/arrayHelpers";
import { updateUser } from "../../../services/userServices";
// fixing the rest of the app to avoid sending unnecessary data to be deleted later like in here should be implemented later
function ProfileForm({ user }) {
  const backend = import.meta.env.VITE_BACKEND;
  const portrait = backend + "assets/" + user.portrait;

  const userKeysArray = Object.keys(user);
  const userKeys = filterKeysArray(userKeysArray);

  const userValues = Object.values(user);
  const filteredUserValues = filterUserValues(userValues, user);

  const [userArray, setUserArray] = useState(filteredUserValues);
  // can use onMouseOver and onMouseLeave to handle overlay
  const handleChange = (event) => {
    setUserArray(event.target.value);
  };

  /*const handleImageHover = () => {
    setIsMouseOverImage(true);
  };

  const handleNonImageHover = () => {
    setIsMouseOverImage(false);
  };*/

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    formData.token = user.token;
    console.log("sending: ");
    console.log(formData);

    const result = await updateUser(formData);

    console.log(result);
  };

  return (
    <div id={styles.profileFormContainer} className="general-borders">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div id={styles.imgInpContainer}>
          {" "}
          <img src={portrait} alt="your portrait" id={styles.profilePortrait} />
          <input type="file" name="portrait" />
        </div>

        {userArray.map((item, ind) => {
          return (
            <div key={ind} id={styles.labelInputContainer}>
              {userKeys[ind] != "id" && userKeys[ind] != "token" ? (
                <label htmlFor={userKeys[ind]}>
                  {capitalize(userKeys[ind])}:{" "}
                </label>
              ) : null}
              <input
                type={
                  userKeys[ind] == "id" || userKeys[ind] == "token"
                    ? "hidden"
                    : "text"
                }
                name={userKeys[ind]}
                value={item == null ? "" : item}
                onChange={handleChange}
              />
            </div>
          );
        })}
        <button type="submit"> Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileForm;
