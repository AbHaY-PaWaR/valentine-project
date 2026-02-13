import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import roseAnimation from "../../assets/lottie/rose.lottie";
import Lottie from "lottie-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ROSE_QUOTES = [
  "Every rose blooms for love 🌹",
  "Some feelings are best expressed with a rose 💐",
  "This Rose Day is special because of you 💖",
];

export default function RoseDay({ data }) {
  const safeData = useMemo(
    () => ({
      senderName: data?.senderName || "Someone",
      receiverName: data?.receiverName || "Someone Special",
      message:
        data?.message ||
        "This rose carries all my feelings for you. Happy Rose Day. 🌹💌",
    }),
    [data]
  );

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [init, setInit] = useState(false);

  const hapticTap = (duration = 40) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(duration);
    }
  };

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  return (
    <div className="relative min-h-screen w-screen bg-red-200 flex items-center justify-center">
      {init && (
        <Particles
          className="absolute inset-0"
          options={{
            particles: {
              number: { value: 45 },
              color: { value: ["#ff2d55", "#ff6b81", "#be123c"] },
              shape: { type: "circle" },
              size: { value: { min: 6, max: 12 } },
              opacity: { value: 0.85 },
              move: {
                enable: true,
                speed: 1.2,
                direction: "bottom",
                outModes: "out",
              },
            },
          }}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          relative z-10
          w-[92%] max-w-md
          rounded-[2.8rem]
          bg-gradient-to-br from-rose-200/90 to-pink-100/90
          backdrop-blur-xl
          shadow-[0_0_90px_rgba(255,0,80,0.45)]
          px-7 py-10
          text-center
        "
      >
        <motion.img
          src="https://img.freepik.com/premium-vector/sticker-rose-flower-love-vector-illustration-vintage-graphic-isolated-romantic-plant_746614-343.jpg?w=2000"
          alt="Rose Day"
          className="w-44 mx-auto mb-6 select-none rounded-full"
          animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />

       

          <div className="relative flex flex-row">
            <span className="italic text-3xl font-accent bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            {safeData.senderName}
          </span>
          <div className="w-5 h-5 sm:w-44 sm:h-44">
                    <DotLottieReact src={roseAnimation} loop autoplay />
                  </div>
          <span className="italic text-3xl font-accent bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
            {safeData.receiverName}
          </span>
          </div>
        

       <div className="w-fit min-h-28 rounded-xl p-5 bg-red-100">
         <p className="text-rose-950 font-mono text-base sm:text-lg leading-relaxed mb-6 px-2">
          {safeData.message}
        </p>
       </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={quoteIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="italic font-serif p-4 text-rose-700 mb-6"
          >
            {ROSE_QUOTES[quoteIndex]}
          </motion.p>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            hapticTap(40);
            setQuoteIndex((prev) => (prev + 1) % ROSE_QUOTES.length);
          }}
          className="
            w-full py-3 rounded-full
            bg-gradient-to-r from-red-600 via-rose-500 to-pink-600
            text-white font-semibold tracking-wide
            shadow-xl
          "
        >
          Next
        </motion.button>
      </motion.div>
    </div>
  );
}
