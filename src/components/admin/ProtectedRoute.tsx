import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/admin/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          navigate("/admin/login");
        } else {
          setLoading(false);
        }
      })
      .catch(() => navigate("/admin/login"));
  }, []);

  if (loading) return <div className="p-10">Checking authentication...</div>;

  return <>{children}</>;
};

export default ProtectedRoute;