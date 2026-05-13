import * as styles from "./GroupForm.module.css";

function GroupForm() {
  return (
    <div className={styles.groupFormContainer}>
      <form encType="multipart/form-data">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" />
        <label htmlFor="portrait">Portrait</label>
        <input type="file" name="portrait" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GroupForm;
