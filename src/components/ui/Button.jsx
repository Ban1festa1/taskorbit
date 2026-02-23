import { motion } from "framer-motion";
import clsx from "clsx";

export default function Button({
  as = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  const Comp = motion[as] || motion.button;

  const variants = {
    primary:
      "bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-95 shadow-soft",
    secondary:
      "bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-50 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-900/80",
    ghost:
      "bg-transparent text-slate-900 dark:text-slate-50 hover:bg-slate-900/5 dark:hover:bg-white/10",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm rounded-xl",
    md: "h-10 px-4 text-sm rounded-2xl",
    lg: "h-12 px-5 text-base rounded-2xl",
  };

  return (
    <Comp
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-medium select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950",
        "disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
