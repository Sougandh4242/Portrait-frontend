import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Upload, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/animations/MotionElements";
import { Layout } from "@/components/layout/Layout";

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const prices = [
  { size: '8" × 10"', faces: "1 Person", price: "$150", popular: false },
  { size: '11" × 14"', faces: "1–2 People", price: "$250", popular: true },
  { size: '16" × 20"', faces: "1–4 People", price: "$400", popular: false },
  { size: '18" × 24"', faces: "Any", price: "$550", popular: false },
];

const Booking = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simple calendar for current month
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = now.toLocaleString("default", { month: "long" });

  return (
    <Layout>
      <section className="pt-28 pb-16 section-padding bg-background min-h-screen">
        <div className="container mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-accent tracking-[0.2em] uppercase text-sm mb-3">Commission</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold">Book Your Portrait</h1>
            </div>
          </FadeIn>

          {/* Steps indicator */}
          <FadeIn delay={0.2}>
            <div className="flex justify-center gap-2 mb-12">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      step >= s ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 4 && <div className={`w-10 h-px ${step > s ? "bg-accent" : "bg-border"}`} />}
                </div>
              ))}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-sm p-8"
              >
                {step === 1 && (
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                      <CalendarDays className="text-accent" size={24} /> Select Date
                    </h2>
                    <p className="text-muted-foreground mb-4 text-sm">{monthName} {year}</p>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                        <div key={d} className="text-muted-foreground font-medium py-2">{d}</div>
                      ))}
                      {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const isPast = day < now.getDate();
                        return (
                          <button
                            key={day}
                            disabled={isPast}
                            onClick={() => setSelectedDate(day)}
                            className={`py-2 rounded-sm text-sm font-medium transition-all ${
                              selectedDate === day
                                ? "bg-accent text-accent-foreground"
                                : isPast
                                ? "text-muted-foreground/30 cursor-not-allowed"
                                : "hover:bg-secondary"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                      <Clock className="text-accent" size={24} /> Select Time
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-3 rounded-sm text-sm font-medium transition-all border ${
                            selectedTime === t
                              ? "bg-accent text-accent-foreground border-accent"
                              : "border-border hover:border-accent/50"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                      <Upload className="text-accent" size={24} /> Upload Reference
                    </h2>
                    <div
                      className="border-2 border-dashed border-border rounded-sm p-12 text-center hover:border-accent/50 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/jpeg,image/png"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setSelectedFile(file);
                        }}
                      />
                      <Upload className="mx-auto text-muted-foreground mb-4" size={40} />
                      {selectedFile ? (
                        <p className="text-foreground font-medium">{selectedFile.name}</p>
                      ) : (
                        <>
                          <p className="text-muted-foreground mb-2">Drag & drop your photo here</p>
                          <p className="text-xs text-muted-foreground/60">JPG, PNG up to 10MB</p>
                        </>
                      )}
                      <button
                        type="button"
                        className="btn-outline mt-6 text-sm py-2 px-5"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                      >
                        Browse Files
                      </button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                      <CreditCard className="text-accent" size={24} /> Select Package
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {prices.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedPrice(i)}
                          className={`relative text-left p-5 rounded-sm border transition-all ${
                            selectedPrice === i
                              ? "border-accent bg-accent/5"
                              : "border-border hover:border-accent/40"
                          }`}
                        >
                          {p.popular && (
                            <span className="absolute -top-2 right-3 bg-accent text-accent-foreground text-[10px] px-2 py-0.5 rounded-sm font-medium">
                              Popular
                            </span>
                          )}
                          <p className="font-display text-xl font-bold">{p.price}</p>
                          <p className="text-sm text-foreground mt-1">{p.size}</p>
                          <p className="text-xs text-muted-foreground">{p.faces}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    className="btn-outline py-2 px-5 text-sm flex items-center gap-2 disabled:opacity-30"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  {step < 4 ? (
                    <button onClick={() => setStep(step + 1)} className="btn-gold py-2 px-5 text-sm flex items-center gap-2">
                      Next <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button className="btn-gold py-2 px-5 text-sm">Proceed to Payment</button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Summary */}
            <div>
              <FadeIn delay={0.3}>
                <div className="glass rounded-sm p-8 sticky top-28">
                  <h3 className="font-display text-xl font-bold mb-6">Order Summary</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{selectedDate ? `${monthName} ${selectedDate}, ${year}` : "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium">{selectedTime || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Package</span>
                      <span className="font-medium">{selectedPrice !== null ? prices[selectedPrice].size : "—"}</span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between">
                      <span className="font-display font-bold">Total</span>
                      <span className="font-display font-bold text-accent">
                        {selectedPrice !== null ? prices[selectedPrice].price : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
