import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/kidspiration-logo.png";
import { useKids } from "../../context/KidsContext";
import { useState, useMemo, useRef, useEffect } from "react";
import { GAMES } from "../../data/games";

export default function KidsHeader() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { sparks, avatar } = useKids();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return GAMES.filter(
      (game) =>
        game.name.toLowerCase().includes(query) ||
        game.tag.toLowerCase().includes(query),
    ).slice(0, 5); // Limit to top 5 results
  }, [searchQuery]);

  const handleSelectGame = (gameId: string) => {
    setSearchQuery("");
    setIsSearchFocused(false);
    navigate(`/kids/game/${gameId}`);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b-4 border-primary bg-white px-6 py-3 lg:px-10 shadow-sm dark:border-primary dark:bg-slate-900">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 text-slate-900 dark:text-white">
          <img
            src={logo}
            alt="Logo"
            className="h-35 -my-10 cursor-pointer object-contain"
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      {/* Search bar — desktop */}
      <div
        className="hidden md:flex flex-1 max-w-lg mx-8 relative"
        ref={searchContainerRef}
      >
        <div className="relative w-full">
          <input
            className="w-full h-12 pl-12 pr-4 rounded-full bg-slate-100 border-2 border-slate-200 focus:border-kids-blue focus:ring-0 text-text-main font-bold placeholder-slate-400 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white font-sans"
            placeholder="Search for fun games & videos..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center p-1"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>

        {/* Search Dropdown */}
        {isSearchFocused && searchQuery && (
          <div className="absolute top-14 left-0 right-0 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-2 border-slate-100 dark:border-slate-700 overflow-hidden z-50 py-2">
            {searchResults.length > 0 ? (
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                  Games
                </span>
                {searchResults.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => handleSelectGame(game.id)}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
                      <span
                        className={`material-symbols-outlined text-${game.tagColor}`}
                      >
                        {game.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-text-main dark:text-white text-sm">
                        {game.name}
                      </h4>
                      <p className="text-xs font-bold text-slate-400">
                        {game.tag}
                      </p>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-slate-300">
                      chevron_right
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-6 py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto mb-3">
                  <span className="material-symbols-outlined text-3xl text-slate-300">
                    search_off
                  </span>
                </div>
                <p className="font-bold text-slate-500 dark:text-slate-400">
                  No games found for "{searchQuery}"
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  Try searching for "math", "bible", or "space"!
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Sparks counter */}
        <div className="flex items-center gap-2 bg-linear-to-r from-primary-light to-white px-4 py-2 rounded-full border-2 border-primary shadow-sm hover:shadow-md transition-shadow cursor-pointer dark:from-slate-800 dark:to-slate-900 dark:border-primary">
          <span className="material-symbols-outlined text-primary text-2xl drop-shadow-sm">
            stars
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-black text-lg text-text-main dark:text-white">
              {sparks}
            </span>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider dark:text-slate-400">
              Sparks
            </span>
          </div>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="hidden md:flex items-center justify-center rounded-xl size-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          <span className="material-symbols-outlined">
            {theme === "light" ? "dark_mode" : "light_mode"}
          </span>
        </button>

        {/* Avatar */}
        <button
          onClick={() => navigate("/kids/avatar")}
          className="relative h-12 w-12 rounded-full overflow-hidden border-4 border-white shadow-md ring-2 ring-primary dark:border-slate-800 hover:scale-105 transition-transform"
        >
          <img
            alt="Avatar"
            className="h-full w-full object-cover bg-slate-100 dark:bg-slate-900"
            src={avatar}
          />
        </button>
      </div>
    </header>
  );
}
