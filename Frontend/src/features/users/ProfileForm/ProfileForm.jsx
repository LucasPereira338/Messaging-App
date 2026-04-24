import * as styles from "./ProfileForm.module.css";
import { useState } from "react";
// fixing the rest of the app to avoid sending unnecessary data deletion should be implemented later
function ProfileForm({ user }) {
  const userKeysArray = Object.keys(user);
  const [userArray, setUserArray] = useState(Object.values(user));
  console.log(userArray);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleChange = (event) => {
    setUserArray(event.target.value);
  };

  return (
    <div className="general-borders">
      <form>
        {userArray.map((item, ind) => {
          return (
            <div key={ind} className={styles.labelInputContainer}>
              {userKeysArray[ind] != "id" && userKeysArray[ind] != "token" ? (
                <label htmlFor={userKeysArray[ind]}>
                  {capitalize(userKeysArray[ind])}:{" "}
                </label>
              ) : null}
              <input
                type={
                  userKeysArray[ind] == "id" || userKeysArray[ind] == "token"
                    ? "hidden"
                    : "text"
                }
                name={item}
                value={item}
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
