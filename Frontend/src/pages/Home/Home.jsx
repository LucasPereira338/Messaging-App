import LoginForm from "../../features/auth/LoginForm/LoginForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchUser } from "../../services/userServices";
import * as styles from "./Home.module.css";
// issue: i don't really, nor should i, send the user object back on login, since i already have what i need on the token
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleUser = (data) => {
    setUser(data);
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const getUserIfToken = async () => {
        const result = await fetchUser({ id: localStorage.getItem("userId") });

        if (result.id) {
          setUser(result);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
        }
      };
      getUserIfToken();
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn == true) {
      navigate("/messages", { state: user });
    }
  }, [isLoggedIn, navigate, user]);

  return (
    <div id={styles.home}>
      <img
        src="https://images.pexels.com/photos/7135020/pexels-photo-7135020.jpeg"
        className={styles.backgroundImg}
      />
      <img
        src="../images/svgs/message_sent.svg"
        className={styles.homeElements}
        id={styles.vectorImg}
      />
      <h3 className={styles.homeElements} id={styles.homeText}>
        Chat with your old friends and meet new people!
      </h3>
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
