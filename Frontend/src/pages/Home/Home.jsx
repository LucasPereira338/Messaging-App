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
  // i'm going to need the login container to be here instead, for the sake of modularity
  // and to allow the button to register to work properly
  return (
    <div id={styles.home}>
      <LoginForm handleLogin={handleLogin} handleUser={handleUser} />
    </div>
  );
}

export default Home;
