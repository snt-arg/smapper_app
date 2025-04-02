import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="lg:flex">
      <Sidebar />
      <main className="lg:flex-1 bg-teal-300 h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

