import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-hot-toast";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const currancy = "$";

  const fetchUser = async () => {
    try {
      setLoadingUser(true);
      const { data } = await axios.get("/api/user/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingUser(false);
    }
  };

  const createNewChat = async () => {
    try {
      if (!user) return toast("Login to create a new chat");
      await axios.get("/api/chat/new", {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchUsersChats();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUsersChats = async () => {
    try {
      setLoadingChats(true);
      const { data } = await axios.get("/api/chat/all-chats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("fetchUsersChats get at appcontext.jsx 📞📞", data);
      if (data.success) {
        setChats([...data.chats]);
        console.log("chats ata  fetchUsersChats🟢🟢", data.chats);
        if (data.chats.length === 0) {
          await createNewChat();

          return fetchUsersChats();
        } else {
          const firstChat = data.chats[0];
          setSelectedChat(firstChat);
          console.log(firstChat, "😎");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      console.log(user, "⏳⏳⏳");
      fetchUsersChats();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
   
  }, [user]);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser(null);
      setLoadingUser(false);
    }
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    theme,
    setTheme,
    fetchUser,
    currancy,
    fetchUsersChats,
    createNewChat,
    token,
    setToken,
    axios,
    loadingUser,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
