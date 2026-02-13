import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "../component/particles/FloatingHearts";
import { createValentine } from "../services/api";
// import { createValentine } from "../services/api";

const initialForm = {
  senderName: "",
  receiverName: "",
  day: "",
  message: "",
};

const CreateValentine = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultLink, setResultLink] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [copied, setCopied] = useState(false);
  

  const dayOptions = useMemo(
    () => [
      { value: "rose", label: "Roseday 🌹" },
      { value: "propose", label: "Proposeday 💍" },
      { value: "chocolate", label: "Chocolateday 🍫" },
      { value: "teddy", label: "Teddyday 🧸" },
      { value: "promise" , label: "Promiseday 🤝🏼"},
      { value: "hug", label: "Hugday 🤗" },
      { value: "kiss", label: "Kissday 💋" },
      { value: "valentine", label: "Valentineday ❤️" },
      
    ],
    []
  ); 

  const defaultMessages = useMemo(
    () => ({
      rose: "A rose for you, just to say I care for you today and always.",
      propose: "I choose you, today and every day. Will you be mine?",
      chocolate: "Sweet as chocolate, my feelings for you grow every day.",
      teddy: "A cuddle in words: sending you a teddy-sized hug!",
      hug: "Here is a warm hug to wrap you in love and comfort.",
      kiss: "A kiss to seal my love, soft, sweet, and true.",
      valentine: "Happy Valentine's Day! You are my heart's favorite.",
    }),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.senderName.trim()) nextErrors.senderName = "Sender name is required.";
    if (!form.receiverName.trim()) nextErrors.receiverName = "Receiver name is required.";
    if (!form.day) nextErrors.day = "Day is required.";
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setResultLink("");
    setCopied(false);

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const message = form.message.trim() || defaultMessages[form.day] || "Happy Valentine's Day!";

    try {
      setIsSubmitting(true);
       
      const { data } = await createValentine({
        senderName: form.senderName.trim(),
        receiverName: form.receiverName.trim(),
        day: form.day,
        message,
      });
      if (data?.link) {
        setResultLink(`${window.location.origin}${data.link}`);
      }
    } catch (err) {
      setSubmitError("Failed to create your Valentine link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async () => {
    if (!resultLink) return;
    try {
      await navigator.clipboard.writeText(resultLink);
      setCopied(true);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-secondary">
      <FloatingHearts />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-14">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-primary shadow-sm ring-1 ring-primary/10 transition hover:bg-white"
        >
          <span className="text-base">?</span>
          Back to Home
        </button>

        <div className="rounded-3xl border border-primary/10 bg-white/70 backdrop-blur-md shadow-xl shadow-primary/20">
          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl font-heading text-primary-700">
                Create Your Valentine
              </h1>
              <p className="mt-2 text-sm sm:text-base font-body text-primary-600/80">
                Fill in the details to generate a shareable Valentine link.
              </p>
            </div>

            {resultLink ? (
              <div className="space-y-6 text-center">
                <div className="rounded-2xl border border-primary/15 bg-secondary/70 px-6 py-5">
                  <p className="text-sm font-body text-primary-700">Your link is ready</p>
                  <p className="mt-2 break-all text-base font-semibold text-primary-800">
                    {resultLink}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:bg-primary-600"
                  >
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setResultLink("");
                      setForm(initialForm);
                    }}
                    className="rounded-full border border-primary/30 bg-white/80 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white"
                  >
                    Create Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-primary-700">
                      Sender Name *
                    </label>
                    <input
                      type="text"
                      name="senderName"
                      value={form.senderName}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="mt-2 w-full rounded-xl border border-primary/20 bg-white/90 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                    {errors.senderName && (
                      <p className="mt-2 text-xs text-primary-600">{errors.senderName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-700">
                      Receiver Name *
                    </label>
                    <input
                      type="text"
                      name="receiverName"
                      value={form.receiverName}
                      onChange={handleChange}
                      placeholder="Their name"
                      className="mt-2 w-full rounded-xl border border-primary/20 bg-white/90 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    />
                    {errors.receiverName && (
                      <p className="mt-2 text-xs text-primary-600">{errors.receiverName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-700">
                      Day *
                    </label>
                    <select
                      name="day"
                      value={form.day}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-primary/20 bg-white/90 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                    >
                      <option value="" disabled>
                        Select day
                      </option>
                      {dayOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.day && (
                      <p className="mt-2 text-xs text-primary-600">{errors.day}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700">
                    Message (optional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write your message... (optional)"
                    className="mt-2 w-full rounded-xl border border-primary/20 bg-white/90 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                  />
                  <p className="mt-2 text-xs text-primary-600/80">
                    If left empty, we will use a sweet default message for the selected day.
                  </p>
                </div>

                {submitError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {submitError}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Creating..." : "Create Valentine Link"}
                  </button>
                  <p className="text-xs text-primary-600/70">
                    Fields marked with * are mandatory.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateValentine;
