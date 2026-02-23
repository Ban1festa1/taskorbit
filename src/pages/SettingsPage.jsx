import { useDispatch, useSelector } from "react-redux";
import PageShell from "./PageShell.jsx";
import Select from "../components/ui/Select.jsx";
import { setTheme, setView } from "../features/ui/uiSlice.js";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const { theme, view } = useSelector((s) => s.ui);

  return (
    <PageShell title="Настройки" subtitle="Персонализация интерфейса.">
      <div className="glass edge rounded-2xl p-5 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Тема
            </p>
            <Select
              value={theme}
              onChange={(e) => dispatch(setTheme(e.target.value))}
            >
              <option value="dark">Тёмная</option>
              <option value="light">Светлая</option>
            </Select>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
              Вид списка
            </p>
            <Select
              value={view}
              onChange={(e) => dispatch(setView(e.target.value))}
            >
              <option value="grid">Карточки</option>
              <option value="list">Таблица</option>
            </Select>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
