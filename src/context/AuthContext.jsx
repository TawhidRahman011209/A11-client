import {
  useEffect,
  useState,
  createContext,
} from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from "firebase/auth";

import app from "../firebase/firebase.config";

import api from "../services/api";

export const AuthContext = createContext();

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

 const createUser = async (
  email,
  password,
  name,
  photo
) => {
  const result =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await updateProfile(result.user, {
    displayName: name,
    photoURL: photo,
  });

  // SAVE USER TO DATABASE
  await api.post("/api/auth/save-user", {
    name,
    email,
    photoURL: photo,
    role: "buyer",
    status: "approved",
  });

  return result;
};

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

 const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error.message);
  }
};

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(
    auth,
    async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        await api.post("/api/auth/save-user", {
          name: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      }

      setLoading(false);
    }
  );

  return () => unsubscribe();
}, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleLogin,
    updateUser,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;