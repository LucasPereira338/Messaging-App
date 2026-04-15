import * as styles from "./LoginForm.module.css";
import { fetchLogin } from "../../../services/userServices";

function LoginForm() {
  const handleClick = async (event) => {
    event.preventDefault();

    await fetchLogin(event);
  };
  return (
    <div className={styles.loginContainer}>
      <form aria-label="login-form" className={styles.loginForm}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" required />
        <label htmlFor="password">Password: </label>
        <input type="password" required />
        <button type="submit" onClick={handleClick}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
