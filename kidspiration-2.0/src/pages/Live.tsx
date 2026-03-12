import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Dummy chat messages for the demo
const INITIAL_MESSAGES = [
  {
    id: 1,
    user: "Sarah J.",
    text: "This is so exciting! Hello from Texas 👋",
    time: "10:02 AM",
    isBadge: false,
  },
  {
    id: 2,
    user: "Michael T.",
    text: "Can't wait for the new magazine edition!",
    time: "10:03 AM",
    isBadge: false,
  },
  {
    id: 3,
    user: "System",
    text: "Welcome to the live broadcast! Please be kind in the chat.",
    time: "10:00 AM",
    isBadge: true,
  },
  {
    id: 4,
    user: "Elena R.",
    text: "We are watching with our kids group in Spain 🇪🇸",
    time: "10:05 AM",
    isBadge: false,
  },
].sort((a, b) => a.id - b.id);

export default function Live() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      user: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isBadge: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-slate-950 font-sans">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto p-4 md:p-6 md:pb-10 gap-6">
        {/* Left Column: Video Player & Info */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Video Player Container */}
          <div className="w-full aspect-video bg-slate-900 rounded-2xl md:rounded-3xl overflow-hidden relative shadow-lg ring-1 ring-slate-200 dark:ring-slate-800">
            {/* Fake Video Player Screen */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-slate-800 to-slate-950 text-slate-400">
              <span className="material-symbols-outlined text-[80px]! md:text-[120px]! opacity-50 mb-4 animate-pulse">
                play_circle
              </span>
              <p className="text-xl md:text-2xl font-bold font-display tracking-wide text-white">
                Live Broadcast Starting Soon
              </p>
              <p className="text-sm md:text-base mt-2 opacity-75">
                Waiting for the host to begin the stream...
              </p>
            </div>

            {/* LIVE Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-accent-red/90 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-sm shadow-sm">
              <span className="size-2 rounded-full bg-white animate-pulse"></span>
              LIVE
            </div>

            {/* View Count Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
              <span className="material-symbols-outlined text-[16px]!">
                visibility
              </span>
              1,248
            </div>

            {/* Fake Video Controls */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-linear-to-t from-black/80 to-transparent flex items-end px-4 py-3">
              <div className="w-full flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <button className="hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">
                      play_arrow
                    </span>
                  </button>
                  <button className="hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">volume_up</span>
                  </button>
                  <span className="text-xs font-medium">00:00 / LIVE</span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">settings</span>
                  </button>
                  <button className="hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">
                      fullscreen
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stream Info */}
          <div className="flex flex-col gap-2 px-2">
            <h1 className="text-2xl md:text-3xl font-black font-display text-text-main dark:text-white leading-tight">
              Kidspiration Global Summit 2026
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted dark:text-slate-400">
              <span className="font-medium text-primary">
                Kidspiration Official
              </span>
              <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
              <span>Started streaming 15 mins ago</span>
            </div>
            <p className="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
              Join us live from the Kidspiration headquarters as we unveil the
              newest features, upcoming outreaches, and host special guests from
              around the world. Don't forget to interact in the live chat!
            </p>
          </div>
        </div>

        {/* Right Column: Live Chat Dashboard */}
        <div className="w-full lg:w-[400px] xl:w-[450px] lg:shrink-0 flex flex-col h-[600px] lg:h-[calc(100vh-140px)] bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <h2 className="font-bold font-display text-text-main dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                forum
              </span>
              Live Chat
            </h2>
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isBadge ? "items-center my-2" : "items-start"}`}
              >
                {msg.isBadge ? (
                  <div className="bg-primary/10 text-primary-dark dark:text-primary font-medium text-xs px-3 py-1.5 rounded-full text-center">
                    {msg.text}
                  </div>
                ) : (
                  <div className="flex gap-3 max-w-[90%]">
                    <div className="size-8 rounded-full bg-linear-to-tr from-accent-sky to-primary-dark shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      {msg.user.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`font-bold text-sm ${msg.user === "You" ? "text-primary" : "text-slate-700 dark:text-slate-200"}`}
                        >
                          {msg.user}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5 leading-snug bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-slate-800/80">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Area */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <form onSubmit={handleSendMessage} className="flex gap-2 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Say something nice..."
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl py-3 pl-4 pr-12 outline-none focus:ring-2 focus:ring-primary/50 text-sm transition-all border border-transparent focus:border-primary/30"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="absolute right-2 top-1.5 bottom-1.5 aspect-square bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]!">
                  send
                </span>
              </button>
            </form>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-medium px-1">
              <span>Chat as A Guest</span>
              <span>0/200</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
