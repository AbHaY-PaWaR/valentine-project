import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FloatingHearts from "../particles/FloatingHearts";
import waitingBearGif from "../../assets/gif-img/waitingbear.gif";
import valentineGif from "../../assets/gif-img/valentine.gif";

const DEFAULT_MESSAGE =
  "Happy Valentine's Day! You are my heart's favorite. \u{1F498}\u2728";

const DEDICATIONS = [
  "You are my favorite hello and my hardest goodbye. \u{1F49E}",
  "Every heartbeat of mine says your name. \u{1F493}",
  "With you, every day feels like Valentine's Day. \u{1F339}",
  "I choose you, today and always. \u{1F48D}",
];

const Valentineday = ({ data }) => {
  const safeData = useMemo(
    () => ({
      receiverName: data?.receiverName || "Love",
      message: data?.message || DEFAULT_MESSAGE,
    }),
    [data]
  );

  const messages = useMemo(() => [...DEDICATIONS], []);

  const [stage, setStage] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [hasClickedNo, setHasClickedNo] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const areaRef = useRef(null);
  const noButtonRef = useRef(null);

  const moveNoButton = () => {
    if (!areaRef.current || !noButtonRef.current) return;

    const area = areaRef.current.getBoundingClientRect();
    const btn = noButtonRef.current.getBoundingClientRect();
    const maxX = Math.max(0, area.width - btn.width);
    const maxY = Math.max(0, area.height - btn.height);

    let nextX = 0;
    let nextY = 0;
    let attempts = 0;

    do {
      nextX = Math.random() * maxX;
      nextY = Math.random() * maxY;
      attempts += 1;
    } while (
      attempts < 8 &&
      Math.hypot(nextX - noPos.x, nextY - noPos.y) < 60
    );

    setNoPos({ x: nextX, y: nextY });
  };

  useLayoutEffect(() => {
    if (!areaRef.current || !noButtonRef.current) return;
    const area = areaRef.current.getBoundingClientRect();
    const btn = noButtonRef.current.getBoundingClientRect();
    const maxX = Math.max(0, area.width - btn.width);
    const maxY = Math.max(0, area.height - btn.height);
    const x = Math.min(maxX, Math.max(0, area.width / 2 + 80));
    const y = Math.min(maxY, Math.max(0, area.height / 2 - btn.height / 2));
    setNoPos({ x, y });
  }, []);

  const handleNoClick = () => {
    setHasClickedNo(true);
    moveNoButton();
  };

  const handleNoHover = () => {
    if (!hasClickedNo) return;
    moveNoButton();
  };

  const handleNextMessage = () =>
    setMessageIndex((prev) => (prev + 1) % messages.length);

  return (
    <div
      ref={areaRef}
      className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-primary-50 via-secondary to-primary-200"
    >
      <FloatingHearts />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,228,230,0.45),_transparent_60%)]" />

      <div className="relative z-10 mx-auto flex h-screen max-w-4xl items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" min-h-[50vh] rounded-[2.8rem] border border-primary/15 bg-white/80 p-8 text-center shadow-2xl shadow-primary/20 backdrop-blur-xl sm:p-12"
        >
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="valentine-intro"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="min-h-[50vh]"
              >
                <h1 className="text-3xl font-heading text-primary-700 sm:text-5xl">
                  <span className="block">
                    Hey{" "}
                    <span className="font-accent text-primary-900">
                      {safeData.receiverName},
                    </span>
                  </span>
                  <span className="block">
                    will U be my Valentine
                    <br /> {"\u{1F498}\u{1F48C}"}
                  </span>
                </h1>

                <div className="relative mt-10 h-[35vh] w-full">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStage(1)}
                      className="rounded-full bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30"
                    >
                      Yes
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div
                key="valentine-wait"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="min-h-[55vh]"
              >
                <div className="flex justify-center">
                  <motion.img
                    src={waitingBearGif}
                    alt="Waiting bear"
                    className="w-64 sm:w-72"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    loading="eager"
                  />
                </div>

                <p className="mt-6 text-3xl font-accent text-primary-600 sm:text-4xl">
                  I know it {"\u2764\uFE0F\u{1F496}"}
                </p>
                <p className="mt-4 text-sm font-body text-primary-700/80 sm:text-base">
                  You just made my whole Valentine's Day brighter. {"\u2728\u{1F498}"}
                </p>

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStage(2)}
                  className="mt-8 w-full rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 sm:w-auto"
                >
                  Note for U
                </motion.button>
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div
                key="valentine-note"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="min-h-[50vh]"
              >
                <div className="flex justify-center">
                  <motion.img
                    src={valentineGif}
                    alt="Valentine"
                    className="w-60 sm:w-80"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    loading="eager"
                  />
                </div>

                <div className="mt-6 rounded-3xl border border-primary/30 bg-white/90 px-6 py-5 text-primary-700 shadow-lg shadow-primary/10">
                  <p className="text-base font-mono sm:text-lg">
                    {safeData.message}
                  </p>
                </div>

                <div className="mt-5 rounded-3xl border border-primary/20 bg-secondary/70 px-6 py-5 text-primary-700">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`val-msg-${messageIndex}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="text-base font-body sm:text-lg"
                    >
                      {messages[messageIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextMessage}
                  className="mt-6 w-full rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 sm:w-auto"
                >
                  Next
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {stage === 0 && (
        <motion.button
          ref={noButtonRef}
          onClick={handleNoClick}
          onMouseEnter={handleNoHover}
          animate={{ left: noPos.x, top: noPos.y }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="absolute z-20 rounded-full border-2 border-primary/40 bg-white/90 px-10 py-4 text-base font-semibold text-primary-700 shadow-lg shadow-primary/10"
        >
          No
        </motion.button>
      )}
    </div>
  );
};

export default Valentineday;
