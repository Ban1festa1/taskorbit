import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RotateCcw } from "lucide-react";
import Select from "../ui/Select.jsx";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";
import {
  resetFilters,
  setCategory,
  setPriority,
  setSort,
  setStatus,
} from "../../features/ui/uiSlice.js";

export default function FiltersBar({ categories, stats }) {
  const dispatch = useDispatch();
  const ui = useSelector((s) => s.ui);

  const summary = useMemo(() => {
    return [
      { tone: "active", label: `Всего: ${stats.total}` },
      { tone: "active", label: `Активных: ${stats.active}` },
      { tone: "done", label: `Готово: ${stats.done}` },
      { tone: "high", label: `Срочных: ${stats.high}` },
    ];
  }, [stats]);

  return (
    <div className="glass edge rounded-2xl p-4 shadow-soft">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Статус
            </p>
            <Select
              value={ui.status}
              onChange={(e) => dispatch(setStatus(e.target.value))}
            >
              <option value="all">Все</option>
              <option value="active">Активные</option>
              <option value="done">Готово</option>
            </Select>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Приоритет
            </p>
            <Select
              value={ui.priority}
              onChange={(e) => dispatch(setPriority(e.target.value))}
            >
              <option value="all">Любой</option>
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </Select>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Категория
            </p>
            <Select
              value={ui.category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
            >
              <option value="all">Все</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Сортировка
            </p>
            <Select
              value={ui.sort}
              onChange={(e) => dispatch(setSort(e.target.value))}
            >
              <option value="updatedAt_desc">Недавно изменённые</option>
              <option value="dueDate_asc">Ближайший срок</option>
              <option value="priority_desc">
                Приоритет (высокий → низкий)
              </option>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {summary.map((s) => (
              <Badge key={s.label} tone={s.tone}>
                {s.label}
              </Badge>
            ))}
          </div>

          <Button variant="secondary" onClick={() => dispatch(resetFilters())}>
            <RotateCcw className="h-4 w-4" />
            Сброс
          </Button>
        </div>
      </div>
    </div>
  );
}
