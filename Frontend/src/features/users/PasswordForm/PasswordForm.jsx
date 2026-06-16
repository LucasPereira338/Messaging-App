import * as styles from "./PasswordForm.module.css";
import { updatePassword } from "../../../services/userServices";

function PasswordForm({ userId }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const result = await updatePassword(userId, formValues);

    alert(result);
  };
  return (
    <form onSubmit={handleSubmit} data-testid="PasswordForm">
      <label htmlFor="oldPassword" className={styles.pwdFormLabel}>
        <input type="password" name="oldPassword" data-testid="oldPwdInput" />
      </label>
      <label htmlFor="newPassword" className={styles.pwdFormLabel}>
        <input type="password" name="newPassword" />
      </label>
      <button type="submit">Change Password</button>
    </form>
  );
}

export default PasswordForm;
