import React, { createContext } from "react";
import api from "../utils/axiosInstance";
import { useState } from "react";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get("/user/me", {
        withCredentials: true,
      });
      setuser(res.data.user);
    } catch {
      setuser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post(
      "/user/login",
      { email, password },
      { withCredentials: true }
    );
    setuser(res.data.user);
  };

  const signup = async (username, email, password) => {
    const res = await api.post(
      "/user/signUp",
      { username, email, password },
      { withCredentials: true }
    );
    setuser(res.data.user);
  };

  const logOut = async () => {
    await api.get("/user/logOut", { withCredentials: true });
    setuser(null);
  };

  return(
    <AuthContext.Provider value={{user,loading,login,signup,logOut}}>
        {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;
