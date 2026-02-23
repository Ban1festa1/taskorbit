import { useMemo } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useGetTasksQuery } from "../../app/tasksApi.js";
import {
  deriveCategories,
  filterTasks,
  sortTasks,
  taskStats,
} from "../../lib/taskUtils.js";
import FiltersBar from "./FiltersBar.jsx";
import TaskCard from "./TaskCard.jsx";
import TaskRow from "./TaskRow.jsx";
import EmptyState from "./EmptyState.jsx";
import { useDebouncedValue } from "../../hooks/useDebouncedValue.js";

export default function TaskBoard() {
  const ui = useSelector((s) => s.ui);
  const { view } = ui;
  const debouncedQuery = useDebouncedValue(ui.query, 200);

  const { data: tasks = [], isLoading, isError, refetch } = useGetTasksQuery();

  const categories = useMemo(() => deriveCategories(tasks), [tasks]);

  const filteredSorted = useMemo(() => {
    const filtered = filterTasks(tasks, { ...ui, query: debouncedQuery });
    return sortTasks(filtered, ui.sort);
  }, [tasks, ui.status, ui.priority, ui.category, ui.sort, debouncedQuery]);

  const stats = useMemo(() => taskStats(tasks), [tasks]);

  return (
    <div className="space-y-4">
      <FiltersBar categories={categories} stats={stats} />

      <div className="glass edge rounded-2xl p-4 shadow-soft">
        {isLoading ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl bg-white/50 dark:bg-slate-900/40 animate-pulse"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm">
            <p className="font-semibold">Не удалось загрузить задачи</p>
            <p className="mt-1 text-slate-600 dark:text-slate-300">
              Проверь, что JSON Server запущен:{" "}
              <span className="font-mono">npm run dev:api</span>
            </p>
            <button
              onClick={refetch}
              className="mt-3 rounded-xl bg-slate-900 px-3 py-2 text-white dark:bg-white dark:text-slate-900"
            >
              Повторить
            </button>
          </div>
        ) : filteredSorted.length === 0 ? (
          <EmptyState />
        ) : view === "grid" ? (
          <motion.div
            layout
            className="grid gap-3 md:grid-cols-2 xl:grid-cols-3"
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          >
            <AnimatePresence>
              {filteredSorted.map((t) => (
                <TaskCard key={t.id} task={t} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="divide-y divide-white/20 dark:divide-white/10">
            <div className="hidden grid-cols-12 gap-3 px-3 pb-3 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 md:grid">
              <div className="col-span-6">Задача</div>
              <div className="col-span-2">Приоритет</div>
              <div className="col-span-2">Срок</div>
              <div className="col-span-2 text-right">Действия</div>
            </div>
            <AnimatePresence>
              {filteredSorted.map((t) => (
                <TaskRow key={t.id} task={t} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
