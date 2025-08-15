"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  deleteUser
} from "firebase/auth";
import app from "../../../firebase";
import { message } from "antd";
import toast from "react-hot-toast";
const auth = getAuth(app);
const FirebaseAuthContext = createContext();

export function useAuth() {
  return useContext(FirebaseAuthContext);
}

export function FirebaseAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);

  // Signup function
  function signup(email, password) {
    setLoading2(true);
    createUserWithEmailAndPassword(auth, email, password).then((res)=>{
      console.log("res,user",res?.user);
      if(res?.user){
        message.success("Registration Successfull");
        sendEmailVerification(res.user).then(()=>{
          if(!res?.user?.emailVerified){
                toast.success("Please Verify your Email");
              
            }
             })

      }
    })

  }

  // Signin function
  async function signin(email, password) {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (!res.user.emailVerified) {
      await signOut(auth);
      toast.error("Please verify your email before login.");
      throw new Error("Email not verified");
    }
    return res;
  }
  


  // Signout function
  function signout() {
    signOut(auth);
    setCurrentUser("");
     
  }

  // Reset password
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  //profile Update
  function profileUpdate(obj){
    return updateProfile(auth.currentUser,obj);
  }
  // Track user state with onAuthStateChanged listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    resetPassword,
    profileUpdate,
    loading2,
    setLoading2
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {!loading && children}
    </FirebaseAuthContext.Provider>
  );
}
