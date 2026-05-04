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

  // ✅ FIXED: add role parameter
  const createUser = async (
    email,
    password,
    name,
    photo,
    role // 🔥 NEW
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

    // ✅ FIX: use role from form (no hardcode)
    await api.post("/api/auth/save-user", {
      name,
      email,
      photoURL: photo,
      role: role || "buyer", // fallback safe
      status: "pending",
    });

    return result;
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  const googleLogin = async () => {
    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    // Google always buyer (unless you want UI for it)
    await api.post("/api/auth/save-user", {
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
      role: "buyer",
      status: "pending",
    });

    return result;
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
        if (currentUser?.email) {
          try {
            const res = await api.get(
              "/api/users/me"
            );

            setUser(res.data);
          } catch (error) {
            console.log(error.message);
          }
        } else {
          setUser(null);
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