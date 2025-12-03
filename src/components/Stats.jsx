import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./common/SectionHeader";

function useCountUpWhenVisible(end, duration = 1200) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [value, setValue] = useState(0);

  // Observe visibility
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Run counter once started
  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(end * progress);
      setValue(current);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [started, end, duration]);

  return { ref, value };
}

function StatCard({ item, index }) {
  const { ref, value } = useCountUpWhenVisible(
    item.value,
    1200 + index * 150
  );

  const display =
    item.decimals != null
      ? value.toFixed(item.decimals)
      : value.toLocaleString();

  return (
    <motion.div
      ref={ref}
      className="px-6 py-6 text-center sm:py-7"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.45,
        delay: 0.06 * index,
        ease: "easeOut",
      }}
    >
      <dt className="text-sm font-medium text-slate-400">{item.label}</dt>
      <dd className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
        {display}
        {item.suffix}
      </dd>
    </motion.div>
  );
}

export default function Stats() {
  const stats = [
    { value: 10000, suffix: "+", label: "Mock interviews completed" },
    { value: 4.8, suffix: "/5", label: "Average session rating", decimals: 1 },
    { value: 95, suffix: "%", label: "Users feel more interview-ready" },
    { value: 70, suffix: "%", label: "See improvement within 2 weeks" },
  ];

  return (
    <motion.section
      id="stats"
      className="px-4 py-16 sm:py-20 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-6xl px-6 py-10 mx-auto border shadow-xl bg-slate-900/80 border-slate-800 rounded-3xl sm:px-10 sm:py-12">
        <SectionHeader
          eyebrow="Mockmate interview stats"
          title="Trusted by candidates worldwide"
          description="Thousands of learners use MockMateAI to practice smarter and walk into real interviews with confidence."
          align="center"
        />

        <div className="overflow-hidden border bg-slate-950/80 rounded-2xl border-slate-800">
          <dl className="grid grid-cols-1 divide-y sm:grid-cols-2 lg:grid-cols-4 sm:divide-y-0 sm:divide-x divide-slate-800">
            {stats.map((item, i) => (
              <StatCard key={item.label} item={item} index={i} />
            ))}
          </dl>
        </div>
      </div>
    </motion.section>
  );
}
