import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Pencil, CheckCircle2, Truck } from "lucide-react";
import { FadeIn } from "@/components/animations/MotionElements";
import { Layout } from "@/components/layout/Layout";

const statuses = [
  { icon: Package, label: "Order Placed", date: "Feb 15, 2026", done: true },
  { icon: Pencil, label: "In Progress", date: "Feb 17, 2026", done: true },
  { icon: CheckCircle2, label: "Completed", date: "Expected Feb 22", done: false },
  { icon: Truck, label: "Delivered", date: "Expected Feb 25", done: false },
];

const OrderTracking = () => {
  const [query, setQuery] = useState("");
  const [tracked, setTracked] = useState(false);

  return (
    <Layout>
      <section className="pt-28 pb-16 section-padding bg-background min-h-screen">
        <div className="container mx-auto max-w-2xl">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-accent tracking-[0.2em] uppercase text-sm mb-3">Order Status</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold">Track Your Order</h1>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="glass rounded-sm p-8 mb-10">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter email or phone number"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-secondary rounded-sm px-5 py-3 text-sm outline-none focus:ring-2 ring-accent/30 transition-all"
                />
                <button onClick={() => setTracked(true)} className="btn-gold py-3 px-6 text-sm flex items-center gap-2">
                  <Search size={16} /> Track
                </button>
              </div>
            </div>
          </FadeIn>

          {tracked && (
            <FadeIn>
              <div className="glass rounded-sm p-8">
                <h3 className="font-display text-xl font-bold mb-2">Order #AP-2026-0215</h3>
                <p className="text-muted-foreground text-sm mb-8">11" × 14" — Individual Portrait</p>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

                  <div className="space-y-8">
                    {statuses.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="flex items-start gap-5 relative"
                      >
                        <div
                          className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                            s.done ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <s.icon size={20} />
                        </div>
                        <div className="pt-2">
                          <p className={`font-medium ${s.done ? "text-foreground" : "text-muted-foreground"}`}>
                            {s.label}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{s.date}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default OrderTracking;
