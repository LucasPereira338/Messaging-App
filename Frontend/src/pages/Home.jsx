import LoginForm from "../features/auth/LoginForm/LoginForm";
import { useState, useEffect } from "react";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn == true) {
    }
  }, [isLoggedIn]);

  return (
    <div class="home">
      <LoginForm setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default Home;
