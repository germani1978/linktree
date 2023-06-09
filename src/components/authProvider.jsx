/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({
  children,
  onUserLogIn,
  onUserNotRegister,
  UserNotLogIn,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          onUserLogIn(user);
        } else {
          onUserNotRegister(user)
        }
      } else {
        UserNotLogIn();
      }
    });
  }, [navigate, onUserLogIn, UserNotLogIn, onUserNotRegister]);

  return <div>{children}</div>;
}
