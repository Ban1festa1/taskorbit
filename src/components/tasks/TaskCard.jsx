import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import { format, parseISO, isValid } from "date-fns";
import { ru } from "date-fns/locale";
import Badge from "../ui/Badge.jsx";
import Button from "../ui/Button.jsx";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../app/tasksApi.js";
import { useDispatch } from "react-redux";
import { openEditTask } from "../../features/ui/uiViewSlice.js";

function safeDateLabel(dueDate) {
  if (!dueDate) return "—";
  const d = parseISO(String(dueDate));
  if (!isValid(d)) return "—";
  return format(d, "d MMM", { locale: ru });
}

export default function TaskCard({ task }) {
  const dispatch = useDispatch();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const dueLabel = useMemo(() => safeDateLabel(task.dueDate), [task.dueDate]);

  const toggleDone = useCallback(() => {
    const now = new Date().toISOString();
    updateTask({
      id: task.id,
      patch: {
        status: task.status === "done" ? "active" : "done",
        updatedAt: now,
      },
    })
      .unwrap()
      .catch(console.error);
  }, [task.id, task.status, updateTask]);

  const onDelete = useCallback(() => {
    deleteTask(task.id).unwrap().catch(console.error);
  }, [task.id, deleteTask]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.18 }}
      className="rounded-2xl border border-white/20 bg-white/50 p-4 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {task.category || "Без категории"}
          </p>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold">
            {task.title}
          </h3>
          {task.description ? (
            <p className="mt-2 line-clamp-2 text-sm text-slate-700 dark:text-slate-200">
              {task.description}
            </p>
          ) : null}
        </div>

        <button
          onClick={toggleDone}
          className="grid h-10 w-10 place-items-center rounded-2xl bg-white/70 hover:bg-white/90 dark:bg-slate-900/60 dark:hover:bg-slate-900/80"
        >
          {task.status === "done" ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge tone={task.status}>
            {task.status === "done" ? "Готово" : "Активно"}
          </Badge>
          <Badge tone={task.priority}>
            {task.priority === "high"
              ? "Высокий"
              : task.priority === "medium"
                ? "Средний"
                : "Низкий"}
          </Badge>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-300">
          Срок: {dueLabel}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch(openEditTask(task.id))}
        >
          <Pencil className="h-4 w-4" /> Редактировать
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-rose-700 dark:text-rose-300"
        >
          <Trash2 className="h-4 w-4" /> Удалить
        </Button>
      </div>
    </motion.div>
  );
}
