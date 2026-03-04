import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">

      <AdminSidebar />

      <main className="ml-64 flex-1 min-h-screen overflow-y-auto p-8 bg-muted/20">
        {children}
      </main>

    </div>
  );
};

export default AdminLayout;