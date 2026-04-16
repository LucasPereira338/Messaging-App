import LoginForm from "../features/auth/LoginForm/LoginForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn == true) {
      navigate("/messages");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="home">
      <LoginForm setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default Home;
