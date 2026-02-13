import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import teddyAnimation from "../../assets/lottie/teddy.lottie";
import bunnyAnimation from "../../assets/lottie/Squeeze bunny _(.lottie";
import kawaiiAnimation from "../../assets/lottie/Kawaii animals giving love.lottie";
import CouplebearAnimation from "../../assets/lottie/Couple Bear Valentine.lottie";
import TeddybearAnimation from "../../assets/lottie/Fluent Emoji Teddy Bear.lottie";
import Teddybear2Animation from "../../assets/lottie/Teddy Bear.lottie";
import FloatingHearts from "../particles/FloatingHearts";

const DEDICATIONS = [
  "You are the softest part of my day. Happy Teddy Day. 🧸💞",
  "This teddy carries all my hugs when I cannot be there. 🤗",
  "Cuddly, warm, and full of love, just like you. 💖",
  "Whenever you miss me, hold this teddy close. 🧸",
  "Happy Teddy Day, my love. I may not be a teddy, but I will always be the one you can hug when you need comfort. 💝",
  "I promise to be your soft place in every hard moment. 🌙",
];

const LOTTIES = [
  TeddybearAnimation,
  Teddybear2Animation,
  teddyAnimation,
  bunnyAnimation,
  kawaiiAnimation,
  CouplebearAnimation,
];

const Teddyday = ({ data }) => {
  const safeData = useMemo(
    () => ({
      senderName: data?.senderName || "Someone",
      receiverName: data?.receiverName || "Someone Special",
      message:
        data?.message ||
        "This teddy is a promise of comfort, love, and endless cuddles. 🧸💗",
    }),
    [data]
  );

  const [quoteIndex, setQuoteIndex] = useState(0);

  const handleNext = () => {
    setQuoteIndex((prev) => (prev + 1) % LOTTIES.length);
  };

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-br from-rose-400 via-red-700 to-amber-600">
      <FloatingHearts />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,228,230,0.18),_transparent_55%)]" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-[2.8rem] border border-rose-200/20 bg-white/10 p-8 text-center shadow-2xl shadow-rose-950/40 backdrop-blur-xl sm:p-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`top-lottie-${quoteIndex}`}
                  className="w-56 sm:w-72"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <DotLottieReact
                    src={LOTTIES[quoteIndex % LOTTIES.length]}
                    loop
                    autoplay
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 rounded-2xl bg-rose-50/90 p-5 text-rose-950">
              <p className="text-3xl font-accent font-semibold sm:text-4xl">
                {safeData.senderName} <span className="mx-1">&lt;</span>
                {safeData.receiverName}
              </p>
              <p className="mt-2 text-base font-serif sm:text-lg">
                {safeData.message}
              </p>
            </div>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-base italic text-rose-100/90 sm:text-lg"
                >
                  {DEDICATIONS[quoteIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="mt-6 w-full rounded-full bg-rose-50/90 py-3 font-semibold tracking-wide text-rose-950 shadow-xl"
            >
              Next
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Teddyday;
