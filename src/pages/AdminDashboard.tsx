import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [revenue, setRevenue] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]); // ✅ moved inside

  useEffect(() => {
    fetch(`${API_BASE}/api/admin/stats`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setStats(data));

    fetch(`${API_BASE}/api/admin/bookings`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setRecentBookings(data.slice(0, 5)));

    fetch(`${API_BASE}/api/admin/revenue`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item: any) => ({
          month: item._id,
          total: item.total,
        }));
        setRevenue(formatted);
      });
  }, []);

  if (!stats) return <div>Loading dashboard...</div>;

  const cards = [
    { label: "Total Bookings", value: stats.totalBookings },
    { label: "Pending", value: stats.pendingBookings },
    { label: "In Progress", value: stats.inProgressBookings },
    { label: "Completed", value: stats.completedBookings },
    { label: "Total Earnings", value: `₹ ${stats.totalEarnings}` },
  ];

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${API_BASE}/api/admin/bookings/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });

    setRecentBookings((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, orderStatus: status } : b
      )
    );
  };

  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl"
          >
            <h3 className="text-sm uppercase tracking-wide opacity-80">
              {card.label}
            </h3>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-6">
          Monthly Revenue
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#6366F1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-6">
          Recent Bookings
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Name</th>
                <th className="p-3">Date</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((booking, index) => (
                <motion.tr
                  key={booking._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b hover:bg-muted/40 transition"
                >
                  <td className="p-3 font-medium">
                    {booking.name}
                  </td>
                  <td className="p-3">
                    {booking.date} • {booking.time}
                  </td>
                  <td className="p-3 font-semibold">
                    ₹ {booking.amount}
                  </td>
                  <td className="p-3">
                    <td className="p-3">
  <div className="flex gap-2 flex-wrap">
    {["pending", "in-progress", "completed", "delivered"].map((status) => {
      const isActive = booking.orderStatus === status;

      const statusStyles: any = {
        pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
        "in-progress": "bg-blue-100 text-blue-700 border-blue-300",
        completed: "bg-green-100 text-green-700 border-green-300",
        delivered: "bg-purple-100 text-purple-700 border-purple-300",
      };

      return (
        <motion.button
          key={status}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => updateStatus(booking._id, status)}
          className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all
            ${statusStyles[status]}
            ${isActive ? "ring-2 ring-offset-2 ring-indigo-500" : "opacity-70 hover:opacity-100"}
          `}
        >
          {status.replace("-", " ").toUpperCase()}
        </motion.button>
      );
    })}
  </div>
</td>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-end">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => window.location.href = "/admin/bookings"}
    className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
  >
    View All Bookings →
  </motion.button>
</div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;