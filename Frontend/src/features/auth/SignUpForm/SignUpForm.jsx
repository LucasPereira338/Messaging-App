import * as styles from "./SignUpForm.module.css";
import UserForm from "../UserForm/UserForm";

function SignUpForm({ setIsLoggedIn, setUser }) {
  return (
    <div className={styles.signUpContainer}>
      <UserForm
        action="sign-up"
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
    </div>
  );
}

export default SignUpForm;
