import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { HandHeart, Heart, HeartHandshake } from "lucide-react";
import kawaiiAnimation from "../../assets/lottie/Kawaii animals giving love.lottie";
import huggingGif from "../../assets/gif-img/hugging.gif";
import WaitingGif from "../../assets/gif-img/kisses.gif"
import WaitingBearGif from "../../assets/gif-img/waitingbear.gif"
import KissGif from "../../assets/gif-img/kiss.gif"
import FloatingHearts from "../particles/FloatingHearts";

const DEFAULT_MESSAGE =
  "A kiss for you today and every day. Each one carries all my love. \u{1F48B}\u{1F496}";

const DEDICATIONS = [
  "Sending you kisses that linger long after the moment. \u{1F48B}",
  "May every kiss remind you how deeply I care. \u{1F49E}",
  "Whenever you feel low, remember my love is with you. \u{1F497}",
  "Each kiss is a promise to keep you close, always. \u{1F498}",
];

const Kissday = ({ data }) => {
  const safeData = useMemo(
    () => ({
      receiverName: data?.receiverName || "You",
      message: data?.message || DEFAULT_MESSAGE,
    }),
    [data]
  );

  const messages = useMemo(() => {
    if (data?.message) return [data.message, ...DEDICATIONS];
    return [DEFAULT_MESSAGE, ...DEDICATIONS];
  }, [data?.message]);

  const [stage, setStage] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const nextStage = () => setStage((prev) => Math.min(prev + 1, 3));
  const handleNextMessage = () =>
    setMessageIndex((prev) => (prev + 1) % messages.length);

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-rose-300 to-red-400">

        {/* FloatingHearts */}
        <FloatingHearts />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,228,230,0.35),_transparent_60%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-[2.8rem] border bg-slate-100 border-white/20 bg-white/10 p-8 text-center shadow-2xl shadow-rose-950/30 backdrop-blur-xl sm:p-12"
        >
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="hug-intro"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                
                <div className="flex justify-center">
                  <motion.div
                    className="w-40 sm:w-40"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={WaitingGif}
                      alt="Hugging"
                      className="h-auto w-full"
                      loading="eager"
                    />
                  </motion.div>
                </div>

                <p className="mt-6 text-lg font-semibold text-primary font-mono sm:text-xl">
                  Sending you a million kisses, 
                </p>

                <div className="mt-4 flex items-center justify-center gap-2 text-rose-100">
                  <span className="text-3xl font-bold text-red-500 font-accent italic sm:text-5xl">
                    {safeData.receiverName} {"\u{1F48B}"}
                  </span>
                  
                </div>

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={nextStage}
                  className="mt-8 w-full rounded-full bg-white/30 py-3 font-bold tracking-wide text-black/70 shadow-lg"
                >
                  Catch them {"\u{1F48B}"}
                </motion.button>
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div
                key="hug-almost"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex justify-center">
                  <motion.div
                    className="w-50 sm:w-72"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <img
                      src={WaitingBearGif}
                      alt="Hugging"
                      className="h-auto w-full"
                      loading="eager"
                    />
                  </motion.div>
                </div>

                <div className="mt-6 flex items-center font-mono justify-center gap-2 text-xl font-semibold text-primary sm:text-2xl">
                  <span>Almost reaching you... {"\u{1F49E}"}</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="text-rose-400"
                  >
                    <Heart className="h-6 w-6" fill="currentColor" />
                  </motion.span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={nextStage}
                  className="mt-8 w-full rounded-full bg-white/30 py-3 font-bold tracking-wide text-black/70 shadow-lg"
                >
                  Kiss now
                </motion.button>
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div
                key="hug-deliver"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex justify-center">
                  <motion.div
                    className="w-60 sm:w-80"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <img
                      src={KissGif}
                      alt="Hugging"
                      className="h-auto w-full"
                      loading="eager"
                    />
                  </motion.div>
                </div>

                <p className="mt-6 text-lg font-semibold text-primary font-mono sm:text-xl">
                  This kiss is from me to you {"\u{1F48B}"}
                </p>
                <p className="mt-3 text-base text-black/70 sm:text-lg">
                  Whenever you feel low, remember I am with you {"\u{1F497}"}
                  <span className="ml-2 inline-flex gap-1 text-primary">
                    <Heart className="h-4 w-4" fill="currentColor" />
                    
                  </span>
                </p>

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={nextStage}
                  className="mt-8 w-full rounded-full bg-red-600 bg-white/30 py-3 font-semibold tracking-wide text-black/80 shadow-lg"
                >
                  Read note
                </motion.button>
              </motion.div>
            )}

            {stage === 3 && (
              <motion.div
                key="hug-note"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-4 flex items-center justify-center gap-2 text-red-500">
                  <HeartHandshake className="h-6 w-6" />
                  <motion.span
                    animate={{ letterSpacing: ["0.02em", "0.08em", "0.02em"] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="text-xl font-semibold uppercase sm:text-2xl"
                  >
                    To <span className="font-accent">{safeData.receiverName}</span>
                  </motion.span>
                </div>

                <div className="rounded-2xl bg-white/90 p-5 m-5 text-rose-950">
                  
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="text-base font-serif sm:text-lg"
                    >
                      {safeData.message}
                    </motion.p>
              
                </div>

                 <div className="rounded-2xl bg-white/40 p-5 text-rose-950">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`hug-msg-${messageIndex}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="text-base font-mono sm:text-lg"
                    >
                      {messages[messageIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNextMessage}
                  className="mt-8 w-full rounded-full bg-red-600 bg-white/30 py-3 font-semibold tracking-wide text-black/80 shadow-lg"
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

export default Kissday;
