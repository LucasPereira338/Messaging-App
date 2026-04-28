import LoginForm from "../../features/auth/LoginForm/LoginForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as styles from "./Home.module.css";
// issue: i don't really, nor should i, send the user object back on login, since i already have what i need on the token
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn == true) {
      navigate("/messages", { state: user });
    }
  }, [isLoggedIn, navigate, user]);

  return (
    <div id={styles.home} className="general-borders">
      <LoginForm setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
    </div>
  );
}

export default Home;
