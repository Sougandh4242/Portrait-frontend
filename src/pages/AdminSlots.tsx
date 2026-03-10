import { useState, useRef, useEffect } from "react";

import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const AdminSlots = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateStats, setDateStats] = useState<any>({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/bookings/admin-date-stats`,
          { credentials: "include" }
        );

        const data = await res.json();

        setDateStats(data);

      } catch (err) {
        console.error("Failed to fetch stats");
      }
    };

    fetchStats();
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    

    return `${year}-${month}-${day}`;
  };

  

  const blockDay = async () => {
    const formatted = formatDate(selectedDate);

    await fetch(`${API_BASE}/api/admin/block-date`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: formatted }),
      credentials: "include",
    });

    alert("Date blocked");
  };

  const unblockDay = async () => {
    const formatted = formatDate(selectedDate);

    await fetch(`${API_BASE}/api/admin/block-date/${formatted}`, {
      method: "DELETE",
      credentials: "include",
    });

    alert("Date unblocked");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Booking Management</h1>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl"
      >
      <Calendar
        onChange={(value: any) => setSelectedDate(value)}
        value={selectedDate}

        tileClassName={({ date }) => {
          const formatted = formatDate(date);
          const stat = dateStats[formatted];

          if (!stat) return "";

          if (stat.blocked)
            return "bg-gray-400 text-white rounded-md";

          if (stat.count >= stat.max)
            return "bg-red-500 text-white rounded-md";

          if (stat.count >= stat.max - 1)
            return "bg-yellow-400 text-black rounded-md";

          return "bg-green-500 text-white rounded-md";
        }}

        tileContent={({ date }) => {
          const formatted = formatDate(date);
          const stat = dateStats[formatted];

          if (!stat) return null;

          if (stat.blocked)
            return <div className="text-[10px] mt-1">Blocked</div>;

          if (stat.count >= stat.max)
            return <div className="text-[10px] mt-1">Full</div>;

          return (
            <div className="text-[10px] mt-1">
              {stat.count}/{stat.max}
            </div>
          );
        }}
      />
      </motion.div>

      {/* Block Controls */}
      <motion.div
        key={formatDate(selectedDate)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-lg font-semibold mb-4">
          Manage Date: {formatDate(selectedDate)}
        </h2>

        <div className="flex gap-3">
          <button
            onClick={blockDay}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Block Day
          </button>

          <button
            onClick={unblockDay}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Unblock Day
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSlots;