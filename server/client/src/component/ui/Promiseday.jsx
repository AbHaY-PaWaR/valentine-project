import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Heart } from "lucide-react";
import bunnyAnimation from "../../assets/lottie/Squeeze bunny _(.lottie";
import teddyAnimation from "../../assets/lottie/Teddy Bear.lottie";
import FloatingHearts from "../particles/FloatingHearts";

const DEFAULT_MESSAGE =
  "On Promise Day, I promise to stand by you and keep you safe in my heart. 💞";

const DEDICATIONS = [
  "I promise to listen, even in silence, and love you more every day. 💖",
  "I promise to be your calm in every storm and your smile in every dawn. 🌅",
  "I promise to keep choosing you, in every season of life. 💍",
  "I promise to respect your dreams and grow with you. 🌷",
];

const Promiseday = ({ data }) => {
  const safeData = useMemo(
    () => ({
      senderName: data?.senderName || "Someone",
      receiverName: data?.receiverName || "You",
      message: data?.message || DEFAULT_MESSAGE,
    }),
    [data]
  );

  const [stage, setStage] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = useMemo(() => {
    if (data?.message) {
      return [data.message, ...DEDICATIONS];
    }
    return [DEFAULT_MESSAGE, ...DEDICATIONS];
  }, [data?.message]);

  const handleContinue = () => setStage(1);
  const handleReveal = () => setStage(2);
  const handleNext = () => {
    setMessageIndex((prev) => (prev + 1) % messages.length);
  };

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-red-300">

        {/* FloatingHearts */}
        <FloatingHearts />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.3),_transparent_55%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-slate-100 rounded-[2.5rem] border border-white/15 bg-black/5 p-8 text-center shadow-2xl shadow-indigo-950/40 backdrop-blur-xl sm:p-12"
        >
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="promise-intro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <div><span className="text-primary text-2xl sm:text-3xl font-mono">Promise Day 💝</span></div>
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/15"
                >
                  
                  <Heart className="h-10 w-10 text-rose-500" fill="currentColor" />
                </motion.div>

                <p className="mt-6 text-lg font-semibold font-mono text-primary-500 sm:text-xl">
                  Someone made a promise for you 💞
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleContinue}
                  className="mt-8 w-full rounded-full bg-primary py-3 text-xl font-bold tracking-wide text-white shadow-lg"
                >
                  Continue
                </motion.button>
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div
                key="promise-reveal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex justify-center">
                  <motion.div
                    className="w-56 sm:w-72"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <DotLottieReact src={bunnyAnimation} loop autoplay />
                  </motion.div>
                </div>

                <p className="mt-6 text-lg font-semibold text-primary-500 font-mono sm:text-xl">
                  Tap to see the promise 💌
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleReveal}
                  className="mt-8 w-full rounded-full border border-white/40 bg-white/10 py-3 font-semibold tracking-wide text-black shadow-lg transition-colors hover:bg-primary hover:text-pink-100"
                >
                  Tap
                </motion.button>
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div
                key="promise-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex justify-center">
                  <motion.div
                    className="w-56 sm:w-72"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <DotLottieReact src={teddyAnimation} loop autoplay />
                  </motion.div>
                </div>

                <div className="mt-6 rounded-2xl bg-white/85 p-5 text-indigo-950">
                  <p className="text-xl font-accent text-red-500 font-bold sm:text-2xl">
                    {safeData.senderName} <span className="mx-1">&lt;</span>
                    {safeData.receiverName}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                     
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="mt-2 text-base font-mono sm:text-lg"
                    >
                      {safeData.message}
                    </motion.p>
                  </AnimatePresence>
                </div>

                 <AnimatePresence mode="wait">
                    <motion.p
                      key={`promise-msg-${messageIndex}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 text-base font-serif sm:text-lg"
                    >
                      {messages[messageIndex]}
                    </motion.p>
                  </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNext}
                  className="mt-8 w-full rounded-full text-black/85 bg-white/85 py-3 font-semibold tracking-wide shadow-lg"
                >
                  Next
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Promiseday;
