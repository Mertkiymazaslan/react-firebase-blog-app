import React, { useContext, useState, useEffect } from "react";
import { auth, provider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut, updateProfile,onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function updateName(name) { 
    return updateProfile(auth.currentUser ,{
      displayName: name
    });
  }

  function signInWithGoogle() {
    return signInWithPopup(auth, provider);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signInWithGoogle,
    login,
    logout,
    resetPassword,
    updateName
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
