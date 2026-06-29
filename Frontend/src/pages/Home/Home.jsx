import * as styles from "./Home.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { fetchUser } from "../../services/userServices";
import LoginForm from "../../features/auth/LoginForm/LoginForm";

function Home() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const handleLogin = (data) => {
    setUser(data);
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const getUserIfToken = async () => {
        const result = await fetchUser(localStorage.getItem("userId"));

        if (result.id) {
          setUser(result);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
        }
      };
      getUserIfToken();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      navigate("/messages", { state: user });
    }
  }, [navigate, user]);

  return (
    <div id={styles.home} data-testid="Home">
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
        <h3>Log into a existing account: </h3>
        <div>
          <LoginForm handleLogin={handleLogin} />
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
