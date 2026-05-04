import * as styles from "./LoginForm.module.css";
import Button from "../../../components/ui/Button/Button";
import UserForm from "../UserForm/UserForm";

function LoginForm({ handleLogin, handleUser }) {
  return (
    <div className={styles.loginContainer}>
      <UserForm
        action="login"
        handleLogin={handleLogin}
        handleUser={handleUser}
      />
    </div>
  );
}

export default LoginForm;

/* old way
import * as styles from "./LoginForm.module.css";
import Button from "../../../components/ui/Button/Button";
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
        localStorage.setItem("token", result.token);
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
      <section className={styles.loginNotForm}>
        <div>Log into your account</div>
      </section>

      <form
        aria-label="login-form"
        className={styles.loginForm}
        onSubmit={handleClick}
      >
        <div id={styles.labelInpUnit}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value="jonathan32"
            required
            readOnly
          />
        </div>
        <div id={styles.labelInpUnit}>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value="123"
            required
            readOnly
          />
        </div>

        <button type="submit" id={styles.btn}>
          Log in
        </button>
      </form>

      <section className={styles.loginNotForm}>
        <div>Don't have an account? </div>
        <Button />
      </section>
    </div>
  );
}

export default LoginForm;
*/
