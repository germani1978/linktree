/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";

function LoginView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  /*
  0: inicializado
  1: loading
  2: login completo
  3: login pero sin registro
  4: no hay nadie logueado
  */

  const [state, setCurrentState] = useState(0);

  async function handleOnClick(e) {
    const googleProvider = new GoogleAuthProvider();
    await signinWithGoogle(googleProvider);

    async function signinWithGoogle(googleProvider) {
      try {
        const resp = await signInWithPopup(auth, googleProvider);
        console.log(resp);
      } catch (error) {
        console.error(error);
      }
    }
  }
  function handleOnLoginIn(user) {
    navigate("/dashboard");
  }
  function handleUserNotRegister() {
    navigate("/choose-username");
  }
  function handleOnUserNotLogIn(user) {
    setCurrentState(4);
    console.log("por aqui");
  }

  if (state === 4) {
    return (
      <div>
        <button onClick={handleOnClick}>Login with Google</button>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLogIn={handleOnLoginIn}
      onUserNotRegister={handleUserNotRegister}
      UserNotLogIn={handleOnUserNotLogIn}
    >
      <div>Loading...</div>
    </AuthProvider>
  );
}

export default LoginView;
