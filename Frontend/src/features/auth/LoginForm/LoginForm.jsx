import UserForm from "../UserForm/UserForm";

function LoginForm({ handleLogin }) {
  return (
    <div data-testid="LoginForm">
      <UserForm action="login" handleLogin={handleLogin} />
    </div>
  );
}

export default LoginForm;
