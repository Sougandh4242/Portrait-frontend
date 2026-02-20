import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionElements";
import { Layout } from "@/components/layout/Layout";
import { Award, Palette, Users, Clock } from "lucide-react";
import artistPhoto from "@/assets/artist-photo.jpg";

const timeline = [
  { year: "2015", title: "First Commission", desc: "Completed first paid pencil portrait" },
  { year: "2017", title: "Full-Time Artist", desc: "Transitioned to full-time portrait work" },
  { year: "2019", title: "500+ Portraits", desc: "Milestone of 500 completed commissions" },
  { year: "2021", title: "International Clients", desc: "Expanded to serve clients worldwide" },
  { year: "2024", title: "Featured Artist", desc: "Featured in National Art Magazine" },
];

const stats = [
  { icon: Palette, value: "1,200+", label: "Portraits Completed" },
  { icon: Users, value: "800+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Awards Won" },
  { icon: Clock, value: "10+", label: "Years Experience" },
];

const About = () => (
  <Layout>
    <section className="pt-28 pb-16 section-padding bg-background">
      <div className="container mx-auto">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <FadeIn direction="left">
            <div className="relative">
              <img
                src={artistPhoto}
                alt="The artist in studio"
                className="rounded-sm w-full object-cover aspect-[3/4]"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-sm" />
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <p className="text-accent tracking-[0.2em] uppercase text-sm mb-3">About</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">The Artist</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              With over a decade of dedication to the art of graphite portraiture, I transform
              photographs into timeless hand-drawn masterpieces. Every portrait is crafted with
              meticulous attention to detail, capturing not just likeness, but the essence and
              soul of the subject.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My work has been featured in galleries and publications worldwide. I believe
              that a pencil portrait is the most intimate and enduring form of art — a legacy
              piece that transcends generations.
            </p>
          </FadeIn>
        </div>

        {/* Stats */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((s, i) => (
            <StaggerItem key={i}>
              <div className="glass rounded-sm p-6 text-center hover-lift">
                <s.icon className="mx-auto text-accent mb-3" size={28} />
                <p className="font-display text-3xl font-bold">{s.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Timeline */}
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-accent tracking-[0.2em] uppercase text-sm mb-3">Journey</p>
            <h2 className="font-display text-4xl font-bold">My Timeline</h2>
          </div>
        </FadeIn>

        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-border" />
          {timeline.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={`flex items-start gap-6 mb-10 relative ${i % 2 === 0 ? "lg:flex-row-reverse lg:text-right" : ""}`}>
                <div className="relative z-10 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 text-sm font-bold">
                  {t.year.slice(2)}
                </div>
                <div className="pt-2">
                  <p className="text-xs text-accent tracking-wider mb-1">{t.year}</p>
                  <h3 className="font-display text-lg font-semibold">{t.title}</h3>
                  <p className="text-muted-foreground text-sm">{t.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
