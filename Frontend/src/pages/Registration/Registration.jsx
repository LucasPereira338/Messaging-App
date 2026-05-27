import * as styles from "./Registration.module.css";
import SignUpForm from "../../features/auth/SignUpForm/SignUpForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Registration() {
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
    <div className={styles.registration}>
      <img
        src="https://images.pexels.com/photos/7135020/pexels-photo-7135020.jpeg"
        className={styles.backgroundImg}
      />
      <div className={styles.registrationContent}>
        <SignUpForm handleLogin={handleLogin} handleUser={handleUser} />
      </div>
    </div>
  );
}

export default Registration;
