# TaskOrbit — SPA Task Manager

TaskOrbit — одностраничное приложение для управления задачами: создание, редактирование, удаление, статусы, приоритеты, категории, поиск и аналитика.

---

## Технологии

- React 18 (функциональные компоненты)
- Vite
- React Router v6
- Redux Toolkit + RTK Query
- Tailwind CSS
- Framer Motion
- API: MockAPI (для деплоя) / JSON Server (локально)

---

## Функциональность

- CRUD задач: создать / изменить / удалить
- Поля: title, description, category, priority, status, dueDate
- Поиск и фильтрация
- Плавные анимации появления/удаления элементов
- Оптимизация рендера 
- Поддержка темы 

---

## Скрипты

- `npm run dev` — запуск Vite
- `npm run build` — сборка в `dist`
- `npm run preview` — предпросмотр сборки
- `npm run dev:api` — локальный JSON Server 

---

## Структура проекта

```text
src/
  app/            # store, RTK Query api
  features/       # slices (ui state и т.п.)
  components/
    layout/       # Sidebar, Topbar, AppLayout
    tasks/        # TaskBoard, TaskCard/TaskRow, CreateTaskModal
    ui/           # Button, Input, Select, Modal, Badge...
  hooks/          # custom hooks
  pages/          # страницы роутера
  styles/         # глобальные стили
```

---

@Дунаева Анастасия