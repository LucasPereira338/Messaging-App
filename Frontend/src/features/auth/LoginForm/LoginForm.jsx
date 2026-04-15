import * as styles from "./LoginForm.module.css";
import { fetchLogin } from "../../../services/userServices";

function LoginForm() {
  const handleClick = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const result = await fetchLogin(formValues);
    console.log(result);
  };

  return (
    <div className={styles.loginContainer}>
      <form
        aria-label="login-form"
        className={styles.loginForm}
        onSubmit={handleClick}
      >
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" required />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
