import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Select from "../ui/Select.jsx";
import Button from "../ui/Button.jsx";

import {
  useAddTaskMutation,
  useUpdateTaskMutation,
  useGetTasksQuery,
} from "../../app/tasksApi.js";

import { closeEditTask } from "../../features/ui/uiViewSlice.js";

const schema = z.object({
  title: z.string().min(2, "Минимум 2 символа").max(120, "Слишком длинно"),
  description: z
    .string()
    .max(400, "Слишком длинно")
    .optional()
    .or(z.literal("")),
  category: z.string().max(40, "Слишком длинно").optional().or(z.literal("")),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().min(4, "Укажи дату"),
});

export default function CreateTaskModal() {
  const dispatch = useDispatch();
  const { createOpen, editTaskId } = useSelector((s) => s.uiView);

  const { data: tasks = [] } = useGetTasksQuery();

  const editTask = useMemo(
    () => tasks.find((t) => String(t.id) === String(editTaskId)) ?? null,
    [tasks, editTaskId],
  );
  const isEdit = Boolean(editTask);

  const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      priority: "medium",
      dueDate: new Date().toISOString().slice(0, 10),
    },
  });

  useEffect(() => {
    if (!createOpen) return;

    if (editTask) {
      reset({
        title: editTask.title ?? "",
        description: editTask.description ?? "",
        category: editTask.category ?? "",
        priority: editTask.priority ?? "medium",
        dueDate: editTask.dueDate ?? new Date().toISOString().slice(0, 10),
      });
    } else {
      reset({
        title: "",
        description: "",
        category: "",
        priority: "medium",
        dueDate: new Date().toISOString().slice(0, 10),
      });
    }
  }, [createOpen, editTask, reset]);

  const onClose = () => dispatch(closeEditTask());

  const onSubmit = async (values) => {
    const now = new Date().toISOString();

    try {
      if (isEdit) {
        await updateTask({
          id: editTask.id,
          patch: { ...values, updatedAt: now },
        }).unwrap();
      } else {
        await addTask({
          ...values,
          status: "active",
          createdAt: now,
          updatedAt: now,
        }).unwrap();
      }

      onClose();
    } catch (e) {
      console.error("Save failed:", e);
    }
  };

  return (
    <Modal
      open={createOpen}
      title={isEdit ? "Редактирование задачи" : "Новая задача"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase text-slate-900 dark:text-slate-200">
            Название
          </p>
          <Input
            placeholder="Например: Подготовить отчёт"
            {...register("title")}
          />
          {errors.title ? (
            <p className="mt-1 text-xs text-rose-600 dark:text-rose-300">
              {errors.title.message}
            </p>
          ) : null}
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase text-slate-900 dark:text-slate-200">
            Описание
          </p>
          <textarea
            className="min-h-[92px] w-full rounded-2xl p-4 text-sm outline-none glass shadow-sm
                       text-slate-900 dark:text-slate-50
                       placeholder:text-slate-500 dark:placeholder:text-slate-500
                       focus:ring-2 focus:ring-indigo-400/50"
            placeholder="Детали, чек-лист, ссылки…"
            {...register("description")}
          />
          {errors.description ? (
            <p className="mt-1 text-xs text-rose-600 dark:text-rose-300">
              {errors.description.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-900 dark:text-slate-200">
              Категория
            </p>
            <Input placeholder="UI / Учёба / Дом…" {...register("category")} />
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-900 dark:text-slate-200">
              Приоритет
            </p>
            <Select {...register("priority")}>
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </Select>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-900 dark:text-slate-200">
              Срок
            </p>
            <Input type="date" {...register("dueDate")} />
            {errors.dueDate ? (
              <p className="mt-1 text-xs text-rose-600 dark:text-rose-300">
                {errors.dueDate.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" disabled={isAdding || isUpdating}>
            {isEdit ? "Сохранить" : "Создать"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
