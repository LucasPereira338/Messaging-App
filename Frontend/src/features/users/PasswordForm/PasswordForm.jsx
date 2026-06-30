import * as styles from "./PasswordForm.module.css";
import { updatePassword } from "../../../services/userServices";
import CloseButton from "../../../components/common/CloseButton/CloseButton";

function PasswordForm({ userId, handlePwdForm }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const result = await updatePassword(userId, formValues);

    if (result.message == "Password successfully changed!") {
      handlePwdForm();
    } else {
      alert(result.message);
    }
  };
  return (
    <div className={styles.pwdFormContainer}>
      <form
        className={styles.pwdForm}
        onSubmit={handleSubmit}
        data-testid="PasswordForm"
      >
        <label htmlFor="oldPassword" className={styles.pwdFormLabel}>
          Current Password:
          <input
            type="password"
            name="oldPassword"
            className={styles.pwdFormInput}
            data-testid="oldPwdInput"
          />
        </label>
        <label htmlFor="newPassword" className={styles.pwdFormLabel}>
          New Password:
          <input
            type="password"
            name="newPassword"
            className={styles.pwdFormInput}
          />
        </label>
        <button type="submit" data-testid="PasswordFormBtn">
          Change Password
        </button>
      </form>
      <div className={styles.closeBtnPwd}>
        <CloseButton handleClick={handlePwdForm} />
      </div>
    </div>
  );
}

export default PasswordForm;
