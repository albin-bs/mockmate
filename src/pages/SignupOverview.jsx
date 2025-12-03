import { useNavigate } from "react-router-dom";

export default function SignupOverview() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-[#0b1020] rounded-3xl border border-slate-800/80 shadow-xl grid md:grid-cols-[1.1fr,1.4fr] overflow-hidden">
        {/* Left: copy */}
        <div className="px-8 py-10 border-b md:border-b-0 md:border-r border-slate-800/60">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-blue-400">
            Getting started with MockMateAI
          </h2>
          <h1 className="mb-3 text-2xl font-semibold text-white">
            Create your account in a few simple steps
          </h1>
          <p className="mb-4 text-sm leading-relaxed text-slate-400">
            When you create a new account, most sites follow a similar flow to
            keep your information safe and make sure it’s really you.
          </p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Enter basic details like name, email, and password.</li>
            <li>• Choose how you want to verify your account (email or SMS).</li>
            <li>• Receive a 6‑digit code at your email or phone.</li>
            <li>• Enter the code to confirm it’s really you.</li>
            <li>• Finish setup and land in your dashboard.</li>
          </ul>
        </div>

        {/* Right: CTA card */}
        <div className="bg-[#0f1424] px-8 py-10 flex flex-col justify-center">
          <div className="mb-6 rounded-2xl border border-slate-700/70 bg-[#0f172a] px-5 py-4">
            <p className="mb-1 text-sm font-semibold text-slate-100">
              Ready to sign up?
            </p>
            <p className="text-xs text-slate-400">
              You’ll first pick a verification method, then we’ll send you a
              code to confirm your email or phone before creating your account.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/verify/method")}
            className="inline-flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition"
          >
            Start account setup →
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-3 text-xs text-left text-slate-400 hover:text-slate-200"
          >
            Already have an account? Go back to login
          </button>
        </div>
      </div>
    </div>
  );
}
