import { useMemo } from "react";
import PageShell from "./PageShell.jsx";
import { useGetTasksQuery } from "../app/tasksApi.js";
import { deriveCategories, taskStats } from "../lib/taskUtils.js";
import Badge from "../components/ui/Badge.jsx";

export default function AnalyticsPage() {
  const { data: tasks = [] } = useGetTasksQuery();
  const stats = useMemo(() => taskStats(tasks), [tasks]);
  const categories = useMemo(() => deriveCategories(tasks), [tasks]);

  const byCategory = useMemo(() => {
    const map = new Map();
    for (const t of tasks) {
      const key = t.category || "Без категории";
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [tasks]);

  return (
    <PageShell title="Аналитика">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="glass edge rounded-2xl p-5 shadow-soft">
          <h3 className="text-lg font-semibold">Сводка</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="active">Всего: {stats.total}</Badge>
            <Badge tone="active">Активные: {stats.active}</Badge>
            <Badge tone="done">Готово: {stats.done}</Badge>
            <Badge tone="high">Срочные: {stats.high}</Badge>
          </div>
        </div>

        <div className="glass edge rounded-2xl p-5 shadow-soft">
          <h3 className="text-lg font-semibold">Категории</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Количество категорий:{" "}
            <span className="font-semibold">{categories.length}</span>
          </p>
          <div className="mt-3 grid gap-2">
            {byCategory.map(([name, count]) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-2xl bg-white/50 p-3 dark:bg-slate-900/40"
              >
                <span className="text-sm font-medium">{name}</span>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
