"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  telegram_profile_pic_ulr: string;

}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  fetchUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => { },
  logout: () => { },
  fetchUser: () => { },
});

export const Auths = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/accounts/me/", {
        withCredentials: true,
      });
      setUser(res.data);
      setIsAuthenticated(true);
      console.log(res.data['telegram_profile_pic_ulr'])
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    fetchUser();
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8000/api/accounts/logout/", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      document.cookie = "access=; Max-Age=0; path=/; domain=localhost";
      document.cookie = "refresh=; Max-Age=0; path=/; domain=localhost";

      setIsAuthenticated(false);
      setUser(null);
      toast.info("Succes loged out")
    }
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
