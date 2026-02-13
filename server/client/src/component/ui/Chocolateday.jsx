import { useMemo, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Lottie from "lottie-react";
import confettiAnimation from "../../assets/lottie/confetti.json";
import teddyAnimation from "../../assets/lottie/teddy.lottie";
import bunnyAnimation from "../../assets/lottie/Squeeze bunny _(.lottie";
import kawaiiAnimation from "../../assets/lottie/Kawaii animals giving love.lottie";
import giftboxAnimation from "../../assets/lottie/giftbox animation.lottie";
import chocolateImg from "../../assets/img/chocolate.jpg";
import { AnimatePresence, motion } from "framer-motion";
import FloatingHearts from "../particles/FloatingHearts";

const DEDICATIONS = [
  "Chocolate is sweet, but your smile is sweeter. \u{1F36B}\u{1F496}",
  "Every bite reminds me of you - warm, rich, and comforting. \u{1F36B}\u{2728}",
  "Here's to little treats and big feelings. Happy Chocolate Day! \u{1F36B}\u{1F389}",
  "May today melt the distance and wrap you in sweetness. \u{1F49E}",
];

const LOTTIES = [teddyAnimation, bunnyAnimation, kawaiiAnimation];

const Chocolateday = ({ data }) => {
  const safeData = useMemo(
    () => ({
      senderName: data?.senderName || "Someone",
      receiverName: data?.receiverName || "Someone Special",
      message: data?.message || "This chocolate is a tiny piece of my heart \u{1F496}, sweet and just for you. \u{1F36B}",
    }),
    [data]
  );

  const [unwrapped, setUnwrapped] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const handleNext = () => {
    setQuoteIndex((prev) => (prev + 1) % DEDICATIONS.length);
  };

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-br from-amber-950 via-rose-950 to-stone-900">
      {/* FloatingHearts */}
      <FloatingHearts />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,235,205,0.18),_transparent_55%)]" />
      {unwrapped && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <Lottie
            animationData={confettiAnimation}
            loop
            className="h-full w-full"
          />
        </div>
      )}

      <div className="relative z-20 mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-[2.8rem] border border-amber-200/20 bg-white/10 p-8 text-center shadow-2xl shadow-amber-950/40 backdrop-blur-xl sm:p-12"
        >
          <AnimatePresence mode="wait">
            {!unwrapped ? (
              <motion.div
                key="gift"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex justify-center">
                  <div className="w-56 sm:w-72">
                    <DotLottieReact src={giftboxAnimation} loop autoplay />
                  </div>
                </div>

                <div className="p-4">
                  <span className="text-amber-100 text-xl sm:text-2xl font-serif">
                    Something sweet for you {"\u{1F36B}\u{1F49D}"}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUnwrapped(true)}
                  className="
                    w-1/2 py-3 rounded-full
                    bg-gradient-to-r from-amber-600 via-rose-500 to-pink-500
                    text-amber-50 font-semibold tracking-wide
                    shadow-xl
                    font-heading
                  "
                >
                  Unwrap {"\u{1F381}\u{1F36B}"}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="chocolate"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex justify-center">
                  <motion.img
                    src={chocolateImg}
                    alt="Chocolate"
                    className="w-56 sm:w-52 rounded-3xl shadow-[0_25px_60px_rgba(60,30,10,0.5)]"
                    initial={{ scale: 0.9, rotate: -2 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 120 }}
                  />
                </div>

                <div className="mt-6 rounded-2xl bg-amber-50/90 p-5 text-amber-950">
                  <p className="text-sm sm:text-base font-semibold">
                    {safeData.senderName} {"\u2764\uFE0F"} {safeData.receiverName}
                  </p>
                  <p className="mt-2 text-base sm:text-lg font-serif">
                    {safeData.message}
                  </p>
                </div>

                <div className="mt-6 grid items-center gap-4 sm:grid-cols-[1fr_160px]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={quoteIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-amber-100/90 italic text-base sm:text-lg"
                    >
                      {DEDICATIONS[quoteIndex]}
                    </motion.p>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`lottie-${quoteIndex}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="mx-auto w-42 sm:w-46"
                    >
                      <DotLottieReact
                        src={LOTTIES[quoteIndex % LOTTIES.length]}
                        loop
                        autoplay
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="
                    mt-6 w-full py-3 rounded-full
                    bg-gradient-to-r from-amber-600 via-rose-500 to-pink-500
                    text-white font-semibold tracking-wide
                    shadow-xl
          
                  "
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

export default Chocolateday;
