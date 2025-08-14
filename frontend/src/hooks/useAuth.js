import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuth(false);
      return;
    }

    axiosInstance
      .get("http://localhost:5000/", { headers: { Authorization: `Bearer ${token}` } })
      .then(() => setIsAuth(true))
      .catch(() => {
        localStorage.removeItem("token");
        setIsAuth(false);
      });
  }, []);

  return isAuth;
}
