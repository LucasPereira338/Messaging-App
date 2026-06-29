import UserForm from "../UserForm/UserForm";

function SignUpForm({ handleLogin }) {
  return (
    <div data-testid="SignUpContainer">
      <UserForm action="sign-up" handleLogin={handleLogin} />
    </div>
  );
}

export default SignUpForm;
