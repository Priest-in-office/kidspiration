interface RoleCardProps {
  value: string;
  label: string;
  description: string;
  icon: string;
  iconBgClass: string;
  iconTextClass: string;
  selected: boolean;
  onSelect: () => void;
}

export default function RoleCard({
  value,
  label,
  description,
  icon,
  iconBgClass,
  iconTextClass,
  selected,
  onSelect,
}: RoleCardProps) {
  return (
    <label className="cursor-pointer group relative">
      <input
        type="radio"
        name="role"
        value={value}
        checked={selected}
        onChange={onSelect}
        className="peer sr-only"
      />
      <div
        className={`h-full p-4 rounded-2xl border-2 transition-all flex flex-col gap-3 ${
          selected
            ? "border-primary bg-primary/5"
            : "border-[#e8e2ce] dark:border-[#3a3525] bg-background-light dark:bg-background-dark hover:border-primary/50"
        }`}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgClass} ${iconTextClass}`}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <p className="font-bold text-slate-900 dark:text-slate-100 mb-1">
            {label}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
            {description}
          </p>
        </div>
        <div
          className={`absolute top-4 right-4 text-primary transition-opacity ${
            selected ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="material-symbols-outlined fill-current">
            check_circle
          </span>
        </div>
      </div>
    </label>
  );
}
