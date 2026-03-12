import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKids } from "../../context/KidsContext";
import { AVATARS } from "../../data/avatars";

export default function AvatarBuilder() {
  const navigate = useNavigate();
  const { avatar, setAvatar, playerName, setPlayerName } = useKids();

  const [selectedAvatar, setSelectedAvatar] = useState(avatar);
  const [nameInput, setNameInput] = useState(playerName);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setAvatar(selectedAvatar);
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim());
    }

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      navigate("/kids");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center gap-4 border-b-4 border-primary bg-white px-6 py-4 shadow-sm dark:border-primary dark:bg-slate-900">
        <button
          onClick={() => navigate("/kids")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 font-bold"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-xl font-black text-text-main dark:text-white font-display">
          Customize Profile
        </h1>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-8 mt-4">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
          {/* Left Column: Preview & Input */}
          <div className="flex flex-col items-center gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 w-full shadow-md border-2 border-slate-100 dark:border-slate-700 flex flex-col items-center text-center">
              <div className="relative w-40 h-40 mb-6 group">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
                <img
                  src={selectedAvatar}
                  alt="Avatar preview"
                  className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-700 shadow-xl z-10 bg-slate-100 dark:bg-slate-900"
                />

                {/* Floating edit icon */}
                <div className="absolute bottom-0 right-0 z-20 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-md">
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  Hero Name
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-center font-black text-xl text-text-main dark:text-white focus:border-primary focus:ring-0 transition-colors"
                  placeholder="Enter your name..."
                  maxLength={15}
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`w-full py-4 px-6 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all ${
                isSaved
                  ? "bg-kids-green text-white scale-105"
                  : "bg-primary hover:bg-primary-dark text-white active:scale-95 shadow-lg shadow-primary/30"
              }`}
            >
              {isSaved ? (
                <>
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>
                  Saved!
                </>
              ) : (
                <>
                  Save Profile
                  <span className="material-symbols-outlined">save</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Avatar Grid */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-md border-2 border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-black text-text-main dark:text-white font-display mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-kids-pink">
                face
              </span>
              Choose an Avatar
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {AVATARS.map((avatarData) => (
                <button
                  key={avatarData.id}
                  onClick={() => setSelectedAvatar(avatarData.url)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-4 transition-all ${
                    selectedAvatar === avatarData.url
                      ? "border-primary shadow-lg scale-105 z-10"
                      : "border-transparent hover:border-slate-300 dark:hover:border-slate-600 hover:scale-105"
                  }`}
                >
                  <img
                    src={avatarData.url}
                    alt={avatarData.name}
                    className="w-full h-full object-cover bg-slate-100 dark:bg-slate-900"
                  />

                  {/* Selected checkmark */}
                  {selectedAvatar === avatarData.url && (
                    <div className="absolute top-2 right-2 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[14px]">
                        check
                      </span>
                    </div>
                  )}

                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-2 pt-6 text-center">
                    <span className="text-white text-xs font-bold truncate block drop-shadow-md">
                      {avatarData.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
