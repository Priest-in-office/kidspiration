import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormValidation } from "../context/FormValidation";
import FormInput from "./FormInput";

const API_URL = import.meta.env.VITE_API_URL;

type Step = "email" | "verification" | "reset";

async function sendResetCode(email: string) {
  const response = await fetch(`${API_URL}/password-recovery/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to send reset code");
  }
}

async function verifyCode(email: string, code: string) {
  const response = await fetch(`${API_URL}/password-recovery/verify-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to verify code");
  }
}

async function resetPassword(email: string, code: string, newPassword: string) {
  const response = await fetch(`${API_URL}/password-recovery/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code, new_password: newPassword }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to reset password");
  }
}

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  const masked =
    local.length <= 6
      ? local[0] + "*".repeat(local.length - 2) + local[local.length - 1]
      : local.slice(0, 3) + "*".repeat(local.length - 6) + local.slice(-3);
  return `${masked}@${domain}`;
}

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const emailForm = useFormValidation(
    { email: "" },
    { email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ } },
  );

  const codeForm = useFormValidation(
    { code: "" },
    { code: { required: true, minLength: 6 } },
  );

  const passwordForm = useFormValidation(
    { password: "", confirmPassword: "" },
    {
      password: { required: true, minLength: 8 },
      confirmPassword: { required: true, match: "password" },
    },
  );

  useEffect(() => {
    setError(null);
    setMessage(null);
  }, [step]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.validate()) return;

    setIsLoading(true);
    setError(null);
    try {
      await sendResetCode(emailForm.values.email);
      setUserEmail(emailForm.values.email);
      setStep("verification");
    } catch {
      setError("Email not found. Please check and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeForm.validate()) return;

    setIsLoading(true);
    setError(null);
    try {
      await verifyCode(userEmail, codeForm.values.code);
      setStep("reset");
    } catch {
      setError("Invalid code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.validate()) return;

    if (passwordForm.values.password !== passwordForm.values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await resetPassword(
        userEmail,
        codeForm.values.code,
        passwordForm.values.password,
      );
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await sendResetCode(userEmail);
      setMessage("A new code has been sent to your email.");
    } catch {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const stepConfig = {
    email: { title: "", subtitle: "", handler: handleEmailSubmit },
    verification: {
      title: "Enter Verification Code",
      subtitle: "",
      handler: handleCodeSubmit,
    },
    reset: {
      title: "Reset Password",
      subtitle: "Choose a strong new password for your account.",
      handler: handleResetPassword,
    },
  };

  return (
    <div className="lg:w-7/12 w-full bg-white dark:bg-[#1a170d] rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-[#e8e2ce] dark:border-[#3a3525] overflow-hidden">
      <form onSubmit={stepConfig[step].handler}>
        {/* Step Header */}
        {stepConfig[step].title && (
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {stepConfig[step].title}
          </h2>
        )}
        {step === "verification" && (
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            We've sent a 6-digit code to{" "}
            <span className="text-primary font-semibold">
              {maskEmail(userEmail)}
            </span>
          </p>
        )}
        {stepConfig[step].subtitle && (
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            {stepConfig[step].subtitle}
          </p>
        )}

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Success Banner */}
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">
              check_circle
            </span>
            <span>{message}</span>
          </div>
        )}

        {/* Step: Email */}
        {step === "email" && (
          <div className="flex flex-col gap-5 mb-8">
            <FormInput
              label="Email Address"
              type="email"
              placeholder="example@kidspiration.world"
              icon="mail"
              value={emailForm.values.email}
              onChange={(v) => emailForm.setValue("email", v)}
              error={emailForm.errors.email}
            />
          </div>
        )}

        {/* Step: Verification Code */}
        {step === "verification" && (
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              value={codeForm.values.code}
              onChange={(e) =>
                codeForm.setValue("code", e.target.value.replace(/\D/g, ""))
              }
              className={`w-full rounded-xl border bg-[#fcfbf8] dark:bg-[#221e10] h-14 px-6 text-center text-2xl font-bold tracking-[0.5em] text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 placeholder:tracking-[0.5em] focus:ring-1 focus:ring-primary ${
                codeForm.errors.code
                  ? "border-red-400 focus:border-red-500"
                  : "border-[#e8e2ce] dark:border-[#3a3525] focus:border-primary"
              }`}
            />
            {codeForm.errors.code && (
              <p className="text-xs text-red-500 mt-2">
                {codeForm.errors.code}
              </p>
            )}
          </div>
        )}

        {/* Step: Reset Password */}
        {step === "reset" && (
          <div className="flex flex-col gap-5 mb-8">
            <FormInput
              label="New Password"
              type="password"
              placeholder="At least 8 characters"
              icon="lock"
              value={passwordForm.values.password}
              onChange={(v) => passwordForm.setValue("password", v)}
              error={passwordForm.errors.password}
              hint="Must be at least 8 characters long."
            />
            <FormInput
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              icon="lock"
              value={passwordForm.values.confirmPassword}
              onChange={(v) => passwordForm.setValue("confirmPassword", v)}
              error={passwordForm.errors.confirmPassword}
            />
          </div>
        )}

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
              {step === "email"
                ? "Sending..."
                : step === "verification"
                  ? "Verifying..."
                  : "Resetting..."}
            </span>
          ) : step === "email" ? (
            "Send Reset Code"
          ) : step === "verification" ? (
            "Verify Code"
          ) : (
            "Reset Password"
          )}
        </button>

        {/* Step-specific actions */}
        {step === "verification" && (
          <div className="mt-6 space-y-3 text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isLoading}
              className="text-primary text-sm font-semibold hover:underline disabled:opacity-50"
            >
              Didn't receive the code? Resend
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("email");
                codeForm.setValue("code", "");
              }}
              className="block w-full text-slate-500 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors"
            >
              ← Use a different email
            </button>
          </div>
        )}

        {/* Back to Login */}
        {step === "email" && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Remember your password?{" "}
              <Link
                to="/login"
                className="font-bold text-slate-900 dark:text-slate-100 hover:text-primary transition-colors"
              >
                Log In
              </Link>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
