import * as styles from "./UserForm.module.css";
import { postNewUser, fetchLogin } from "../../../services/userServices";
import { capitalize } from "../../../helpers/strHelpers";

function UserForm({ action, handleLogin, handleUser }) {
  let userValues = ["username", "password"];
  if (action == "sign-up") {
    userValues = [
      "username",
      "name",
      "email",
      "description",
      "portrait",
      "password",
    ];
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    let result;

    if (action == "login") {
      result = await fetchLogin(formValues);
    } else if (action == "sign-up") {
      result = await postNewUser(formData);
    }

    let resCount;

    if (typeof result === "object") {
      resCount = Object.keys(result).length;
      if (resCount > 1) {
        if (result.token) {
          localStorage.setItem("token", result.token);
        }

        handleLogin();
        handleUser(result);
      } else {
        alert(result.message);
      }
    }
  };

  return (
    <form
      className={styles.userForm}
      aria-label="user-form"
      onSubmit={handleSubmit}
    >
      {userValues.map((item, ind) => {
        return (
          <div key={ind} className={styles.userFormChild}>
            <label htmlFor={item} className={styles.childLabel}>
              {capitalize(item)}:
              {item == "description" ? (
                <textarea name={item} className={styles.childInp}></textarea>
              ) : (
                <input
                  type={
                    item == "password"
                      ? "password"
                      : item == "email"
                        ? "email"
                        : item == "portrait"
                          ? "file"
                          : "text"
                  }
                  name={item}
                  className={styles.childInp}
                />
              )}
            </label>
          </div>
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
