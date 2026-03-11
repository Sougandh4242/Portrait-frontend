import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Upload, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/animations/MotionElements";
import { Layout } from "@/components/layout/Layout";

// const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const prices = [
  { size: '8" × 10"', faces: "1 Person", price: 10, popular: false },
  { size: '11" × 14"', faces: "1–2 People", price: 15, popular: true },
  { size: '16" × 20"', faces: "1–4 People", price: 5, popular: false },
  { size: '18" × 24"', faces: "Any", price: 1, popular: false },
];

const Booking = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [fullDates, setFullDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchUnavailableDates = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/unavailable-dates`
      );

      const data = await res.json();

      setBlockedDates(data.blocked || []);
      setFullDates(data.full || []);

    } catch (err) {
      console.error("Failed to fetch unavailable dates");
    }
  };

  fetchUnavailableDates();
}, []);

  useEffect(() => {
  window.scrollTo({
    top: 120,
    behavior: "smooth"
  });
}, [step]);

 const [customerName, setCustomerName] = useState("");
 const [customerEmail, setCustomerEmail] = useState("");
 const [customerPhone, setCustomerPhone] = useState("");

 const [address, setAddress] = useState({
  line1: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  latitude: null,
  longitude: null,
});

const handleUseLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    setAddress((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));

    // Optional: use reverse geocoding later
  });
};

  // Simple calendar for current month
 // ===== Calendar State =====
const today = new Date();

// Month navigation state
const [currentMonth, setCurrentMonth] = useState(
  new Date(today.getFullYear(), today.getMonth(), 1)
);

// Selected full date (not just number)
//below line is already defined at the top
// const [selectedDate, setSelectedDate] = useState<Date | null>(null);

// Allowed month range
const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const maxMonth = new Date(today.getFullYear(), today.getMonth() + 3, 1);

// Derived values
const year = currentMonth.getFullYear();
const month = currentMonth.getMonth();
const daysInMonth = new Date(year, month + 1, 0).getDate();
const firstDay = new Date(year, month, 1).getDay();
const monthName = currentMonth.toLocaleString("default", { month: "long" });

// Navigation
const goToNextMonth = () => {
  const next = new Date(currentMonth);
  next.setMonth(next.getMonth() + 1);
  if (next <= maxMonth) setCurrentMonth(next);
};

const goToPreviousMonth = () => {
  const prev = new Date(currentMonth);
  prev.setMonth(prev.getMonth() - 1);
  if (prev >= minMonth) setCurrentMonth(prev);
};

  const handlePayment = async () => {
//   console.log(selectedDate);
//   console.log(selectedTime);
//   console.log(selectedPrice);
//   console.log(selectedFile);
//   console.log(customerName);
  // console.log(customerEmail);
  // console.log(customerPhone);
    setLoading(true);
  try {
    if (!selectedDate  || !selectedPrice || !selectedFile || !customerName || !customerEmail || !customerPhone || !address.line1 || !address.city || !address.state || !address.pincode) {
      alert("Please complete all steps before payment.");
      return;
    }
    // const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
    // const formattedDate = { date: selectedDate?.toISOString().split("T")[0] };
    const formattedDate = selectedDate
      ? `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1
        ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
      : "";

    // 1️⃣ Upload image first
    const formData = new FormData();
    formData.append("image", selectedFile);

    const uploadRes = await fetch(
      `${import.meta.env.VITE_API_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const uploadData = await uploadRes.json();

    if (!uploadData.imageUrl) {
      alert("Image upload failed");
      return;
    }

    // 2️⃣ Create Razorpay order
    const orderRes = await fetch(
      `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: selectedPrice,
          date: formattedDate,
        }),
      }
    );

    const orderData = await orderRes.json();

   if (!orderRes.ok) {
      window.location.href = "/booking-failed";
      return;
    }

    // 3️⃣ Open Razorpay Checkout

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: orderData.amount,
      currency: "INR",
      name: "Artistry",
      description: "Portrait Booking",
      order_id: orderData.id,
      redirect: true,

    handler: async function (response: any) {
    try {
      const verifyRes = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payment/verify-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            date: formattedDate,
            amount: selectedPrice,
            imageUrl: uploadData.imageUrl,
            address: {
              line1: address.line1,
              city: address.city,
              state: address.state,
              pincode: address.pincode,
              country: address.country,
              latitude: address.latitude,
              longitude: address.longitude,
            },
          }),
        }
      );

      if (!verifyRes.ok) {
            const errorText = await verifyRes.text();
            // console.log("Verify failed:", errorText);
            window.location.href = "/booking-failed";
            return;
          }

      window.location.href = "/booking-success";
    } catch (err) {
      // console.error("Verify error:", err);
      window.location.href = "/booking-failed";
    }
  },

  theme: {
    color: "#c9a227",
  },
};

