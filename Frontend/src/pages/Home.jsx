import LoginForm from "../features/auth/LoginForm/LoginForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

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
    <div className="home">
      <LoginForm setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
    </div>
  );
}

export default Home;
