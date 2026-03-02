import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { navItems } from "../config/navigation";
import logo from "../assets/kidspiration-logo.png";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-solid border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm">
      {/* Top bar */}
      <div className="flex items-center justify-between whitespace-nowrap px-4 md:px-10 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <img
              src={logo}
              alt="Logo"
              className="h-25 -my-7 cursor-pointer object-contain"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-1 text-sm font-bold transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 w-full origin-left bg-primary transition-transform duration-300 ease-out ${
                    location.pathname === item.path
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Search - desktop only */}
          {/* <label className="hidden lg:flex flex-col min-w-40 h-10 w-64">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-slate-100 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-primary transition-all">
              <div className="text-slate-400 flex items-center justify-center pl-4">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="flex w-full min-w-0 flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white focus:ring-0 placeholder:text-slate-400 px-3 text-sm font-medium"
                placeholder="Search..."
              />
            </div>
          </label> */}
          {/* Join Now - desktop only */}
          <button
            onClick={() => navigate("/signup")}
            className="hidden md:flex items-center justify-center rounded-xl h-10 px-5 bg-primary hover:bg-primary-dark transition-colors text-slate-900 text-sm font-bold tracking-wide shadow-sm"
          >
            <span>Join Now</span>
          </button>
          {/* Log In - always visible */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center rounded-xl h-10 px-5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-900 dark:text-white text-sm font-bold tracking-wide"
          >
            <span>Log In</span>
          </button>
          {/* Cart - desktop only */}
          <button className="hidden md:flex items-center justify-center rounded-xl size-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white relative">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="absolute -top-1 -right-1 size-4 bg-accent-red text-white text-[10px] font-bold flex items-center justify-center rounded-full">
              2
            </span>
          </button>{" "}
          {/* TODO: make this dynamic based on cart items count */}
          {/* Dark mode toggle - desktop only */}
          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center justify-center rounded-xl size-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            <span className="material-symbols-outlined">
              {theme === "light" ? "dark_mode" : "light_mode"}
            </span>
          </button>
          {/* Hamburger - mobile only */}
          <button
            className="flex md:hidden items-center justify-center rounded-xl size-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 flex flex-col gap-3 animate-in slide-in-from-top">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative py-2 w-fit text-sm font-bold transition-colors hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-slate-700 dark:text-slate-300"
              }`}
            >
              {item.label}
              <span
                className={`absolute left-0 bottom-1 h-0.5 w-full origin-left bg-primary transition-transform duration-300 ease-out ${
                  location.pathname === item.path ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-1 flex items-center justify-between">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center justify-center rounded-xl h-10 px-5 bg-primary hover:bg-primary-dark transition-colors text-slate-900 text-sm font-bold tracking-wide shadow-sm"
            >
              <span>Join Now</span>
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/shop")}
                className="flex items-center justify-center rounded-xl size-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white relative"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="absolute -top-1 -right-1 size-4 bg-accent-red text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  2
                </span>
              </button>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center rounded-xl size-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                <span className="material-symbols-outlined">
                  {theme === "light" ? "dark_mode" : "light_mode"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
