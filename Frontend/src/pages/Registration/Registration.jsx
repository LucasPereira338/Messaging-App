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
    <div className="registration-content">
      <SignUpForm handleLogin={handleLogin} handleUser={handleUser} />
    </div>
  );
}

export default Registration;
