import PageShell from "./PageShell.jsx";
import TaskBoard from "../components/tasks/TaskBoard.jsx";

export default function TasksPage() {
  return (
    <PageShell title="Задачи" subtitle="Создавай, редактируй, фильтруй список.">
      <TaskBoard />
    </PageShell>
  );
}
