import { useState } from "react";
import { storeSpecialPassword } from "../services/api";
import { useNavigate } from "react-router";

const Special = () => {
  const nevigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const HARD_CODED_PASSWORD = "anshikha5";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    try {
      await storeSpecialPassword({ password: password.trim() });

      if (password.trim() === HARD_CODED_PASSWORD) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
        setError("Incorrect password.");
      }
    } catch (err) {
      setError("Failed to verify password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-gradient-to-br from-primary-50 via-secondary to-primary-100">
      <button
          type="button"
          onClick={() => navigate("/")}
          className="m-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-primary shadow-sm ring-1 ring-primary/10 transition hover:bg-white"
        >
          <span className="text-base">?</span>
          Back to Home
        </button>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,228,230,0.4),_transparent_60%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6 py-16">
        <div className="w-full rounded-[2.5rem] border border-primary/15 bg-white/80 p-8 text-center shadow-2xl shadow-primary/20 backdrop-blur-xl sm:p-12">
          {!isCorrect ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h1 className="text-2xl font-heading text-primary-700 sm:text-3xl">
                  To unlock this special page, insert your password.
                </h1>
                <p className="mt-2 text-sm font-body text-primary-600/80 sm:text-base">
                  Please enter the correct password to continue.
                </p>
              </div>

              <div>
                <label className="block text-left text-sm font-medium text-primary-700">
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-primary/20 bg-white/90 px-4 py-3 pr-12 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 bg-primary -translate-y-1/2 rounded-full px-3 py-1 text-xs font-semibold text-primary-100 transition hover:text-primary-200"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary-600 disabled:opacity-60"
              >
                {isSubmitting ? "Checking..." : "Unlock"}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <h2 className="text-3xl font-heading text-primary-700">
                I don't have anything to say,
              </h2>
              <p className="text-lg font-body text-primary-600">
                Life is going boring.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Special
