import * as styles from "./ProfileForm.module.css";
import { capitalize } from "../../../helpers/strHelpers";
import { updateUser, fetchUser } from "../../../services/userServices";
import { useState, useEffect } from "react";

// fixing the rest of the app to avoid sending unnecessary data to be deleted later like in here should be implemented later
function ProfileForm({ userId }) {
  const backend = import.meta.env.VITE_BACKEND;
  const [user, setUser] = useState({ id: 0, name: "pending..." });

  const portrait = backend + "assets/" + user.portrait;

  const userKeys = Object.keys(user);
  console.log("userKeys:");
  console.log(userKeys);

  const userValues = Object.values(user);
  console.log("userValues:");
  console.log(userValues);

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("running useEffect");
      const result = await fetchUser({ id: userId });
      console.log("user result: ");
      console.log(result);
      setUser(result);
    };
    fetchUserData();
  }, [userId]);

  // can use onMouseOver and onMouseLeave to handle overlay

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
  //portrait being hidden down there is really unelegant, change this later
  //and, of course, see if onChange useState can work for changing input values without creating a
  // thousand useState variables
  return (
    <div id={styles.profileFormContainer} className="general-borders">
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div id={styles.imgInpContainer}>
          {" "}
          <img src={portrait} alt="your portrait" id={styles.profilePortrait} />
          <input type="file" name="portrait" />
        </div>

        {userValues.map((item, ind) => {
          return (
            <div key={ind} id={styles.labelInputContainer}>
              {userKeys[ind] != "id" && userKeys[ind] != "portrait" ? (
                <label htmlFor={userKeys[ind]}>
                  {capitalize(userKeys[ind])}:{" "}
                </label>
              ) : null}
              <input
                type={
                  userKeys[ind] == "id" || userKeys[ind] == "portrait"
                    ? "hidden"
                    : "text"
                }
                name={userKeys[ind]}
                value={item == null ? "" : item}
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
