import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Upload, Calendar, Pencil, Truck } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";
import { Layout } from "@/components/layout/Layout";
import heroBg from "@/assets/hero-bg.jpg";
import portrait1 from "@/assets/portrait-1.jpg";
import portrait2 from "@/assets/portrait-2.jpg";
import portrait3 from "@/assets/portrait-3.jpg";
import portrait4 from "@/assets/portrait-4.jpg";

const featuredWorks = [
  { src: portrait1, title: "Ethereal Grace", category: "Individual" },
  { src: portrait2, title: "Wisdom Lines", category: "Individual" },
  { src: portrait3, title: "Together Forever", category: "Couples" },
  { src: portrait4, title: "Loyal Companion", category: "Pets" },
];

const processSteps = [
  { icon: Upload, title: "Upload Photo", desc: "Send us your favourite reference photograph" },
  { icon: Calendar, title: "Book & Pay", desc: "Choose your size, style, and schedule" },
  { icon: Pencil, title: "Artistry Begins", desc: "Your portrait is hand-drawn with precision" },
  { icon: Truck, title: "Delivered", desc: "Framed artwork shipped to your doorstep" },
];

const testimonials = [
  { name: "Sarah M.", text: "Absolutely breathtaking. The detail in my daughter's portrait brought tears to my eyes.", rating: 5 },
  { name: "James K.", text: "I've commissioned three portraits now. Each one surpasses the last. True artistry.", rating: 5 },
  { name: "Emily R.", text: "The pet portrait of our golden retriever is our most treasured possession. Incredible work.", rating: 5 },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Pencil portrait artwork in progress" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        </div>

        <div className="relative container mx-auto px-6 pt-24">
          <div className="max-w-2xl">
            <FadeIn delay={0.2}>
              <p className="text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4">
                Pencil Portrait Artist
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
                Capturing Souls
                <br />
                <span className="italic font-normal text-accent">in Graphite</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="text-muted-foreground text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
                Hyper-realistic hand-drawn pencil portraits that preserve your most
                precious moments with extraordinary detail and emotion.
              </p>
            </FadeIn>

            <FadeIn delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-gold flex items-center gap-2 text-base"
                  >
                    Book Your Portrait <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link to="/gallery">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-outline text-base"
                  >
                    View Gallery
                  </motion.button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-accent tracking-[0.2em] uppercase text-sm mb-3">Portfolio</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Featured Works</h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredWorks.map((work, i) => (
              <StaggerItem key={i}>
                <Link to="/gallery">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative overflow-hidden rounded-sm cursor-pointer"
                  >
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={work.src}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-xs tracking-[0.15em] uppercase text-accent mb-1">{work.category}</p>
                      <h3 className="font-display text-lg font-semibold text-primary-foreground">{work.title}</h3>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="text-center mt-12">
              <Link to="/gallery" className="btn-outline inline-flex items-center gap-2">
                View Full Gallery <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-accent tracking-[0.2em] uppercase text-sm mb-3">Process</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold">How It Works</h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ y: -5 }} className="glass rounded-sm p-8 text-center hover-lift">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                    <step.icon className="text-accent" size={24} />
                  </div>
                  <p className="text-xs text-accent font-medium tracking-wider mb-2">Step {i + 1}</p>
                  <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-accent tracking-[0.2em] uppercase text-sm mb-3">Testimonials</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Client Love</h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div className="glass rounded-sm p-8 hover-lift">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground/80 italic mb-6 leading-relaxed">"{t.text}"</p>
                  <p className="font-display font-semibold">{t.name}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to Preserve a Moment Forever?
            </h2>
            <p className="text-primary-foreground/60 text-lg mb-10 max-w-xl mx-auto">
              Commission a bespoke pencil portrait that will be treasured for generations.
            </p>
            <Link to="/booking">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-gold text-base"
              >
                Start Your Commission
              </motion.button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
