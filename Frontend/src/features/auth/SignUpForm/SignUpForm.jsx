import * as styles from "./SignUpForm.module.css";
import UserForm from "../UserForm/UserForm";

function SignUpForm({ handleLogin, handleUser }) {
  return (
    <div className={styles.signUpContainer} data-testid="SignUpContainer">
      <UserForm
        action="sign-up"
        handleLogin={handleLogin}
        handleUser={handleUser}
      />
    </div>
  );
}

export default SignUpForm;
