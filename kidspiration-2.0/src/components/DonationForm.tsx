import { useState } from "react";
import { useFormValidation } from "../context/FormValidation";
import FormInput from "./FormInput";
import "../types/paystack.d.ts";

// ──────────────────────────── Constants ────────────────────────────

const PAYSTACK_PUBLIC_KEY = "pk_test_xxxxx"; // TODO: Replace with real key

const PLAN_OPTIONS = [
  {
    value: "one-time",
    label: "One-Time Gift",
    description: "Make a single donation to support our mission.",
    icon: "volunteer_activism",
    iconBgClass: "bg-primary/20",
    iconTextClass: "text-primary",
  },
  {
    value: "monthly",
    label: "Monthly Partner",
    description: "Become a recurring partner with a monthly pledge.",
    icon: "favorite",
    iconBgClass: "bg-pink-100 dark:bg-pink-900/30",
    iconTextClass: "text-pink-600 dark:text-pink-400",
  },
];

const PRESET_AMOUNTS = [5000, 10000, 25000, 50000];

const VALIDATION_RULES = {
  fullName: { required: true, minLength: 2 },
  email: { required: true, isEmail: true },
  phone: { required: true, isPhone: true },
};

// ──────────────────────────── Component ────────────────────────────

export default function DonationForm() {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState("one-time");
  const [givingPurpose, setGivingPurpose] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "failed"
  >("idle");
  const [paymentRef, setPaymentRef] = useState("");

  const { values, errors, setValue, validate } = useFormValidation(
    { fullName: "", email: "", phone: "" },
    VALIDATION_RULES,
  );

  // ─── Derived ───
  const finalAmount = amount ?? (customAmount ? parseInt(customAmount) : 0);

  // ─── Step Navigation ───
  const handleStep1Next = () => {
    if (!finalAmount || finalAmount < 100) {
      setAmountError("Please select or enter an amount (min ₦100)");
      return;
    }
    setAmountError("");
    setStep(2);
  };

  const handleStep2Next = () => {
    if (!validate()) return;
    setStep(3);
    initiatePayment();
  };

  // ─── Paystack ───
  const initiatePayment = () => {
    setPaymentStatus("processing");

    try {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: values.email,
        amount: finalAmount * 100, // Paystack expects kobo
        currency: "NGN",
        ref: `KSP-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        metadata: {
          fullName: values.fullName,
          phone: values.phone,
          plan,
          givingPurpose,
          custom_fields: [
            {
              display_name: "Full Name",
              variable_name: "full_name",
              value: values.fullName,
            },
            {
              display_name: "Phone",
              variable_name: "phone",
              value: values.phone,
            },
            {
              display_name: "Giving Purpose",
              variable_name: "giving_purpose",
              value: givingPurpose,
            },
          ],
        },
        callback: (response) => {
          setPaymentRef(response.reference);
          setPaymentStatus("success");
        },
        onClose: () => {
          if (paymentStatus !== "success") {
            setPaymentStatus("failed");
          }
        },
      });
      handler.openIframe();
    } catch {
      setPaymentStatus("failed");
    }
  };

  // ──────────────────────── Step Indicator ─────────────────────────

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`size-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              s === step
                ? "bg-primary text-slate-900 shadow-md shadow-primary/30"
                : s < step
                  ? "bg-primary/20 text-primary"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400"
            }`}
          >
            {s < step ? (
              <span className="material-symbols-outlined text-sm">check</span>
            ) : (
              s
            )}
          </div>
          {s < 3 && (
            <div
              className={`w-8 h-0.5 rounded-full transition-colors ${
                s < step ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  // ──────────────────────── Step 1 — Plan ──────────────────────────

  const renderStep1 = () => (
    <>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Choose Your Giving Plan
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
        Select how you'd like to partner with us.
      </p>

      {/* Plan Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {PLAN_OPTIONS.map((option) => (
          <label key={option.value} className="cursor-pointer group relative">
            <input
              type="radio"
              name="plan"
              value={option.value}
              checked={plan === option.value}
              onChange={() => setPlan(option.value)}
              className="peer sr-only"
            />
            <div
              className={`h-full p-4 rounded-2xl border-2 transition-all flex flex-col gap-3 ${
                plan === option.value
                  ? "border-primary bg-primary/5"
                  : "border-[#e8e2ce] dark:border-[#3a3525] bg-background-light dark:bg-background-dark hover:border-primary/50"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${option.iconBgClass} ${option.iconTextClass}`}
              >
                <span className="material-symbols-outlined">{option.icon}</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {option.label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                  {option.description}
                </p>
              </div>
              <div
                className={`absolute top-4 right-4 text-primary transition-opacity ${
                  plan === option.value ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="material-symbols-outlined fill-current">
                  check_circle
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Giving Purpose */}
      <div className="mb-8">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">
            I am giving for...
          </span>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              category
            </span>
            <select
              value={givingPurpose}
              onChange={(e) => setGivingPurpose(e.target.value)}
              className={`w-full rounded-xl border bg-[#fcfbf8] dark:bg-[#221e10] pl-11 pr-10 py-3 text-slate-900 dark:text-slate-100 outline-none transition-all appearance-none cursor-pointer border-[#e8e2ce] dark:border-[#3a3525] focus:border-primary focus:ring-1 focus:ring-primary ${
                !givingPurpose ? "text-slate-400" : ""
              }`}
            >
              <option value="" disabled>
                Select a purpose
              </option>
              {/* ── Add your options here ── */}
              <option value="outreaches">Outreaches</option>
              <option value="missions">Missions</option>
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">
              expand_more
            </span>
          </div>
        </label>
      </div>

      {/* Amount Selection */}
      <label className="block text-slate-900 dark:text-slate-100 text-base font-bold mb-4">
        Select Amount (₦)
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {PRESET_AMOUNTS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setAmount(preset);
              setCustomAmount("");
              setAmountError("");
            }}
            className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 ${
              amount === preset
                ? "border-primary bg-primary/10 text-primary"
                : "border-[#e8e2ce] dark:border-[#3a3525] text-slate-700 dark:text-slate-300 hover:border-primary/50"
            }`}
          >
            ₦{preset.toLocaleString()}
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="mb-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
            ₦
          </span>
          <input
            type="number"
            min="100"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount(null);
              setAmountError("");
            }}
            className="w-full rounded-xl border border-[#e8e2ce] dark:border-[#3a3525] bg-[#fcfbf8] dark:bg-[#221e10] px-4 py-3 pl-8 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        {amountError && (
          <p className="text-xs text-red-500 mt-2">{amountError}</p>
        )}
      </div>

      {/* Summary */}
      {finalAmount > 0 && (
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6 flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-300">
            {plan === "monthly" ? "Monthly" : "One-time"} donation
          </span>
          <span className="text-xl font-black text-primary">
            ₦{finalAmount.toLocaleString()}
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={handleStep1Next}
        className="w-full rounded-xl bg-primary py-4 px-6 text-base font-bold text-[#1c180d] shadow-lg hover:bg-yellow-400 hover:shadow-xl transition-all"
      >
        Continue
      </button>
    </>
  );

  // ──────────────────────── Step 2 — Info ──────────────────────────

  const renderStep2 = () => (
    <>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Your Information
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
        We'll send your receipt to the email below.
      </p>

      <div className="flex flex-col gap-5 mb-8">
        <FormInput
          label="Full Name"
          placeholder="Jane Doe"
          icon="person"
          value={values.fullName}
          onChange={(v) => setValue("fullName", v)}
          error={errors.fullName}
        />
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
          label="Phone Number"
          type="tel"
          placeholder="+234 812 345 6789"
          icon="call"
          value={values.phone}
          onChange={(v) => setValue("phone", v)}
          error={errors.phone}
        />
      </div>

      {/* Summary reminder */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">
            {plan === "monthly" ? "favorite" : "volunteer_activism"}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-300">
            {plan === "monthly" ? "Monthly" : "One-time"} donation
          </span>
        </div>
        <span className="text-lg font-black text-primary">
          ₦{finalAmount.toLocaleString()}
        </span>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 rounded-xl py-4 px-6 text-base font-bold border-2 border-[#e8e2ce] dark:border-[#3a3525] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleStep2Next}
          className="flex-[2] rounded-xl bg-primary py-4 px-6 text-base font-bold text-[#1c180d] shadow-lg hover:bg-yellow-400 hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">lock</span>
          Proceed to Payment
        </button>
      </div>
    </>
  );

  // ──────────────────────── Step 3 — Payment ──────────────────────

  const renderStep3 = () => (
    <div className="text-center py-8">
      {paymentStatus === "processing" && (
        <>
          <svg
            className="animate-spin h-12 w-12 text-primary mx-auto mb-6"
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Processing Payment
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Complete the payment in the Paystack popup window.
          </p>
        </>
      )}

      {paymentStatus === "success" && (
        <>
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-4xl">
              check_circle
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Thank You! 🎉
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
            Your{" "}
            {plan === "monthly" ? "monthly partnership" : "one-time donation"}{" "}
            of{" "}
            <strong className="text-primary">
              ₦{finalAmount.toLocaleString()}
            </strong>{" "}
            has been received.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
            Reference: {paymentRef}
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
            A receipt has been sent to <strong>{values.email}</strong>. Your
            generosity is helping reach millions of children with the Gospel.
          </p>
        </>
      )}

      {paymentStatus === "failed" && (
        <>
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-4xl">
              error
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Payment Not Completed
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            The payment was cancelled or couldn't be processed. No charges were
            made.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => {
                setStep(2);
                setPaymentStatus("idle");
              }}
              className="rounded-xl py-3 px-6 text-sm font-bold border-2 border-[#e8e2ce] dark:border-[#3a3525] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Go Back
            </button>
            <button
              type="button"
              onClick={initiatePayment}
              className="rounded-xl bg-primary py-3 px-6 text-sm font-bold text-[#1c180d] shadow-lg hover:bg-yellow-400 hover:shadow-xl transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">refresh</span>
              Try Again
            </button>
          </div>
        </>
      )}
    </div>
  );

  // ──────────────────────── Render ─────────────────────────────────

  return (
    <div className="lg:w-7/12 w-full bg-white dark:bg-[#1a170d] rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-[#e8e2ce] dark:border-[#3a3525] overflow-hidden">
      <StepIndicator />
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}

      {/* Security badge */}
      {step < 3 && (
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 text-xs">
          <span className="material-symbols-outlined text-sm">
            verified_user
          </span>
          <span>Secured by Paystack · 256-bit SSL encryption</span>
        </div>
      )}
    </div>
  );
}
