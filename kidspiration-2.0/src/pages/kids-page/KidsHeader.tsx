import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/kidspiration-logo.png";

export default function KidsHeader() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

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
      <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
        <input
          className="w-full h-12 pl-12 pr-4 rounded-full bg-slate-100 border-2 border-slate-200 focus:border-kids-blue focus:ring-0 text-text-main font-bold placeholder-slate-400 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white font-sans"
          placeholder="Search for fun games & videos..."
          type="text"
        />
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
          search
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Sparks counter */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-primary-light to-white px-4 py-2 rounded-full border-2 border-primary shadow-sm hover:shadow-md transition-shadow cursor-pointer dark:from-slate-800 dark:to-slate-900 dark:border-primary">
          <span className="material-symbols-outlined text-primary text-2xl drop-shadow-sm">
            stars
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-black text-lg text-text-main dark:text-white">
              450
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
        <button className="relative h-12 w-12 rounded-full overflow-hidden border-4 border-white shadow-md ring-2 ring-primary dark:border-slate-800">
          <img
            alt="Avatar"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAolA6YUqOaldvT97ekPzBSdYDq58hce-NARSUCdF-vvh0qYrbAM0dlX7m263gW5lRDy-aL-6eb6bmiJ92CT7sQTqztdeadOt2KNghZ95NPJj32v5KVZ8yVYQr66aM6wwHV3zKYM8Ojn97G0casH09DLDKEd41GM6OckqmiNJLOFxm7JaDKFlRt7MVcRYk2TI-lWfLJxAiMHYIcGh3QWzy0WdwfNerlpMlFZvLVL4GR1e10GfOKqsH5yZxFUQyaOAcYj4ydQaQn1oCl"
          />
        </button>
      </div>
    </header>
  );
}
