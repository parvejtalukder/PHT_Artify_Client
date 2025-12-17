import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../../Auth/firebase.init';
import { AuthContext } from './AuthContext';
import Loading from '../../Templates/Loading/Loading';

const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  // const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  const CreateUserWithEmailPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const SignInWithEmailPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const GoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };

  const SignOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const UpdateProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  const ForgetPassWord = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const userInfo = {
    user,
    loading,
    GoogleSignIn,
    SignOut,
    ForgetPassWord,
    UpdateProfile,
    CreateUserWithEmailPass,
    SignInWithEmailPass,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {/* {children} */}
        <Loading/>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;