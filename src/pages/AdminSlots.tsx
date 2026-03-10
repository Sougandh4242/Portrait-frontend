import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const AdminSlots = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateStats, setDateStats] = useState({});
  const [maxBookings, setMaxBookings] = useState(5);

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

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDateFormatted = formatDate(selectedDate);
  const stat = dateStats[selectedDateFormatted];

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

      <div className="flex flex-wrap gap-4 text-sm mb-4">

  <div className="flex items-center gap-2">
    <div className="w-4 h-4 bg-green-500 rounded"></div>
    <span>Available</span>
  </div>

  <div className="flex items-center gap-2">
    <div className="w-4 h-4 bg-yellow-400 rounded"></div>
    <span>Almost Full</span>
  </div>

  <div className="flex items-center gap-2">
    <div className="w-4 h-4 bg-red-500 rounded"></div>
    <span>Fully Booked</span>
  </div>

  <div className="flex items-center gap-2">
    <div className="w-4 h-4 bg-gray-500 rounded"></div>
    <span>Blocked</span>
  </div>

</div>
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl">
      {/* Calendar */}

      <Calendar
        onChange={(value) =>
          setSelectedDate(Array.isArray(value) ? value[0] : value)
        }
        value={selectedDate}
       tileClassName={({ date }) => {
        const formatted = formatDate(date);
        const stat = dateStats[formatted];

        if (!stat) return "";

        if (stat.blocked)
          return "bg-gray-500 text-white rounded-lg";

        if (stat.count >= stat.max)
          return "bg-red-500 text-white rounded-lg";

        if (stat.count >= stat.max - 1)
          return "bg-yellow-400 text-black rounded-lg";

        return "bg-green-500 text-white rounded-lg";
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
            <div className="text-[10px] mt-1 font-semibold">
              {stat.blocked ? "Blocked" : `${stat.count}/${stat.max}`}
            </div>
          );
        }}
      />

      {/* Date Management */}
      <motion.div
        key={selectedDateFormatted}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl"
      >

        <h2 className="text-lg font-semibold mb-4">
          Manage Date: {selectedDateFormatted}
        </h2>

        <div className="mb-4 text-sm">
          {stat?.blocked ? (
            <p className="text-red-500 font-medium">This date is BLOCKED</p>
          ) : (
            <p>
              Bookings: <b>{stat?.count || 0}</b> / <b>{stat?.max || maxBookings}</b>
            </p>
          )}
        </div>

        <div className="flex gap-3 mb-4">
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

        <div className="flex items-center gap-3">
          <input
            type="number"
            value={maxBookings}
            onChange={(e) => setMaxBookings(Number(e.target.value))}
            className="border p-2 rounded w-24"
          />

          <button
            onClick={async () => {
              await fetch(`${API_BASE}/api/admin/booking-limit`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ maxBookingsPerDay: maxBookings }),
              });

              alert("Booking limit updated");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Update Limit
          </button>
        </div>

      </motion.div>
    </div>
    </div>
  );
};

export default AdminSlots;