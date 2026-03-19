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
  <footer className="bg-primary text-primary-foreground w-full overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h3 className="font-display text-2xl font-bold mb-4">
            Artistry<span className="text-accent">.</span>
          </h3>

          <p className="text-primary-foreground/60 text-sm leading-relaxed break-words">
            Handcrafted pencil portraits that capture the soul. Every stroke tells a story.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">
            Quick Links
          </h4>

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
          <h4 className="font-display text-lg font-semibold mb-4">
            Contact
          </h4>

          <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">

            <div className="flex items-start gap-2 break-words">
              <Mail size={14} className="mt-0.5 shrink-0" />
              <span>portraitbooking05@gmail.com</span>
            </div>

            <div className="flex items-start gap-2 break-words">
              <Phone size={14} className="mt-0.5 shrink-0" />
              <span>+91 8861759694</span>
            </div>

            <div className="flex items-start gap-2 break-words">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>Bangalore, India</span>
            </div>

          </div>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">
            Follow
          </h4>

          <div className="flex gap-4 sm:justify-start justify-center">

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

      {/* Bottom */}
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} Artistry Portraits. All rights reserved.
      </div>

    </div>
  </footer>
);