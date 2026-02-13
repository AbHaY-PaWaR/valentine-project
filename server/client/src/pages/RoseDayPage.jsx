import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { Heart, Sparkles } from 'lucide-react';

// --- Configuration & Constants ---

const DEMO_DATA = {
  userName: "Rahul",
  loverName: "Priya",
  note: "This rose carries all my feelings for you. Happy Rose Day 🌹❤️"
};

const QUOTES = [
  "Love is the flower you've got to let grow.",
  "A single rose can be my garden... a single friend, my world.",
  "My love is like a red, red rose that's newly sprung in June.",
  "Life is the flower for which love is the honey.",
  "You are the rose that makes my garden beautiful."
];

// --- Sub-Components ---

const FloatingTeddy = () => (
  <motion.div
    className="relative w-40 h-40 mx-auto mb-6"
    animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Using a high-quality 3D style illustration URL */}
    <img 
      src="https://cdn3d.iconscout.com/3d/premium/thumb/teddy-bear-holding-heart-5360064-4491752.png" 
      alt="Cute Teddy"
      className="w-full h-full object-contain drop-shadow-2xl"
    />
    <motion.div 
      className="absolute -top-2 -right-2"
      animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
    </motion.div>
  </motion.div>
);

const QuoteSection = () => {
  const [index, setIndex] = useState(0);

  const nextQuote = () => {
    setIndex((prev) => (prev + 1) % QUOTES.length);
  };

  return (
    <div className="mt-8">
      <div className="h-24 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-rose-900/80 text-center font-medium italic text-sm md:text-base"
          >
            "{QUOTES[index]}"
          </motion.p>
        </AnimatePresence>
      </div>
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={nextQuote}
        className="mt-2 px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-semibold shadow-lg shadow-rose-500/30 flex items-center gap-2 mx-auto"
      >
        Next 🌹
      </motion.button>
    </div>
  );
};

// --- Main Component ---

const RoseDayPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [init, setInit] = useState(false);

  // Initialize Particles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Fetch Data with Fallback Logic
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setData(DEMO_DATA);
        return;
      }

      try {
        // Simulate API call - Replace with actual fetch
        // const response = await fetch(`/api/roseday/${id}`);
        // if (!response.ok) throw new Error("Failed");
        // const result = await response.json();
        
        // Simulating failure/empty for this demo to show fallback logic works:
        throw new Error("Simulated API Fail for Fallback"); 

        /* if (result && result.userName && result.loverName) {
           setData(result);
        } else {
           setData(DEMO_DATA);
        }
        */
      } catch (error) {
        console.warn("API Error or Invalid ID, using demo data.");
        setData(DEMO_DATA);
      }
    };

    fetchData();
  }, [id]);

  // Particle Configuration (Petal Rain)
  const particlesOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: { events: { onClick: { enable: true, mode: "push" } } },
    particles: {
      color: { value: ["#ff0000", "#ff4d4d", "#ff99cc"] },
      move: {
        direction: "bottom",
        enable: true,
        outModes: { default: "out" },
        random: true,
        speed: 2,
        straight: false,
      },
      number: { density: { enable: true, area: 800 }, value: 30 },
      opacity: { value: 0.7 },
      shape: { type: "circle" }, // Simulating petals with soft circles
      size: { value: { min: 3, max: 8 } },
      wobble: { enable: true, distance: 10, speed: 10 } // Adds "falling leaf" effect
    },
    detectRetina: true,
  };

  if (!data) return null; // Or a simple spinner

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-rose-950 via-red-900 to-pink-900 flex items-center justify-center p-4">
      
      {/* Inject Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Playfair+Display:wght@400;700&display=swap');
        `}
      </style>

      {/* Background Particles */}
      {init && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 z-0"
          options={particlesOptions}
        />
      )}

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] shadow-2xl shadow-rose-900/50 p-6 md:p-8 overflow-hidden"
      >
        {/* Decorative Glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-rose-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl pointer-events-none" />

        {/* Content Container */}
        <div className="flex flex-col items-center text-center relative z-20">
          
          <FloatingTeddy />

          {/* Names Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-5xl font-[Dancing Script] text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200 drop-shadow-md">
              {data.userName} 
              <span className="text-red-500 mx-2 text-3xl align-middle">❤</span> 
              {data.loverName}
            </h1>
          </motion.div>

          {/* Separator */}
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent rounded-full mb-6 opacity-50" />

          {/* Note Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="w-full bg-white/5 rounded-2xl p-6 border border-white/10"
          >
            <p className="font-[Playfair Display] text-rose-100 text-lg leading-relaxed">
              {data.note}
            </p>
          </motion.div>

          {/* Quotes Section */}
          <QuoteSection />
          
        </div>
      </motion.div>
      
      {/* Footer Branding (Optional) */}
      <div className="absolute bottom-4 text-white/30 text-xs font-light tracking-widest">
        VALENTINE WEEK SPECIAL
      </div>
    </div>
  );
};

export default RoseDayPage;