import * as styles from "./SignUpForm.module.css";
import { postNewUser } from "../../../services/userServices";

function SignUpForm() {
  const handleClick = async (event) => {
    event.preventDefault();

    await postNewUser(event);
  };
  return (
    <div className={styles.signUpContainer}>
      <form className={styles.signUpForm} aria-label="sign-up-form">
        <label htmlFor="name">Full Name: </label>
        <input type="text" name="name" required />
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" required />
        <label htmlFor="email">E-mail: </label>
        <input type="email" name="email" required />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" required />
        <button type="submit" onClick={handleClick}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
