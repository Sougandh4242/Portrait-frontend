import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/animations/MotionElements";
import { Layout } from "@/components/layout/Layout";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <section className="pt-28 pb-16 section-padding bg-background min-h-screen">
        <div className="container mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-accent tracking-[0.2em] uppercase text-sm mb-3">Get in Touch</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold">Contact</h1>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <FadeIn direction="left">
              <div className="glass rounded-sm p-8">
                <h2 className="font-display text-2xl font-bold mb-6">Send a Message</h2>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-secondary rounded-sm px-4 py-3 text-sm outline-none focus:ring-2 ring-accent/30 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-secondary rounded-sm px-4 py-3 text-sm outline-none focus:ring-2 ring-accent/30 transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-secondary rounded-sm px-4 py-3 text-sm outline-none focus:ring-2 ring-accent/30 transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-secondary rounded-sm px-4 py-3 text-sm outline-none focus:ring-2 ring-accent/30 transition-all resize-none"
                      placeholder="Tell us about your portrait project..."
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-gold w-full flex items-center justify-center gap-2"
                  >
                    <Send size={16} /> Send Message
                  </motion.button>
                </form>
              </div>
            </FadeIn>

            {/* Info */}
            <FadeIn direction="right">
              <div className="space-y-6">
                <div className="glass rounded-sm p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">hello@artistryportraits.com</p>
                  </div>
                </div>

                <div className="glass rounded-sm p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Phone</h3>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="glass rounded-sm p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-accent" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">Studio</h3>
                    <p className="text-sm text-muted-foreground">123 Art District, New York, NY 10001</p>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="glass rounded-sm overflow-hidden h-48 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">📍 Map placeholder</p>
                </div>

                {/* WhatsApp CTA */}
                <motion.a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 bg-[hsl(142,70%,40%)] text-primary-foreground py-3 rounded-sm font-medium transition-all hover:brightness-110"
                >
                  <MessageCircle size={20} /> Chat on WhatsApp
                </motion.a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
