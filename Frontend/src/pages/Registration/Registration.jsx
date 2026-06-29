import * as styles from "./Registration.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import backgroundImg from "../../../images/backgroundImg.jpg";
import SignUpForm from "../../features/auth/SignUpForm/SignUpForm";

function Registration() {
  const [user, setUser] = useState();

  const handleLogin = (data) => {
    setUser(data);
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/messages", { state: user });
    }
  }, [navigate, user]);

  return (
    <div className={styles.registration}>
      <img src={backgroundImg} className={styles.backgroundImg} />
      <div className={styles.registrationContent}>
        <SignUpForm handleLogin={handleLogin} />
      </div>
    </div>
  );
}

export default Registration;
