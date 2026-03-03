import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth, type SignUpData } from "../context/AuthContext";
import { useFormValidation } from "../context/FormValidation";
import FormInput from "./FormInput";
import CountrySelect from "./CountrySelect";
import RoleCard from "./RoleCard";

const ROLE_OPTIONS = [
  {
    value: "parent_or_mentor" as const,
    label: "Parent or Mentor",
    description: "Connect with your kids and track their spiritual journey.",
    icon: "family_star",
    iconBgClass: "bg-orange-100 dark:bg-orange-900/30",
    iconTextClass: "text-orange-600 dark:text-orange-400",
  },
  {
    value: "pastor_or_leader" as const,
    label: "Pastor or Leader",
    description: "Manage groups, organize events, and share resources.",
    icon: "church",
    iconBgClass: "bg-blue-100 dark:bg-blue-900/30",
    iconTextClass: "text-blue-600 dark:text-blue-400",
  },
];

const VALIDATION_RULES = {
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: { required: true, minLength: 8 },
};

export default function SignupForm() {
  const { signup, isLoading, error: authError, clearError } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryRole = queryParams.get("role") as SignUpData["role"] | null;
  const isValidRole = ROLE_OPTIONS.some((opt) => opt.value === queryRole);
  const initialRole = isValidRole && queryRole ? queryRole : "parent_or_mentor";

  const [role, setRole] = useState<SignUpData["role"]>(initialRole);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");

  const { values, errors, setValue, validate } = useFormValidation(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: "",
    },
    { ...VALIDATION_RULES, country: { required: true } },
  );

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    clearError();
    setTermsError("");

    const isValid = validate();

    if (!termsAccepted) {
      setTermsError("You must accept the terms to continue");
    }

    if (!isValid || !termsAccepted) return;

    await signup({
      role,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      country: values.country,
      child: {
        avatar: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
      },
    });
  };

  return (
    <div className="lg:w-7/12 w-full bg-card-bg dark:bg-[#1a170d] rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-[#e8e2ce] dark:border-[#3a3525] overflow-hidden">
      <form onSubmit={handleSubmit}>
        {/* Auth Error Banner */}
        {authError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">error</span>
            <span>{authError}</span>
          </div>
        )}

        {/* Role Selection */}
        <div className="mb-8">
          <label className="block text-slate-900 dark:text-slate-100 text-base font-bold mb-4">
            I am joining as a...
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ROLE_OPTIONS.map((option) => (
              <RoleCard
                key={option.value}
                value={option.value}
                label={option.label}
                description={option.description}
                icon={option.icon}
                iconBgClass={option.iconBgClass}
                iconTextClass={option.iconTextClass}
                selected={role === option.value}
                onSelect={() => setRole(option.value)}
              />
            ))}
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <FormInput
            label="First Name"
            placeholder="Jane"
            value={values.firstName}
            onChange={(v) => setValue("firstName", v)}
            error={errors.firstName}
          />
          <FormInput
            label="Last Name"
            placeholder="Doe"
            value={values.lastName}
            onChange={(v) => setValue("lastName", v)}
            error={errors.lastName}
          />
        </div>

        {/* Email & Password */}
        <div className="flex flex-col gap-5 mb-5">
          <FormInput
            label="Email Address"
            type="email"
            placeholder="example@kidspiration.world"
            icon="mail"
            value={values.email}
            onChange={(v) => setValue("email", v)}
            error={errors.email}
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Create a secure password"
            icon="lock"
            value={values.password}
            onChange={(v) => setValue("password", v)}
            error={errors.password}
            hint="Must be at least 8 characters long."
            showPasswordToggle
          />
        </div>

        {/* Country */}
        <div className="mb-5">
          <CountrySelect
            label="Country"
            value={values.country}
            onChange={(v) => setValue("country", v)}
            error={errors.country}
          />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 mb-8">
          <div className="flex h-6 items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                if (e.target.checked) setTermsError("");
              }}
              className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary bg-transparent"
            />
          </div>
          <div className="text-sm leading-6">
            <label
              className={`${termsError ? "text-red-500" : "text-slate-600 dark:text-slate-400"}`}
              htmlFor="terms"
            >
              By creating an account, you agree to our{" "}
              <a
                className="font-semibold text-primary hover:text-yellow-600 dark:hover:text-yellow-400"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                className="font-semibold text-primary hover:text-yellow-600 dark:hover:text-yellow-400"
                href="#"
              >
                Privacy Policy
              </a>
              .
            </label>
            {termsError && (
              <p className="text-xs text-red-500 mt-1">{termsError}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-primary py-4 px-6 text-base font-bold text-[#1c180d] shadow-lg hover:bg-yellow-400 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
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
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-slate-900 dark:text-slate-100 hover:text-primary transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
