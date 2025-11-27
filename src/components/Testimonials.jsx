const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "Mockmate gave me realistic interview practice and feedback—it boosted my confidence for my real interviews!",
  },
  {
    name: "Marcus Rodriguez",
    role: "Software Engineer",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "I landed my dream job thanks to Mockmate! The AI feedback made me aware of my strengths and blind spots before the actual interview.",
  },
  {
    name: "Emily Watson",
    role: "CTO",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "We've recommended Mockmate to our entire graduate cohort for interview prep. It's like having a personal coach for every candidate.",
  },
];

export default function Testimonials() {
  const main = testimonials[1]; // highlight Marcus

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-slate-950 px-6 py-24 sm:py-28 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,#4f46e5,transparent)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-slate-950 shadow-xl ring-1 shadow-blue-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-blue-400">
            Mockmate interview success stories
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Trusted by candidates worldwide
          </p>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Discover how people are landing jobs and boosting interview skills
            with MockMateAI’s coaching and AI feedback.
          </p>
        </div>

        <figure className="mt-10">
          <blockquote className="text-center text-lg sm:text-2xl font-semibold text-white/95">
            <p>“{main.content}”</p>
          </blockquote>
          <figcaption className="mt-8">
            <img
              src={main.image}
              alt={main.name}
              className="mx-auto h-12 w-12 rounded-full object-cover"
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-sm">
              <div className="font-semibold text-white">{main.name}</div>
              <span className="h-1 w-1 rounded-full bg-white" />
              <div className="text-slate-400">{main.role}</div>
            </div>
          </figcaption>
        </figure>

        {/* Small row of the other testimonials under the main quote */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {testimonials
            .filter((t) => t !== main)
            .map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4 text-left"
              >
                <p className="text-sm text-slate-200 mb-3">“{t.content}”</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
