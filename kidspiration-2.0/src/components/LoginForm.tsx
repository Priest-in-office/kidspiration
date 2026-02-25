import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFormValidation } from "../context/FormValidation";
import FormInput from "./FormInput";

const VALIDATION_RULES = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: { required: true, minLength: 8 },
};

export default function LoginForm() {
  const {
    login,
    isLoading,
    error: authError,
    clearError,
    isAuthenticated,
    isChild,
  } = useAuth();
  const navigate = useNavigate();

  // Redirect after successful login based on role
  useEffect(() => {
    if (isAuthenticated) {
      navigate(isChild ? "/kid-dashboard" : "/dashboard");
    }
  }, [isAuthenticated, isChild, navigate]);

  const { values, errors, setValue, validate } = useFormValidation(
    { email: "", password: "" },
    VALIDATION_RULES,
  );

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    clearError();

    if (!validate()) return;

    await login({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="lg:w-7/12 w-full bg-white dark:bg-[#1a170d] rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-[#e8e2ce] dark:border-[#3a3525] overflow-hidden">
      <form onSubmit={handleSubmit}>
        {/* Auth Error Banner */}
        {authError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">error</span>
            <span>{authError}</span>
          </div>
        )}

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          Enter your credentials to access your account.
        </p>

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
            placeholder="Enter your password"
            icon="lock"
            value={values.password}
            onChange={(v) => setValue("password", v)}
            error={errors.password}
          />
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end mb-8">
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-primary hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
          >
            Forgot password?
          </Link>
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
              Logging in...
            </span>
          ) : (
            "Log In"
          )}
        </button>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-slate-900 dark:text-slate-100 hover:text-primary transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
