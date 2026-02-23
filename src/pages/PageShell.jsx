import { motion } from "framer-motion";

export default function PageShell({ title, subtitle, children, right }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className="space-y-4"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {subtitle}
            </p>
          ) : null}
        </div>
        {right ? <div className="flex items-center gap-2">{right}</div> : null}
      </div>
      {children}
    </motion.section>
  );
}
