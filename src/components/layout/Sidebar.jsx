import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListChecks,
  LineChart,
  Settings,
  Orbit,
} from "lucide-react";
import clsx from "clsx";

const links = [
  { to: "/overview", label: "Обзор", icon: LayoutDashboard },
  { to: "/tasks", label: "Задачи", icon: ListChecks },
  { to: "/analytics", label: "Аналитика", icon: LineChart },
  { to: "/settings", label: "Настройки", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 md:block">
      <div className="glass edge rounded-2xl p-4 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
            <Orbit className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Панель</p>
            <p className="text-base font-semibold leading-5">TaskOrbit</p>
          </div>
        </div>

        <nav className="mt-5 grid gap-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium",
                  "hover:bg-slate-900/5 dark:hover:bg-white/10",
                  isActive &&
                    "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-soft",
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
