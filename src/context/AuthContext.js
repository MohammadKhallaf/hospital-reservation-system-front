import axios from "axios";
import { createContext, useState, useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [initial, setInitial] = useState(true);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const loginUser = (username, password) => {
    axios
      .post("http://localhost:8000/api/token/", { username, password })
      .then((res) => {
        setAuthTokens(res.data);
        setUser(jwt_decode(res.data.access));
        localStorage.setItem("authTokens", JSON.stringify(res.data));
      })
      .catch((error) => {});
  };
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  const updateToken = useCallback(() => {
    if (!authTokens) return;
    console.log("update")
    axios
      .post("http://localhost:8000/api/token/refresh/", {
        refresh: authTokens?.refresh,
      })
      .then((res) => {
        setAuthTokens(res.data);
        setUser(jwt_decode(res.data.access));
        localStorage.setItem("authTokens", JSON.stringify(res.data));
      })
      .catch((error) => {
        logoutUser();
      });
    if (initial) {
      setInitial(false);
    }
  }, []);

  useEffect(() => {
    if (initial) updateToken();
    const refreshInterval = 2_000; // 4 minutes
    const interval = setInterval(() => {
      if (authTokens) {
        // updateToken();
      }
    }, refreshInterval);
    return () => clearInterval(interval);
  }, [authTokens, initial]);

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
