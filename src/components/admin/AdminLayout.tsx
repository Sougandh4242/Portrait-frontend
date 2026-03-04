import AdminSidebar from "./AdminSidebar";
import { useState } from "react";

const AdminLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen">

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar */}
      {openSidebar && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-lg">
            <AdminSidebar />
          </div>

          {/* Overlay */}
          <div
            className="flex-1 bg-black/30"
            onClick={() => setOpenSidebar(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b bg-white">
          <button
            className="text-2xl"
            onClick={() => setOpenSidebar(true)}
          >
            ☰
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-8 bg-muted/20">
          {children}
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;