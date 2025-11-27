// src/components/FloatingAnnouncement.jsx
import { X } from "lucide-react";
import { useState } from "react";

export default function FloatingAnnouncement() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-slate-900/95 px-4 py-2 text-xs sm:text-sm text-slate-100 shadow-lg shadow-slate-900/60 ring-1 ring-slate-700/80">
        <span className="font-semibold text-white">
          MockMateAI Launch
        </span>
        <span className="hidden sm:inline text-slate-300">
          Join the early access waitlist to lock in founder pricing.
        </span>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="ml-1 rounded-full p-1 text-slate-400 hover:text-slate-100"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
