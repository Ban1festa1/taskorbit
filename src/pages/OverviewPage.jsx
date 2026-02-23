import { useMemo } from "react";
import { useGetTasksQuery } from "../app/tasksApi.js";
import { taskStats } from "../lib/taskUtils.js";
import PageShell from "./PageShell.jsx";
import { Flame, CheckCheck, ListTodo, Activity } from "lucide-react";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="glass edge rounded-2xl p-4 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/60 dark:bg-slate-900/60">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function OverviewPage() {
  const { data: tasks = [] } = useGetTasksQuery();
  const stats = useMemo(() => taskStats(tasks), [tasks]);

  return (
    <PageShell title="Обзор" subtitle="Короткая сводка по текущим задачам.">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={ListTodo} label="Всего" value={stats.total} />
        <StatCard icon={Activity} label="Активные" value={stats.active} />
        <StatCard icon={CheckCheck} label="Готово" value={stats.done} />
        <StatCard icon={Flame} label="Срочные" value={stats.high} />
      </div>

      <div className="glass edge rounded-2xl p-6 shadow-soft">
        <h2 className="text-lg font-semibold">Быстрый старт</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Перейди в раздел «Задачи», чтобы создать новую задачу, задать
          приоритет и срок, а затем отфильтровать список.
        </p>
      </div>
    </PageShell>
  );
}
