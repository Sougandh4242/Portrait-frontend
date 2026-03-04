import { useEffect, useMemo, useState } from "react";
import { motion, animate } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ITEMS_PER_PAGE = 8;

const statusColors: any = {
  pending: "bg-yellow-100 text-yellow-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  delivered: "bg-purple-100 text-purple-700",
};

const paymentColors: any = {
  paid: "bg-green-100 text-green-700",
  unpaid: "bg-red-100 text-red-700",
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [sortAmount, setSortAmount] = useState<"asc" | "desc" | "none">("none");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
    const updateStatus = async (id: string, status: string) => {
  await fetch(`${API_BASE}/api/admin/bookings/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

  setBookings((prev) =>
    prev.map((b) =>
      b._id === id ? { ...b, orderStatus: status } : b
    )
  );
};
  // Fetch
  useEffect(() => {
    fetch(`${API_BASE}/api/admin/bookings`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setFiltered(data);
      });
  }, []);

  // Filtering + Sorting
  useEffect(() => {
    let data = [...bookings];

    if (search) {
      data = data.filter((b) =>
        b._id.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      data = data.filter((b) => b.orderStatus === statusFilter);
    }

    if (paymentFilter !== "all") {
      data = data.filter((b) => b.paymentStatus === paymentFilter);
    }

    if (startDate) {
      data = data.filter(
        (b) => new Date(b.date) >= new Date(startDate)
      );
    }

    if (endDate) {
      data = data.filter(
        (b) => new Date(b.date) <= new Date(endDate)
      );
    }

    if (sortAmount !== "none") {
      data.sort((a, b) =>
        sortAmount === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount
      );
    }
    

    setFiltered(data);
    setCurrentPage(1);
  }, [search, statusFilter, paymentFilter, startDate, endDate, sortAmount, bookings]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(
    () =>
      filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [filtered, currentPage]
  );

  // Export CSV
  const exportCSV = () => {
    const headers = ["OrderID", "Customer", "Amount", "Status", "Payment"];
    const rows = filtered.map((b) => [
      b._id,
      b.name,
      b.amount,
      b.orderStatus,
      b.paymentStatus,
    ]);

    const csv =
      [headers, ...rows]
        .map((r) => r.join(","))
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
  };

  // Stats
  const totalRevenue = filtered.reduce((sum, b) => sum + b.amount, 0);
  const totalOrders = filtered.length;
  const paidOrders = filtered.filter(b => b.paymentStatus === "paid").length;

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold">Booking Management</h1>

      {/* Animated Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[ 
          { label: "Total Orders", value: totalOrders },
          { label: "Total Revenue", value: `₹ ${totalRevenue}` },
          { label: "Paid Orders", value: paidOrders },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl"
          >
            <h3 className="text-sm opacity-80">{card.label}</h3>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search Order ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />

        <input type="date" value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-3 py-2 border rounded-md" />

        <input type="date" value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-3 py-2 border rounded-md" />

        <select
          value={sortAmount}
          onChange={(e) => setSortAmount(e.target.value as any)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="none">Sort Amount</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>

        <button
          onClick={exportCSV}
          className="px-5 py-2 bg-indigo-600 text-white rounded-xl shadow hover:scale-105 transition"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-xl">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4">Image</th>
              <th className="p-4">Address</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((booking, index) => (
              <motion.tr
                key={booking._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b hover:bg-muted/40"
              >
                <td className="p-4 text-xs">{booking._id}</td>
                <td className="p-4">{booking.name}</td>
                <td className="p-4">{booking.date}</td>
                <td className="p-4 font-semibold">₹ {booking.amount}</td>

                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentColors[booking.paymentStatus]}`}>
                    {booking.paymentStatus}
                  </span>
                </td>

                <td className="p-4">
                <div className="flex flex-col gap-2">

                    {/* Current Status Badge */}
                    <span
                    className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold ${statusColors[booking.orderStatus]}`}
                    >
                    {booking.orderStatus.replace("-", " ")}
                    </span>

                    {/* Premium Dropdown */}
                    <motion.select
                    whileFocus={{ scale: 1.03 }}
                    value={booking.orderStatus}
                    onChange={(e) =>
                        updateStatus(booking._id, e.target.value)
                    }
                    className="px-3 py-2 text-xs rounded-xl border border-gray-300
                                bg-white dark:bg-zinc-800
                                shadow-sm hover:shadow-md
                                focus:ring-2 focus:ring-indigo-500
                                transition-all cursor-pointer"
                    >
                    <option value="pending">🟡 Pending</option>
                    <option value="in-progress">🔵 In Progress</option>
                    <option value="completed">🟢 Completed</option>
                    <option value="delivered">🟣 Delivered</option>
                    </motion.select>

                </div>
                </td>



                <td className="p-4 space-x-2">
                  <button
                    onClick={() => setSelectedImage(booking.imageUrl)}
                    className="text-indigo-600 text-sm hover:underline"
                    >
                    View
                  </button>
                  <button
                    onClick={async () => {
                        const response = await fetch(booking.imageUrl);
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);

                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "reference-image.jpg";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }}
                    className="text-green-600 text-sm hover:underline"
                    >
                    Download
                    </button>
                </td>

<td className="p-4 text-sm">
  <div className="leading-tight">
    <p className="font-medium">
      {booking.address?.line1 || "No Address"}
    </p>
    <p className="text-muted-foreground">
      {booking.address?.city}
    </p>
  </div>
</td>
                
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-h-[80vh] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default AdminBookings;