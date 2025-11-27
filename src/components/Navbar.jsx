import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ scrolled }) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const location = useLocation();

  // Scroll to hash target after navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-lg border-b border-slate-800"
          : "bg-slate-950/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-1 group cursor-pointer"
          >
            <div>
              <img
                src="/logo.png"
                alt="MockMateAI"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              <span className="text-white">Mock</span>
              <span className="text-blue-400">Mate</span>
              <span className="text-white">AI</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/#features"
              className="text-gray-300 hover:text-white text-sm lg:text-base"
            >
              Features
            </Link>
            <Link
              to="/#pricing"
              className="text-gray-300 hover:text-white text-sm lg:text-base"
            >
              Pricing
            </Link>
            <Link
              to="/#testimonials"
              className="text-gray-300 hover:text-white text-sm lg:text-base"
            >
              Testimonials
            </Link>

            {/* Login button */}
            <Link
              to="/login"
              className="rounded-full bg-blue-500 hover:bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/40 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuIsOpen((prev) => !prev)}
          >
            {mobileMenuIsOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuIsOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
            <Link
              to="/#features"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-sm"
            >
              Features
            </Link>
            <Link
              to="/#pricing"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-sm"
            >
              Pricing
            </Link>
            <Link
              to="/#testimonials"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-sm"
            >
              Testimonials
            </Link>

            <Link
              to="/login"
              onClick={() => setMobileMenuIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center w-full rounded-full bg-blue-500 hover:bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/40 transition"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
