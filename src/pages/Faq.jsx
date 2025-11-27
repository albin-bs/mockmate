import { useState } from "react";

const faqs = [
  {
    question: "What is MockMateAI?",
    answer:
      "MockMateAI is an AI-powered interview practice platform that simulates real interview scenarios and provides instant feedback on your answers.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Every new account starts with a 14-day free trial so you can explore AI interview sessions, feedback, and analytics before choosing a plan.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No installation is required. MockMateAI runs in the browser, so you can practice from any modern device with an internet connection.",
  },
  {
    question: "Can I practice for different roles?",
    answer:
      "You can generate role-specific questions for positions like software engineer, product manager, data analyst, and more, with adjustable difficulty.",
  },
  {
    question: "Is my data and recording secure?",
    answer:
      "Your practice data is encrypted in transit and at rest, and recordings are only used to provide feedback unless you explicitly choose to delete them.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="min-h-screen bg-slate-950 px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
          Frequently asked questions
        </h1>

        <div className="mt-10 divide-y divide-slate-800 border-t border-b border-slate-800">
          {faqs.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <button
                key={item.question}
                type="button"
                onClick={() =>
                  setOpenIndex(isOpen ? -1 : index)
                }
                className="w-full text-left py-4 sm:py-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm sm:text-base font-semibold text-white">
                    {item.question}
                  </p>
                  <span className="ml-4 text-xl text-slate-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </div>
                {isOpen && (
                  <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
                    {item.answer}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
