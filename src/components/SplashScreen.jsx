import { useState, useEffect } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#020618' }}>
      <div className="flex flex-col items-center justify-center w-[360px] bg-black/15 backdrop-blur-md rounded-3xl px-6 pt-6 pb-5 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="w-full rounded-2xl border border-white/18 bg-black overflow-hidden mb-4">
          <video
            src="/mockmatesplash.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[120px] object-contain bg-black"
          />
        </div>

        <p className="text-xs text-blue-100/80 tracking-wide">
          Your personal AI interview coach is loading...
        </p>
      </div>
    </div>
  );
}
