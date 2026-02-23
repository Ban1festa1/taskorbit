import clsx from "clsx";

const map = {
  low: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
  medium:
    "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20",
  high: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
  done: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20",
  active:
    "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20",
};

export default function Badge({ tone = "active", className, children }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        map[tone] ?? map.active,
        className,
      )}
    >
      {children}
    </span>
  );
}
