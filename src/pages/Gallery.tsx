import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";
import { Layout } from "@/components/layout/Layout";
import portrait1 from "@/assets/portrait-1.jpg";
import portrait2 from "@/assets/portrait-2.jpg";
import portrait3 from "@/assets/portrait-3.jpg";
import portrait4 from "@/assets/portrait-4.jpg";
import heroBg from "@/assets/hero-bg.jpg";

const categories = ["All", "Individual", "Couples", "Family", "Pets", "Celebrity"];

const galleryItems = [
  { src: portrait1, title: "Ethereal Grace", category: "Individual", size: "large" },
  { src: portrait2, title: "Wisdom Lines", category: "Individual", size: "medium" },
  { src: portrait3, title: "Together Forever", category: "Couples", size: "large" },
  { src: portrait4, title: "Loyal Companion", category: "Pets", size: "medium" },
  { src: heroBg, title: "Work in Progress", category: "Individual", size: "large" },
  { src: portrait1, title: "Serene Beauty", category: "Individual", size: "medium" },
  { src: portrait3, title: "Family Bond", category: "Family", size: "large" },
  { src: portrait4, title: "Best Friend", category: "Pets", size: "medium" },
];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter);

  return (
    <Layout>
      <section className="pt-28 pb-8 section-padding bg-background">
        <div className="container mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-accent tracking-[0.2em] uppercase text-sm mb-3">Portfolio</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold">Gallery</h1>
            </div>
          </FadeIn>

          {/* Filters */}
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-sm text-sm font-medium tracking-wide transition-all duration-300 ${
                    filter === cat
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Masonry Grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={`${item.title}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => setLightbox(i)}
                >
                  <div className="relative overflow-hidden rounded-sm">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                      <div>
                        <p className="text-xs text-accent tracking-wider uppercase">{item.category}</p>
                        <h3 className="font-display text-lg text-primary-foreground font-semibold">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-primary/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground"
              onClick={() => setLightbox(null)}
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={filtered[lightbox]?.src}
              alt={filtered[lightbox]?.title}
              className="max-w-full max-h-[85vh] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
