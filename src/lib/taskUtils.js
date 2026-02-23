import { compareAsc, compareDesc, parseISO } from "date-fns";

const priorityRank = { low: 1, medium: 2, high: 3 };

export function normalize(str) {
  return (str ?? "").toString().trim().toLowerCase();
}

export function deriveCategories(tasks) {
  const set = new Set();
  for (const t of tasks) {
    if (t.category) set.add(t.category);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "ru"));
}

export function filterTasks(tasks, { query, status, priority, category }) {
  const q = normalize(query);
  return tasks.filter((t) => {
    if (status !== "all" && t.status !== status) return false;
    if (priority !== "all" && t.priority !== priority) return false;
    if (category !== "all" && t.category !== category) return false;

    if (!q) return true;
    const hay = `${t.title} ${t.description ?? ""} ${t.category ?? ""} ${t.priority ?? ""}`;
    return normalize(hay).includes(q);
  });
}

export function sortTasks(tasks, sortKey) {
  const copy = [...tasks];
  switch (sortKey) {
    case "dueDate_asc":
      copy.sort((a, b) => compareAsc(parseISO(a.dueDate), parseISO(b.dueDate)));
      break;
    case "priority_desc":
      copy.sort(
        (a, b) =>
          (priorityRank[b.priority] ?? 0) - (priorityRank[a.priority] ?? 0),
      );
      break;
    case "updatedAt_desc":
    default:
      copy.sort((a, b) =>
        compareDesc(parseISO(a.updatedAt), parseISO(b.updatedAt)),
      );
      break;
  }
  return copy;
}

export function taskStats(tasks) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  const active = total - done;
  const high = tasks.filter(
    (t) => t.priority === "high" && t.status !== "done",
  ).length;
  return { total, done, active, high };
}