const razorpay = new (window as any).Razorpay(options);
razorpay.open();

  } catch (error) {
    // console.error("Payment error:", error);
    setLoading(false);
    window.location.href = "/booking-failed";
  }
};



const selectedPackage = prices.find(p => p.price === selectedPrice);
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
          <div className="flex justify-center items-center gap-1 sm:gap-2 mb-12 px-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center gap-1 sm:gap-2">
                
                <div
                  className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all ${
                    step >= s
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>

                {s < 5 && (
                  <div
                    className={`w-4 sm:w-10 h-px ${
                      step > s ? "bg-accent" : "bg-border"
                    }`}
                  />
                )}

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
                  {/* Step 1 - Customer Details */}
{step === 1 && (
  <div>
    <h2 className="font-display text-2xl font-bold mb-8">
      Enter Your Details
    </h2>

    <div className="space-y-4 mb-8">
      <input
        type="text"
        placeholder="Full Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="w-full border border-border p-3 rounded-lg bg-background"
      />

      <input
        type="email"
        placeholder="Email Address"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        className="w-full border border-border p-3 rounded-lg bg-background"
      />

      <input
        type="tel"
        placeholder="Phone Number"
        value={customerPhone}
        onChange={(e) => setCustomerPhone(e.target.value)}
        className="w-full border border-border p-3 rounded-lg bg-background"
      />
    </div>
  </div>
)}

{step === 2 && (
  <div>
    <h2 className="font-display text-2xl font-bold mb-8">
      Address Details
    </h2>

    <div className="rounded-2xl p-6
                    bg-white/40 dark:bg-white/10
                    backdrop-blur-md
                    border border-black/5 dark:border-white/20
                    shadow-lg space-y-4">

      <input
        placeholder="Address Line"
        value={address.line1}
        onChange={(e) =>
          setAddress({ ...address, line1: e.target.value })
        }
        className="w-full border border-border p-3 rounded-lg bg-background"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="City"
          value={address.city}
          onChange={(e) =>
            setAddress({ ...address, city: e.target.value })
          }
          className="w-full border border-border p-3 rounded-lg bg-background"
        />

        <input
          placeholder="State"
          value={address.state}
          onChange={(e) =>
            setAddress({ ...address, state: e.target.value })
          }
          className="w-full border border-border p-3 rounded-lg bg-background"
        />
      </div>

      <input
        placeholder="Pincode"
        value={address.pincode}
        onChange={(e) =>
          setAddress({ ...address, pincode: e.target.value })
        }
        className="w-full border border-border p-3 rounded-lg bg-background"
      />

      <motion.button
        type="button"
        onClick={handleUseLocation}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="
          mt-2 px-6 py-3 rounded-xl
          font-medium text-sm tracking-wide
          bg-gradient-to-r from-amber-500 to-yellow-600
          text-white
          shadow-lg shadow-amber-500/20
          hover:shadow-xl hover:shadow-amber-500/30
          transition-all duration-300
        "
      >
        Use My Current Location
      </motion.button>
    </div>
  </div>
)}

{step === 3 && (
  <div>
    <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
      <CalendarDays className="text-accent" size={24} /> Select Date
    </h2>

    <div className="flex items-center justify-between mb-4">
      <button
        onClick={goToPreviousMonth}
        disabled={currentMonth <= minMonth}
        className="px-3 py-1 rounded border border-primary-foreground/20 disabled:opacity-30"
      >
        ‹
      </button>

      <p className="text-muted-foreground text-sm">
        {monthName} {year}
      </p>

      <button
        onClick={goToNextMonth}
        disabled={currentMonth >= maxMonth}
        className="px-3 py-1 rounded border border-primary-foreground/20 disabled:opacity-30"
      >
        ›
      </button>
    </div>

    <div className="grid grid-cols-7 gap-2 text-center text-sm">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
        <div key={d} className="text-muted-foreground font-medium py-2">
          {d}
        </div>
      ))}

      {Array.from({ length: firstDay }).map((_, i) => (
        <div key={`empty-${i}`} />
      ))}

      {Array.from({ length: daysInMonth }).map((_, i) => {
        const day = i + 1;
        const fullDate = new Date(year, month, day);

        const isPast =
          fullDate <
          new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const formatted = `${fullDate.getFullYear()}-${String(
          fullDate.getMonth() + 1
        ).padStart(2, "0")}-${String(fullDate.getDate()).padStart(2, "0")}`;

        const isBlocked = blockedDates.includes(formatted);
        const isFull = fullDates.includes(formatted);

        const isSelected =
          selectedDate &&
          fullDate.toDateString() === selectedDate.toDateString();

        return (
          <button
            key={day}
            disabled={isPast || isBlocked || isFull}
            onClick={() => setSelectedDate(fullDate)}
            className={`py-2 rounded-sm text-sm font-medium transition-all ${
              isSelected
                ? "bg-accent text-accent-foreground"
                : isPast || isBlocked || isFull
                ? "text-muted-foreground/30 cursor-not-allowed"
                : "hover:bg-secondary"
            }`}
                      >
            {day}
          </button>
        );
      })}
    </div>

    <p className="text-xs text-muted-foreground mt-4">
      Bookings are available up to 3 months in advance.
    </p>
  </div>
)}

                {step === 4 && (
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

                {step === 5 && (
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                      <CreditCard className="text-accent" size={24} /> Select Package
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {prices.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedPrice(p.price)}
                          className={`relative text-left p-5 rounded-sm border transition-all ${
                            selectedPrice === p.price
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
                  {step < 5 ? (
                    <button onClick={() => setStep(step + 1)} className="btn-gold py-2 px-5 text-sm flex items-center gap-2">
                      Next <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={handlePayment}
                      disabled={loading}
                      className="btn-gold py-2 px-5 text-sm flex items-center gap-2 disabled:opacity-60"
                    >
                      {loading ? "🎨 Preparing your masterpiece..." : "Proceed to Payment"}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Summary */}
            <div>
              <FadeIn delay={0.3}>
                <div className="glass rounded-sm p-8 sticky top-28 max-w-md mx-auto">
                  <h3 className="font-display text-xl font-bold mb-6">Order Summary</h3>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span className="font-medium break-all text-right">
                        {customerName || "—"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium">
                        {customerEmail || "—"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span className="font-medium">
                        {customerPhone || "—"}
                      </span>
                    </div>

                    {/* Address summary with only city */}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">City</span>
                        <span className="font-medium">
                          {address?.city || "—"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Package</span>
                        <span className="font-medium">
                          {selectedPackage ? selectedPackage.size : "—"}
                        </span>
                      </div>

                      <div className="border-t border-border pt-4 flex justify-between">
                        <span className="font-display font-bold">Total</span>
                        <span className="font-display font-bold text-accent">
                          {selectedPackage ? `₹${selectedPackage.price}` : "—"}
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
