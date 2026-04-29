import * as styles from "./ProfileForm.module.css";
import { capitalize } from "../../../helpers/strHelpers";
import { updateUser, fetchUser } from "../../../services/userServices";
import { useState, useEffect } from "react";

function ProfileForm({ userId }) {
  const backend = import.meta.env.VITE_BACKEND;
  const [user, setUser] = useState({ id: 0, name: "pending..." });

  const portrait = backend + "assets/" + user.portrait;

  const userKeys = Object.keys(user);

  const [userValues, setUserValues] = useState(Object.values(user));

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("running useEffect");
      const result = await fetchUser({ id: userId });
      console.log("user result: ");
      console.log(result);
      setUser(result);
      const newArr = Object.values(result);
      newArr.pop();
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

    formData.token = user.token;

    const result = await updateUser(formData);

    setUser(result);
  };

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
                onChange={() => handleChange(event, ind)}
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
