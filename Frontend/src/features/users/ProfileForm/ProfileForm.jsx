import * as styles from "./ProfileForm.module.css";
import { useState } from "react";
import { capitalize } from "../../../helpers/strHelpers";
import { filterArrayValues } from "../../../helpers/arrayHelpers";
// fixing the rest of the app to avoid sending unnecessary data to be deleted later like in here should be implemented later
function ProfileForm({ user }) {
  const backend = import.meta.env.VITE_BACKEND;
  const portrait = backend + "assets/" + user.portrait;

  const userKeysArray = Object.keys(user);
  const userKeys = userKeysArray.filter((item) => {
    if (item != "portrait" && item != "token") {
      return item;
    }
  });

  const userValues = Object.values(user);
  const filteredUserValues = filterArrayValues(userValues, user);

  const [userArray, setUserArray] = useState(filteredUserValues);

  const handleChange = (event) => {
    setUserArray(event.target.value);
  };

  return (
    <div id={styles.profileForm} className="general-borders">
      <img src={portrait} alt="your portrait" id={styles.profilePortrait} />
      <form>
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
                name={item}
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
