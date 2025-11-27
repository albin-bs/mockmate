export default function Stats() {
  const stats = [
    { value: "10,000+", label: "Mock interviews completed" },
    { value: "4.8/5", label: "Average session rating" },
    { value: "95%", label: "Users feel more interview-ready" },
    { value: "70%", label: "See improvement within 2 weeks" },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl px-6 sm:px-10 py-10 sm:py-12 shadow-xl">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
            Trusted by candidates worldwide
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Thousands of learners use MockMateAI to practice smarter and walk
            into real interviews with confidence.
          </p>
        </div>

        <div className="bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            {stats.map((item) => (
              <div
                key={item.label}
                className="px-6 py-6 sm:py-7 text-center"
              >
                <dt className="text-sm font-medium text-slate-400">
                  {item.label}
                </dt>
                <dd className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
