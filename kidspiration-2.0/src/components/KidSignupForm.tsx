import { useState } from "react";
import { useFormValidation, type DateValue } from "../context/FormValidation";
import FormInput from "./FormInput";

const API_URL = import.meta.env.VITE_API_URL;

const AVATARS = [
  {
    id: "avatar-1",
    label: "Cool Boy",
    emoji: "🦸‍♂️",
    bgClass: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: "avatar-2",
    label: "Super Girl",
    emoji: "🦸‍♀️",
    bgClass: "bg-pink-100 dark:bg-pink-900/30",
  },
  {
    id: "avatar-3",
    label: "Smart Kid",
    emoji: "🧑‍🚀",
    bgClass: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    id: "avatar-4",
    label: "Star Hero",
    emoji: "🌟",
    bgClass: "bg-orange-100 dark:bg-orange-900/30",
  },
];

const GENDER_OPTIONS = [
  { value: "male", label: "Boy", icon: "face" },
  { value: "female", label: "Girl", icon: "face_3" },
];

async function registerChild(data: {
  avatar: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  parentEmail: string;
}) {
  const response = await fetch(`${API_URL}/auth/child-signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }
  return result;
}

export default function KidSignupForm() {
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].id);
  const [selectedGender, setSelectedGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { values, errors, setValue, validate, getDateAsISO } =
    useFormValidation(
      {
        firstName: "",
        lastName: "",
        dateOfBirth: { day: "", month: "", year: "" } as DateValue,
        parentEmail: "",
      },
      {
        firstName: { required: true, minLength: 2 },
        lastName: { required: true, minLength: 2 },
        dateOfBirth: { required: true, maxAge: 17 },
        parentEmail: {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
      },
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isValid = validate();

    if (!selectedGender) {
      setError("Please select boy or girl");
      if (!isValid) return;
      return;
    }

    if (!isValid) return;

    const dob = getDateAsISO("dateOfBirth");
    if (!dob) return;

    setIsLoading(true);
    try {
      await registerChild({
        avatar: selectedAvatar,
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: dob,
        gender: selectedGender,
        parentEmail: values.parentEmail,
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="lg:w-7/12 w-full bg-white dark:bg-[#1a170d] rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-[#e8e2ce] dark:border-[#3a3525] overflow-hidden text-center">
        <div className="py-12">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Your Hero Profile is Ready!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            We've sent your parent an email to confirm your account. Ask them to
            check their inbox!
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-semibold">
            <span className="material-symbols-outlined text-lg">
              check_circle
            </span>
            Waiting for parent approval
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-7/12 w-full bg-white dark:bg-[#1a170d] rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-[#e8e2ce] dark:border-[#3a3525] overflow-hidden relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <form onSubmit={handleSubmit} className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/20 rounded-full mb-4">
            <span className="material-symbols-outlined text-3xl text-slate-900 dark:text-white">
              rocket_launch
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
            Create Your Hero Profile!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Let's get you ready to save the world.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Avatar Selection */}
        <div className="mb-8">
          <label className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-slate-900 text-sm font-bold">
              1
            </span>
            Choose Your Look
          </label>
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {AVATARS.map((avatar) => (
              <label key={avatar.id} className="cursor-pointer group relative">
                <input
                  type="radio"
                  name="avatar"
                  value={avatar.id}
                  checked={selectedAvatar === avatar.id}
                  onChange={() => setSelectedAvatar(avatar.id)}
                  className="peer sr-only"
                />
                <div
                  className={`aspect-square rounded-2xl ${avatar.bgClass} p-2 flex items-center justify-center transition-all duration-300 border-2 border-transparent peer-checked:border-primary peer-checked:scale-105 peer-checked:shadow-lg group-hover:bg-primary/20`}
                >
                  <span className="text-4xl sm:text-5xl">{avatar.emoji}</span>
                </div>
                <div className="absolute -top-2 -right-2 bg-white text-primary rounded-full p-0.5 shadow-sm opacity-0 peer-checked:opacity-100 transition-all scale-0 peer-checked:scale-100">
                  <span className="material-symbols-outlined text-sm font-bold block">
                    check
                  </span>
                </div>
                <p className="text-xs font-semibold text-center mt-1 text-slate-600 dark:text-slate-400">
                  {avatar.label}
                </p>
              </label>
            ))}
          </div>
        </div>

        {/* Step 2: Name */}
        <div className="mb-8">
          <label className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-slate-900 text-sm font-bold">
              2
            </span>
            What is your name?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              placeholder="e.g. David"
              value={values.firstName}
              onChange={(v) => setValue("firstName", v)}
              error={errors.firstName}
            />
            <FormInput
              label="Last Name"
              placeholder="e.g. Johnson"
              value={values.lastName}
              onChange={(v) => setValue("lastName", v)}
              error={errors.lastName}
            />
          </div>
        </div>

        {/* Step 3: Date of Birth & Gender */}
        <div className="mb-8">
          <label className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-slate-900 text-sm font-bold">
              3
            </span>
            Tell us about you
          </label>

          {/* Date of Birth */}
          <div className="mb-4">
            <span className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">
              Date of Birth
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  placeholder="DD"
                  value={
                    typeof values.dateOfBirth === "object"
                      ? values.dateOfBirth.day
                      : ""
                  }
                  onChange={(e) => {
                    const dob =
                      typeof values.dateOfBirth === "object"
                        ? values.dateOfBirth
                        : { day: "", month: "", year: "" };
                    setValue("dateOfBirth", {
                      ...dob,
                      day: e.target.value.replace(/\D/g, ""),
                    } as DateValue);
                  }}
                  className={`w-full rounded-xl border bg-[#fcfbf8] dark:bg-[#221e10] px-4 py-3 text-center text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none transition-all focus:ring-1 focus:ring-primary ${
                    errors.dateOfBirth
                      ? "border-red-400"
                      : "border-[#e8e2ce] dark:border-[#3a3525] focus:border-primary"
                  }`}
                />
              </div>
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  placeholder="MM"
                  value={
                    typeof values.dateOfBirth === "object"
                      ? values.dateOfBirth.month
                      : ""
                  }
                  onChange={(e) => {
                    const dob =
                      typeof values.dateOfBirth === "object"
                        ? values.dateOfBirth
                        : { day: "", month: "", year: "" };
                    setValue("dateOfBirth", {
                      ...dob,
                      month: e.target.value.replace(/\D/g, ""),
                    } as DateValue);
                  }}
                  className={`w-full rounded-xl border bg-[#fcfbf8] dark:bg-[#221e10] px-4 py-3 text-center text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none transition-all focus:ring-1 focus:ring-primary ${
                    errors.dateOfBirth
                      ? "border-red-400"
                      : "border-[#e8e2ce] dark:border-[#3a3525] focus:border-primary"
                  }`}
                />
              </div>
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="YYYY"
                  value={
                    typeof values.dateOfBirth === "object"
                      ? values.dateOfBirth.year
                      : ""
                  }
                  onChange={(e) => {
                    const dob =
                      typeof values.dateOfBirth === "object"
                        ? values.dateOfBirth
                        : { day: "", month: "", year: "" };
                    setValue("dateOfBirth", {
                      ...dob,
                      year: e.target.value.replace(/\D/g, ""),
                    } as DateValue);
                  }}
                  className={`w-full rounded-xl border bg-[#fcfbf8] dark:bg-[#221e10] px-4 py-3 text-center text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none transition-all focus:ring-1 focus:ring-primary ${
                    errors.dateOfBirth
                      ? "border-red-400"
                      : "border-[#e8e2ce] dark:border-[#3a3525] focus:border-primary"
                  }`}
                />
              </div>
            </div>
            {errors.dateOfBirth && (
              <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <span className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">
              I am a...
            </span>
            <div className="grid grid-cols-2 gap-3">
              {GENDER_OPTIONS.map((opt) => (
                <label key={opt.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={opt.value}
                    checked={selectedGender === opt.value}
                    onChange={() => setSelectedGender(opt.value)}
                    className="peer sr-only"
                  />
                  <div
                    className={`px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                      selectedGender === opt.value
                        ? "border-primary bg-primary/5"
                        : "border-[#e8e2ce] dark:border-[#3a3525] bg-[#fcfbf8] dark:bg-[#221e10] hover:border-primary/50"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {opt.icon}
                    </span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {opt.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Parent Email */}
        <div className="pt-4 mb-8 border-t border-dashed border-primary/20">
          <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 mt-4 uppercase tracking-wider">
            For Your Sidekick (Parent)
          </label>
          <FormInput
            label="Parent's Email Address"
            type="email"
            placeholder="parent@example.com"
            icon="mail"
            value={values.parentEmail}
            onChange={(v) => setValue("parentEmail", v)}
            error={errors.parentEmail}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="group w-full flex items-center justify-center bg-primary hover:bg-yellow-400 text-slate-900 text-lg sm:text-xl font-extrabold py-4 sm:py-5 px-8 rounded-2xl shadow-lg hover:shadow-xl active:translate-y-[2px] active:shadow-none transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Creating...
            </span>
          ) : (
            <>
              <span className="mr-2">Start My Adventure</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform font-bold">
                arrow_forward
              </span>
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
          By clicking start, you agree to our{" "}
          <a
            className="text-primary font-bold hover:text-yellow-600 dark:hover:text-yellow-400 underline"
            href="#"
          >
            Hero's Code
          </a>
          .
        </p>
      </form>
    </div>
  );
}
