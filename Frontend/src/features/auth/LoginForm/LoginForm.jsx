import * as styles from "./LoginForm.module.css";
import Button from "../../../components/ui/Button/Button";
import UserForm from "../UserForm/UserForm";

function LoginForm({ handleLogin, handleUser }) {
  return (
    <div className={styles.loginContainer} data-testid="LoginForm">
      <UserForm
        action="login"
        handleLogin={handleLogin}
        handleUser={handleUser}
      />
    </div>
  );
}

export default LoginForm;
