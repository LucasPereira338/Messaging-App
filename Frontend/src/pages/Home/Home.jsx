import LoginForm from "../../features/auth/LoginForm/LoginForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as styles from "./Home.module.css";
// issue: i don't really, nor should i, send the user object back on login, since i already have what i need on the token
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleUser = (data) => {
    setUser(data);
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn == true) {
      navigate("/messages", { state: user });
    }
  }, [isLoggedIn, navigate, user]);

  return (
    <div id={styles.home}>
      <div className={styles.homeContainer}>
        <h3 className={styles.loginHeader}>Log into a existing account: </h3>
        <div className={styles.loginContainer}>
          <LoginForm handleLogin={handleLogin} handleUser={handleUser} />
        </div>
        <h3 className={styles.signUpHeader}>
          Don't have a account? <br />
          Then create one right now!
        </h3>
        <button
          className={styles.signUpBtn}
          onClick={() => navigate("/sign-up")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Home;
