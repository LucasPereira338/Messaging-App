import * as styles from "./GroupForm.module.css";
import { useState } from "react";
import { createGroup } from "../../../services/groupServices";
import SearchUser from "../../users/SearchUser/SearchUser";
// must implement portraits
function GroupForm() {
  const [members, setMembers] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log("form data for group");
    console.log(formData);
    const formValues = Object.fromEntries(formData.entries());

    const result = await createGroup(formValues);

    console.log(result);
  };

  const handleNewUser = (item) => {
    let newStrList = item.id + "";
    console.log("newStrList");
    console.log(newStrList);
    setMembers(newStrList);
  };

  return (
    <div className={styles.groupFormContainer}>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" />
        <label htmlFor="users">Members: </label>
        <SearchUser handleNewUser={handleNewUser} />
        <input type="text" name="users" value={members} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GroupForm;
