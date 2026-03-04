import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const AdminSlots = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

 const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

    const createSlotsForDate = async () => {
  await fetch(`${API_BASE}/api/slots/admin/create-date`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date: formatDate(selectedDate) }),
  });

  fetchSlots(selectedDate);
};

const createSlotsForMonth = async () => {
  await fetch(`${API_BASE}/api/slots/admin/create-month`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1,
    }),
  });

  fetchSlots(selectedDate);
};

  const fetchSlots = async (date: Date) => {
    setLoading(true);
    const formatted = formatDate(date);

    const res = await fetch(
      `${API_BASE}/api/slots/admin/${formatted}`,
      { credentials: "include" }
    );

    const data = await res.json();
    setSlots(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate]);

  const toggleSlot = async (id: string) => {
    await fetch(
      `${API_BASE}/api/slots/admin/${id}/toggle-block`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    fetchSlots(selectedDate);
  };

  const blockDay = async () => {
    const formatted = formatDate(selectedDate);
    await fetch(
      `${API_BASE}/api/slots/admin/block-day/${formatted}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    fetchSlots(selectedDate);
  };

  const unblockDay = async () => {
    const formatted = formatDate(selectedDate);
    await fetch(
      `${API_BASE}/api/slots/admin/unblock-day/${formatted}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );

    fetchSlots(selectedDate);
  };

  const getSlotColor = (slot: any) => {
    if (slot.isBooked)
      return "bg-gray-400 cursor-not-allowed";
    if (slot.isBlocked)
      return "bg-red-500 hover:scale-105";
    return "bg-green-500 hover:scale-105";
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Slot Management</h1>

      <div className="flex gap-3 mb-4">
        <button
            onClick={createSlotsForDate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
            Create Slots (Day)
        </button>

        <button
            onClick={createSlotsForMonth}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
        >
            Create Slots (Month)
        </button>
        </div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl"
      >
        <Calendar
          onChange={(value: any) => setSelectedDate(value)}
          value={selectedDate}
        />
      </motion.div>

      {/* Slot Grid */}
      <motion.div
        key={formatDate(selectedDate)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            Slots for {formatDate(selectedDate)}
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
        </div>

        {loading ? (
          <p>Loading slots...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {slots.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No slots created for this date.
              </p>
            )}

            {slots.map((slot) => (
              <motion.button
                key={slot._id}
                whileHover={{ scale: slot.isBooked ? 1 : 1.05 }}
                onClick={() =>
                  !slot.isBooked && toggleSlot(slot._id)
                }
                className={`px-4 py-3 text-white rounded-xl shadow-md transition ${getSlotColor(
                  slot
                )}`}
              >
                {slot.time}
                {slot.isBooked && (
                  <div className="text-xs mt-1">Booked</div>
                )}
                {slot.isBlocked && !slot.isBooked && (
                  <div className="text-xs mt-1">Blocked</div>
                )}
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminSlots;