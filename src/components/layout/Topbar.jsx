import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun, Plus, Search, LayoutGrid, List } from "lucide-react";
import { setTheme, setQuery, setView } from "../../features/ui/uiSlice.js";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import { useDebouncedValue } from "../../hooks/useDebouncedValue.js";
import { openCreateTask } from "../../features/ui/uiViewSlice.js";

export default function Topbar() {
  const dispatch = useDispatch();
  const { theme, view, query } = useSelector((s) => s.ui);
  const debounced = useDebouncedValue(query, 250);
  void debounced;

  return (
    <div className="glass edge flex items-center justify-between gap-3 rounded-2xl p-4 shadow-soft">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative w-full max-w-lg">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            placeholder="Поиск по задачам, категориям, приоритету…"
            className="pl-11"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(setView(view === "grid" ? "list" : "grid"))}
          className="glass grid h-10 w-10 place-items-center rounded-2xl hover:bg-white/80 dark:hover:bg-slate-900/80"
          title="Сменить вид"
        >
          {view === "grid" ? (
            <LayoutGrid className="h-4 w-4" />
          ) : (
            <List className="h-4 w-4" />
          )}
        </button>

        <button
          onClick={() =>
            dispatch(setTheme(theme === "dark" ? "light" : "dark"))
          }
          className="glass grid h-10 w-10 place-items-center rounded-2xl hover:bg-white/80 dark:hover:bg-slate-900/80"
          title="Тема"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        <Button onClick={() => dispatch(openCreateTask())}>
          <Plus className="h-4 w-4" />
          Новая задача
        </Button>
      </div>
    </div>
  );
}
