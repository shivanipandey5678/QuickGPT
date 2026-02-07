import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/useContext";
import { assets } from "../assets/assets";
import Message from "./Message";
import toast from "react-hot-toast";

const Chatbox = () => {
  const containerRef = useRef(null);

  const { selectedChat, theme, axios, token, user, setUser } = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [persona, setPersona] = useState("hitesh"); // "hitesh" | "osm"
  const [isPublished, setIsPublished] = useState(false);

  const personaOptions = [
    { value: "hitesh", label: "Chat with Hitesh Sir" },
    { value: "osm", label: "Chat with OSM" },
  ];

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.message);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!user) return toast("Please login to send a message.");
      if (!selectedChat?._id) return toast("Please wait, loading chat...");
      if (mode === "image" && user.credit < 2) {
        toast.error(
          "You need at least 2 credits to generate an image. Buy more credits to continue."
        );
        return;
      }
      if (mode === "text" && user.credit < 1) {
        toast.error(
          "You need at least 1 credit to send a text message. Buy more credits to continue."
        );
        return;
      }
      setLoading(true);
      const promptCopy = prompt;
      setPrompt("");

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: prompt,
          timestamp: Date.now(),
          isImage: false,
        },
      ]);

      const { data } = await axios.post(
        `/api/message/${mode}`,
        { chatId: selectedChat._id, prompt, isPublished, persona },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setMessages((prev) => [...prev, data.reply]);
        if (mode === "image") {
          setUser((prev) => ({ ...prev, credit: prev.credit - 2 }));
        } else {
          setUser((prev) => ({ ...prev, credit: prev.credit - 1 }));
        }
      } else {
        toast.error(data.message, " catch onSubmit chatbox");
        setPrompt(promptCopy);
      }
    } catch (error) {
      toast.error(error.message, " catch onSubmit chatbox");
    } finally {
      setPrompt("");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div className="flex-1 flex flex-col justify-between m-4 sm:m-5 md:m-10 xl:mx-16 2xl:mx-24 max-md:mt-14 2xl:pr-40 w-full min-w-0 overflow-hidden">
      {/* chat messages */}

      <div className="flex-1 mb-5 overflow-y-scroll" ref={containerRef}>
    
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-primary">
            <img
              src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
              alt="logo_full"
              className="w-full max-w-56 sm:max-w-72"
            />
            <p className="mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white ">
              Ask me anything.
            </p>
          </div>
        )}

        {messages.map((message, i) => (
          <Message key={i} message={message} />
        ))}

        {/* three dots animation */}
        {loading && (
          <div className="loader flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce"></div>
          </div>
        )}
      </div>

      {mode === "image" && (
        <label className="inline-flex items-center gap-2 mb-3 text-3 text-sm mx-auto">
          <p className="text-xs">Publish Generated Image to Community </p>
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      )}

      {/* Selected persona – visible as soon as user selects */}
      <p className="text-center text-sm text-gray-500 dark:text-purple-200/80 mb-1">
        {persona === "hitesh" ? "Chat with Hitesh Sir" : "Chat with OSM"}
      </p>

      {/* prompt input box */}
      <form
        onSubmit={onSubmit}
        className="bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#806609F]/30 rounded-full w-full max-w-2xl p-2 sm:p-3 mx-auto flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center justify-between min-w-0"
      >
        <div className="w-full flex flex-wrap gap-2 sm:gap-3 min-w-0 items-center">
          <select
            className="text-xs sm:text-sm outline-none rounded-lg px-2 py-1.5 border border-primary/50 dark:border-white/20 bg-white/50 dark:bg-white/10 shrink-0"
            onChange={(e) => setPersona(e.target.value)}
            value={persona}
            title="Choose who to chat with"
          >
            {personaOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="dark:bg-purple-900">
                {opt.label}
              </option>
            ))}
          </select>
          <select
            className="text-xs sm:text-sm outline-none rounded-lg px-2 py-1.5 border border-primary/50 dark:border-white/20 bg-white/50 dark:bg-white/10 shrink-0"
            onChange={(e) => setMode(e.target.value)}
            value={mode}
          >
            <option value="text" className="dark:bg-purple-900">Text</option>
            <option value="image" className="dark:bg-purple-900">Image</option>
          </select>
          <input
            type="text"
            placeholder="Type your prompt here ..."
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="outline-none flex-1 min-w-0"
          />
        </div>
        <button
          disabled={loading}
          className="pr-2 cursor-pointer"
          onSubmit={onSubmit}
        >
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            alt="send_icon"
          />
        </button>
      </form>
    </div>
  );
};

export default Chatbox;
