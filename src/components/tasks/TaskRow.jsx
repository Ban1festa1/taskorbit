import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import { format, parseISO, isValid } from "date-fns";
import { ru } from "date-fns/locale";
import Badge from "../ui/Badge.jsx";
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

export default function TaskRow({ task }) {
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
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.16 }}
      className="grid grid-cols-12 items-center gap-3 px-3 py-3"
    >
      <div className="col-span-12 flex items-start gap-3 md:col-span-6">
        <button
          onClick={toggleDone}
          className="mt-0.5 grid h-9 w-9 place-items-center rounded-2xl bg-white/70 hover:bg-white/90 dark:bg-slate-900/60 dark:hover:bg-slate-900/80"
        >
          {task.status === "done" ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>

        <div className="min-w-0">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {task.category || "Без категории"}
          </p>
          <p className="truncate font-semibold">{task.title}</p>
          {task.description ? (
            <p className="line-clamp-1 text-sm text-slate-700 dark:text-slate-200">
              {task.description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="col-span-6 md:col-span-2">
        <Badge tone={task.priority}>
          {task.priority === "high"
            ? "Высокий"
            : task.priority === "medium"
              ? "Средний"
              : "Низкий"}
        </Badge>
      </div>

      <div className="col-span-6 md:col-span-2 text-sm text-slate-700 dark:text-slate-200">
        {dueLabel}
      </div>

      <div className="col-span-12 flex justify-end gap-2 md:col-span-2">
        <button
          onClick={() => dispatch(openEditTask(task.id))}
          className="rounded-xl p-2 hover:bg-slate-900/5 dark:hover:bg-white/10"
          title="Редактировать"
        >
          <Pencil className="h-4 w-4" />
        </button>

        <button
          onClick={onDelete}
          className="rounded-xl p-2 text-rose-700 hover:bg-rose-500/10 dark:text-rose-300"
          title="Удалить"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
