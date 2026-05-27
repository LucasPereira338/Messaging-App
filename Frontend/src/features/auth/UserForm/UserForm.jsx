import * as styles from "./UserForm.module.css";
import { postNewUser, fetchLogin } from "../../../services/userServices";
import { capitalize } from "../../../helpers/strHelpers";
import { useState } from "react";
import ImagePreview from "../../../components/images/ImagePreview/ImagePreview";

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
  const [file, setFile] = useState(null);

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
          localStorage.setItem("userId", result.id);
        }
        result.isActive = true;
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
              {capitalize(item)}:{" "}
            </label>
            {item == "portrait" && file && (
              <ImagePreview file={file} size="small" />
            )}
            {item == "description" ? (
              <textarea
                name={item}
                className={styles.childInp}
                id={styles.txtArea}
              ></textarea>
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
                {...(item === "portrait" ? { accept: "image/*" } : {})}
                onChange={item == "portrait" ? handleFileChange : null}
              />
            )}
          </div>
        );
      })}
      <button type="submit" className={styles.submitBtn}>
        Submit
      </button>
    </form>
  );
}

export default UserForm;

/* b4 new way of creating input file
import * as styles from "./UserForm.module.css";
import { postNewUser, fetchLogin } from "../../../services/userServices";
import { capitalize } from "../../../helpers/strHelpers";
import { useEffect, useState } from "react";

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

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

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
          localStorage.setItem("userId", result.id);
        }
        result.isActive = true;
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
            </label>
            {item == "description" ? (
              <textarea
                name={item}
                className={styles.childInp}
                id={styles.txtArea}
              ></textarea>
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
                {...(item === "portrait" ? { accept: "image/*" } : {})}
                onChange={item == "portrait" ? handleFileChange : null}
              />
            )}
            {preview && (
              <img src={preview} alt="Preview" className={styles.userImg} />
            )}
          </div>
        );
      })}
      <button type="submit" className={styles.submitBtn}>
        Submit
      </button>
    </form>
  );
}

export default UserForm;
*/
