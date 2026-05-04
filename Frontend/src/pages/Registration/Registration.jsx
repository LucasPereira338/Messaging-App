import SignUpForm from "../../features/auth/SignUpForm/SignUpForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Registration() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn == true) {
      navigate("/messages", { state: user });
    }
  }, [isLoggedIn, navigate, user]);
  return (
    <div className="registration-content">
      <SignUpForm setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
    </div>
  );
}

export default Registration;
