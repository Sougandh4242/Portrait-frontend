import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Image, CalendarDays, Users, DollarSign, Settings, LogOut,
  TrendingUp, Clock, CheckCircle2, Package, ChevronRight, Menu
} from "lucide-react";
import { Link } from "react-router-dom";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: CalendarDays, label: "Bookings" },
  { icon: Image, label: "Gallery" },
  { icon: Users, label: "Clients" },
  { icon: DollarSign, label: "Earnings" },
  { icon: Settings, label: "Settings" },
];

const stats = [
  { label: "Total Earnings", value: "$12,450", icon: DollarSign, change: "+12%" },
  { label: "Active Orders", value: "8", icon: Clock, change: "+3" },
  { label: "Completed", value: "156", icon: CheckCircle2, change: "+5" },
  { label: "Total Clients", value: "234", icon: Users, change: "+18" },
];

const bookings = [
  { id: "AP-001", client: "Sarah Miller", type: '11"×14"', status: "In Progress", date: "Feb 15", amount: "$250" },
  { id: "AP-002", client: "James Wilson", type: '16"×20"', status: "Pending", date: "Feb 16", amount: "$400" },
  { id: "AP-003", client: "Emily Roberts", type: '8"×10"', status: "Completed", date: "Feb 12", amount: "$150" },
  { id: "AP-004", client: "Michael Chen", type: '18"×24"', status: "Delivered", date: "Feb 10", amount: "$550" },
  { id: "AP-005", client: "Lisa Johnson", type: '11"×14"', status: "In Progress", date: "Feb 17", amount: "$250" },
];

const statusColors: Record<string, string> = {
  "Pending": "bg-secondary text-secondary-foreground",
  "In Progress": "bg-accent/15 text-accent",
  "Completed": "bg-accent/25 text-accent-foreground",
  "Delivered": "bg-muted text-muted-foreground",
};

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-60" : "w-16"
        } bg-card border-r border-border transition-all duration-300 flex flex-col shrink-0`}
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          {sidebarOpen && (
            <span className="font-display text-lg font-bold">
              Artistry<span className="text-accent">.</span>
            </span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-secondary rounded-sm">
            <Menu size={18} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item, i) => (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-all ${
                item.active ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <item.icon size={18} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm text-muted-foreground hover:bg-secondary transition-all"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <header className="border-b border-border px-8 py-5">
          <h1 className="font-display text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Welcome back, Artist</p>
        </header>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-sm p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <s.icon className="text-accent" size={18} />
                  </div>
                  <span className="text-xs text-accent font-medium flex items-center gap-1">
                    <TrendingUp size={12} /> {s.change}
                  </span>
                </div>
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart placeholder */}
          <div className="glass rounded-sm p-6 mb-8">
            <h3 className="font-display text-lg font-bold mb-4">Revenue Overview</h3>
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
              📊 Chart placeholder — integrate with Recharts
            </div>
          </div>

          {/* Bookings Table */}
          <div className="glass rounded-sm overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Recent Bookings</h3>
              <button className="text-sm text-accent flex items-center gap-1">
                View All <ChevronRight size={14} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground border-b border-border">
                    <th className="px-6 py-3 font-medium">Order ID</th>
                    <th className="px-6 py-3 font-medium">Client</th>
                    <th className="px-6 py-3 font-medium">Size</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{b.id}</td>
                      <td className="px-6 py-4">{b.client}</td>
                      <td className="px-6 py-4 text-muted-foreground">{b.type}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-sm text-xs font-medium ${statusColors[b.status]}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{b.date}</td>
                      <td className="px-6 py-4 text-right font-medium">{b.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
