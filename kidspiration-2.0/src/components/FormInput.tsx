interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  icon?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
}

export default function FormInput({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  error,
  hint,
}: FormInputProps) {
  const baseInputClasses =
    "w-full rounded-xl border bg-[#fcfbf8] dark:bg-[#221e10] px-4 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none transition-all";
  const borderClasses = error
    ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
    : "border-[#e8e2ce] dark:border-[#3a3525] focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-slate-900 dark:text-slate-200">
        {label}
      </span>

      {icon ? (
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${baseInputClasses} ${borderClasses} pl-11 pr-4`}
          />
        </div>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseInputClasses} ${borderClasses}`}
        />
      )}

      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      {hint && !error && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {hint}
        </p>
      )}
    </label>
  );
}
