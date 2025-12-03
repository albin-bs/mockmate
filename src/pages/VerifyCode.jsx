import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const OTP_LENGTH = 6;

export default function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const { method = "email", value = "your@email.com" } =
    location.state || {};

  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (code.length !== OTP_LENGTH) {
      setError("Code must be 6 digits.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    const isValid = code === "528390"; // TEMP
    setSubmitting(false);
    if (!isValid) {
      setError("Code is not correct or invalid.");
      return;
    }
    navigate("/verify/success");
  }

  function handleResend() {
    console.log("Resend code to", method, value);
  }

  const handleChange = (val, idx) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    if (!digit && val !== "") return;

    const nextArray = code.padEnd(OTP_LENGTH, " ").split("");
    nextArray[idx] = digit || "";
    const nextCode = nextArray.join("").trimEnd();
    setCode(nextCode);

    if (digit && idx < OTP_LENGTH - 1 && inputsRef.current[idx + 1]) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-[#0f1424] rounded-3xl border border-slate-800/80 shadow-xl px-8 py-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h3 className="mb-1 text-sm font-semibold text-slate-100">
              Enter your code
            </h3>
            <p className="mb-4 text-xs text-slate-400">
              We’ve sent a verification code to{" "}
              <span className="font-medium text-slate-200">{value}</span>. Please
              enter it below to continue.
            </p>
          </div>

          <div className="flex justify-between max-w-xs gap-2">
            {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                inputMode="numeric"
                maxLength={1}
                value={code[idx] || ""}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`h-12 w-10 rounded-lg border text-center text-lg font-medium bg-[#0f1420] text-slate-50 ${
                  error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-slate-700/70 focus:ring-purple-500"
                } focus:outline-none focus:ring-2 focus:border-transparent`}
              />
            ))}
          </div>

          {error && (
            <p className="flex items-center gap-1 text-xs text-red-400">
              <span>⚠️</span> {error}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Can’t find the email or code?</span>
            <button
              type="button"
              onClick={handleResend}
              className="font-medium text-purple-300 hover:text-purple-200"
            >
              Resend code
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 mt-2 text-sm font-semibold text-white transition bg-purple-500 shadow-lg rounded-xl hover:bg-purple-600 disabled:bg-purple-500/60 shadow-purple-500/30"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 rounded-full animate-spin border-white/40 border-t-white" />
                Verifying...
              </>
            ) : (
              "Verify account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
