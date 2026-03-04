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
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black/40 z-40"
      onClick={() => setOpenSidebar(false)}
    ></div>

    {/* Sidebar */}
    <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg">
      <AdminSidebar />
    </div>
  </>
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