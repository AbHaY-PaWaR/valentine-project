import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { HandHeart, Heart, HeartHandshake } from "lucide-react";
import kawaiiAnimation from "../../assets/lottie/Kawaii animals giving love.lottie";
import huggingGif from "../../assets/gif-img/hugging.gif";
import FloatingHearts from "../particles/FloatingHearts";

const DEFAULT_MESSAGE =
  "A hug for you today and every day. I am always with you in spirit. 🤗💞";

const DEDICATIONS = [
  "Sending you a hug that lasts all day long. 🤗",
  "May this hug wrap you in warmth and calm. 🫶",
  "Whenever you feel low, remember I am right beside you. 💗",
  "This hug carries all my love, softly and surely. 💖",
];

const Hugday = ({ data }) => {
  const safeData = useMemo(
    () => ({
      receiverName: data?.receiverName || "You",
      message: data?.message || " 🌹I Love U so much ❤️  🤗",
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
          className="w-full rounded-[2.8rem] border  border-white/20 bg-white/75 p-8 text-center shadow-2xl shadow-rose-950/30 backdrop-blur-xl sm:p-12"
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
                <div>
                  <h1 className="flex items-center justify-center gap-2">
                    <span className="text-2xl text-red-600 font-bold font-accent">Hug Day</span>
                    <HandHeart className="h-6 w-6 text-red-500" />
                  </h1>
                </div>
                <div className="flex justify-center">
                  <motion.div
                    className="w-40 sm:w-40"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <DotLottieReact src={kawaiiAnimation} loop autoplay />
                  </motion.div>
                </div>

                <p className="mt-6 text-lg font-semibold text-red-400 font-mono sm:text-xl">
                  Sometimes all I want is to hold you closer, 🤗
                </p>

                <div className="mt-4 flex items-center justify-center gap-2 text-rose-100">
                  <span className="text-xl font-semibold text-red-500 font-accent italic sm:text-2xl">
                    {safeData.receiverName}
                  </span>
                  <Heart className="h-6 w-6 text-rose-500" fill="currentColor" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={nextStage}
                  className="mt-8 w-full rounded-full bg-white/50 py-3 font-semibold tracking-wide text-red-400 shadow-lg"
                >
                  Come closer
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
                    className="w-80 sm:w-72"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <DotLottieReact src={kawaiiAnimation} loop autoplay />
                  </motion.div>
                </div>

                <div className="mt-6 flex items-center font-mono justify-center gap-2 text-xl font-semibold text-red-400 sm:text-2xl">
                  <span>Almost there 💞</span>
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
                  className="mt-8 w-full rounded-full bg-white/50 py-3 font-semibold tracking-wide text-red-500 shadow-lg"
                >
                  Hug me
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
                    className="w-96 sm:w-80"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                  >
                    <img
                      src={huggingGif}
                      alt="Hugging"
                      className="h-auto w-full"
                      loading="eager"
                    />
                  </motion.div>
                </div>

                <p className="mt-6 text-lg font-semibold text-red-500 font-mono sm:text-xl">
                  This hug is from me to you 🤗
                  <Heart className="ml-2 inline-block h-5 w-5 text-rose-500" fill="currentColor" />
                </p>
                <p className="mt-3 text-base text-rose-400 sm:text-lg">
                  Whenever you feel low, remember I am with you 💗
                  <span className="ml-2 inline-flex gap-1 text-rose-400">
                    <Heart className="h-4 w-4" fill="currentColor" />
                    <Heart className="h-4 w-4" fill="currentColor" />
                  </span>
                </p>

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={nextStage}
                  className="mt-8 w-full rounded-full bg-red-600 bg-white/50 py-3 font-semibold tracking-wide text-black/80 shadow-lg"
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

                <div className="rounded-2xl bg- p-5 m-5 text-rose-950">
                  
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

                 <div className="rounded-2xl bg-white/90 p-5 text-rose-950">
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
                  className="mt-8 w-full rounded-full bg-white/50 py-3 font-semibold tracking-wide text-black/80 shadow-lg"
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

export default Hugday;
