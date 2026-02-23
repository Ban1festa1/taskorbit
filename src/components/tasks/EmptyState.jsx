import { Sparkles } from "lucide-react";
import Button from "../ui/Button.jsx";
import { useDispatch } from "react-redux";
import { openCreateTask } from "../../features/ui/uiViewSlice.js";

export default function EmptyState() {
  const dispatch = useDispatch();
  return (
    <div className="rounded-2xl border border-white/20 bg-white/40 p-10 text-center dark:border-white/10 dark:bg-slate-900/40">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-500/10">
        <Sparkles className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">Список задач пуст</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
        Добавь первую задачу — TaskOrbit будет держать твои планы «в орбите».
      </p>
      <div className="mt-5 flex justify-center">
        <Button onClick={() => dispatch(openCreateTask())}>
          Создать задачу
        </Button>
      </div>
    </div>
  );
}
