import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const instagramUsername = import.meta.env.VITE_INSTAGRAM_USERNAME;
const facebookUsername = import.meta.env.VITE_FACEBOOK_USERNAME;

const instagramUrl = instagramUsername
  ? `https://instagram.com/${instagramUsername}`
  : "#";

const facebookUrl = facebookUsername
  ? `https://facebook.com/${facebookUsername}`
  : "#";

export const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="font-display text-2xl font-bold mb-4">
            Artistry<span className="text-accent">.</span>
          </h3>
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            Handcrafted pencil portraits that capture the soul. Every stroke tells a story.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Gallery", to: "/gallery" },
              { label: "Book a Portrait", to: "/booking" },
              { label: "About the Artist", to: "/about" },
              { label: "Track Order", to: "/track" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-primary-foreground/60 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
            <div className="flex items-center gap-2">
              <Mail size={14} /> portraitbooking05@gmail.com
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} /> +91 8105015350
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} /> Bangalore, India
            </div>
          </div>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Follow</h4>
          <div className="flex gap-4">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300"
            >
              <Instagram size={16} />
            </a>

            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} Artistry Portraits. All rights reserved.
      </div>
    </div>
  </footer>
);