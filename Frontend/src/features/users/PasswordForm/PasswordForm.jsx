import * as styles from "./PasswordForm.module.css";

function PasswordForm({ userId }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const result = await postNewPassword(formValues);

    alert(result);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" value={userId} />
      <label htmlFor="oldPassword" className={styles.pwdFormLabel}>
        <input type="password" name="oldPassword" />
      </label>
      <label htmlFor="newPassword" className={styles.pwdFormLabel}>
        <input type="password" name="newPassword" />
      </label>
      <button type="submit">Change Password</button>
    </form>
  );
}

export default PasswordForm;
