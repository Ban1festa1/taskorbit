import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 cursor-default bg-black/35 backdrop-blur-sm"
            onMouseDown={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-white/75 p-5 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/55"
            initial={{ y: 14, scale: 0.985, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 14, scale: 0.985, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-900 dark:text-slate-200">
                  TaskOrbit
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-50">
                  {title}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-2xl hover:bg-slate-900/5 dark:hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-slate-900 dark:text-slate-50" />
              </button>
            </div>

            <div className="mt-4">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
