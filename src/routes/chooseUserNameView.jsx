 import React, { useState } from 'react'
 import AuthProvider from "../components/authProvider";
 import { useNavigate } from "react-router-dom";

function ChooseUserNameView() {

  const navigate = useNavigate();
  const [state, setState] = useState(0)
  const [currentUser, setCurrentUser] = useState({})


  function handleOnLoginIn(user) {
    navigate("/dashboard");
  }
  function handleUserNotRegister(user) {
    setCurrentUser(user);
    setState(3);
  }
  function handleOnUserNotLogIn() {
    navigate("/login");
  }

  if (state === 3) {
    return <div>
      <h1>Bienvenido {currentUser.displayName}</h1>
    </div>
  }

  return (
    <AuthProvider
      onUserLogIn={handleOnLoginIn}
      onUserNotRegister={handleUserNotRegister}
      UserNotLogIn={handleOnUserNotLogIn}
    >
    </AuthProvider>
  )
}

export default ChooseUserNameView