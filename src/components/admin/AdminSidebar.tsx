import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  Calendar,
  ClipboardList,
  LogOut,
  Settings,
} from "lucide-react";

const AdminSidebar = () => {
  const baseLinkClass =
    "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all";

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-background border-r border-border p-4 flex flex-col">
      
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

      <nav className="flex flex-col gap-2 flex-1">

        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${baseLinkClass} ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/20"
            }`
          }
        >
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        {/* Bookings */}
        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            `${baseLinkClass} ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/20"
            }`
          }
        >
          <ClipboardList size={18} /> Bookings
        </NavLink>

        {/* Gallery */}
        <NavLink
          to="/admin/gallery"
          className={({ isActive }) =>
            `${baseLinkClass} ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/20"
            }`
          }
        >
          <Image size={18} /> Gallery
        </NavLink>

        {/* Slots */}
        <NavLink
          to="/admin/slots"
          className={({ isActive }) =>
            `${baseLinkClass} ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/20"
            }`
          }
        >
          <Calendar size={18} /> Slots
        </NavLink>

        {/* Website Content (NEW) */}
        <NavLink
          to="/admin/content"
          className={({ isActive }) =>
            `${baseLinkClass} ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/20"
            }`
          }
        >
          <Settings size={18} /> Website Content
        </NavLink>
      </nav>

      {/* Logout (bottom fixed inside sidebar) */}
      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
        }}
        className="flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-md transition"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;