import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import CreateTaskModal from "../tasks/CreateTaskModal.jsx";

export default function AppLayout() {
  return (
    <div className="min-h-screen edge">
      <div className="mx-auto flex max-w-7xl gap-4 p-4 md:p-6">
        <Sidebar />
        <main className="flex-1">
          <Topbar />

          <CreateTaskModal />

          <div className="mt-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
