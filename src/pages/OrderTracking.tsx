import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const statusSteps = [
  "pending",
  "in-progress",
  "completed",
  "delivered",
];

const statusLabels: Record<string, string> = {
  pending: "Order Placed",
  "in-progress": "In Progress",
  completed: "Completed",
  delivered: "Delivered",
};

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!orderId.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch(
        `${API_BASE}/api/bookings/track/${orderId}`
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Order not found");
      } else {
        setOrder(data);
      }
    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  };

  const currentStepIndex = order
    ? statusSteps.indexOf(order.orderStatus)
    : -1;

  return (
    <Layout>
    <div className="min-h-screen bg-background pt-28 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-accent uppercase tracking-widest text-sm">
            Order Status
          </p>
          <h1 className="text-5xl font-display font-bold">
            Track Your Order
          </h1>
        </div>

        {/* Search Box */}
        <div className="flex gap-4 mb-10">
          <input
            type="text"
            placeholder="Enter your Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-secondary"
          />
          <button
            onClick={handleTrack}
            className="px-6 py-3 bg-accent text-black rounded-xl"
          >
            {loading ? "Tracking..." : "Track"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-500 mb-6">{error}</div>
        )}

        {/* Order Result */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-2">
              Order #{order.orderId}
            </h2>

            <p className="text-muted-foreground mb-8">
              Booking Date: {order.date} • {order.time}
            </p>

 <div className="mb-10">
  <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">
    Client Name
  </p>

  <div className="inline-block px-6 py-3 rounded-2xl
                  bg-white/40 dark:bg-white/10
                  backdrop-blur-md
                  border border-black/5 dark:border-white/20
                  shadow-lg">
    <p className="font-display text-2xl md:text-3xl font-semibold
                  text-gray-900 dark:text-white tracking-wide">
      {order.name}
    </p>
  </div>
</div>

            {/* Timeline */}
            <div className="space-y-8">
              {statusSteps.map((step, index) => {
                const isActive = index <= currentStepIndex;

                return (
                  <div key={step} className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full 
                      ${
                        isActive
                          ? "bg-accent text-black"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div>
                      <p
                        className={`font-semibold ${
                          isActive ? "" : "text-muted-foreground"
                        }`}
                      >
                        {statusLabels[step]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payment Info */}
            <div className="mt-8 pt-6 border-t border-border">
              <p>
                Payment Status:{" "}
                <span className="font-semibold">
                  {order.paymentStatus}
                </span>
              </p>
              <p>
                Amount Paid: ₹ {order.amount}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default TrackOrder;