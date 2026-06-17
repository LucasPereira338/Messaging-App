import * as styles from "./LoginForm.module.css";
import UserForm from "../UserForm/UserForm";

function LoginForm({ handleLogin }) {
  return (
    <div className={styles.loginContainer} data-testid="LoginForm">
      <UserForm action="login" handleLogin={handleLogin} />
    </div>
  );
}

export default LoginForm;
