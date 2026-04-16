import * as styles from "./LoginForm.module.css";
import { fetchLogin } from "../../../services/userServices";

function LoginForm({ setIsLoggedIn, setUser }) {
  const handleClick = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const result = await fetchLogin(formValues);

    let resCount;

    if (typeof result === "object") {
      resCount = Object.keys(result).length;
      if (resCount > 1) {
        setIsLoggedIn(true);
        setUser(result);
      } else {
        alert(result.message);
      }
    }
  };
  // the value and readOnly must be removed later
  return (
    <div className={styles.loginContainer}>
      <form
        aria-label="login-form"
        className={styles.loginForm}
        onSubmit={handleClick}
      >
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value="jonathan32"
          required
          readOnly
        />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" value="123" required readOnly />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
