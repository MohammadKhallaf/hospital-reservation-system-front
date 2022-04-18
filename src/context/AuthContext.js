import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import jwt_decode from "jwt-decode";

import Toastify from "toastify-js";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
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
  const [initial, setInitial] = useState(true);
  const navigate = useNavigate();

  const loginUser = (username, password) => {
    axios
      .post("api/token/", { username, password })
      .then((res) => {
        setAuthTokens(res.data);
        setUser(jwt_decode(res.data.access));
        localStorage.setItem("authTokens", JSON.stringify(res.data));
        Toastify({
          text: "Logged In Successfully",
          duration: 3000,
        }).showToast();
        navigate(-1);
      })
      .catch((error) => {
        Toastify({
          text: "An error occured",
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #a71d31, #6b0f1a)",
          },
        }).showToast();
      });
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    Toastify({
      text: "Goodbye",
      duration: 3000,
    }).showToast();
  };

  const updateToken = useCallback(() => {
    if (!authTokens) return;

    axios
      .post("api/token/refresh/", {
        refresh: authTokens?.refresh,
      })
      .then((res) => {
        setAuthTokens(res.data);
        setUser(jwt_decode(res.data.access));
        localStorage.setItem("authTokens", JSON.stringify(res.data));
      })
      .catch((error) => {
        logoutUser();
        Toastify({
          text: "An error occured",
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #a71d31, #6b0f1a)",
          },
        }).showToast();
      });

    if (initial) {
      setInitial(false);
    }
  }, [authTokens, initial]);

  useEffect(() => {
    if (initial) updateToken();

    const refreshInterval = 240_000;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [authTokens, initial, updateToken]);

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
