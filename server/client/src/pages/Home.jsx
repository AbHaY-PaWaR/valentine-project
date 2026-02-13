import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Sparkles } from "lucide-react";
import FloatingHearts from "../component/particles/FloatingHearts";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen bg-red-200 min-h-screen overflow-hidde  ">
      {/* Floating Hearts Background */}
      <FloatingHearts />
  
      {/* Hero Section */}
      <div className="relative w-full z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated Heart Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <Heart className="w-24 h-24 text-primary fill-primary animate-pulse" />
              <Sparkles className="w-8 h-8  text-accent absolute -top-2 -right-2 animate-float" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold  tracking-tight text-primary-900 mb-6"
            data-testid="hero-heading"
          >
            Celebrate Love,
            <br />
            <span className="font-accent text-6xl md:text-8xl text-primary">
              One Day at a Time
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-bas md:text-lg text-primary-700 max-w-2xl mx-auto mb-12 leading-relaxed"
            data-testid="hero-subtitle"
          >
            Create magical Valentine Week surprises for your loved ones. Share
            beautiful, personalized messages that will make their heart skip a
            beat 💕
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => navigate("/create")}
              className="group bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-medium shadow-lg hover:shadow-primary/25 hover:scale-105 flex items-center gap-2"
              data-testid="create-surprise-btn"
            >
              Create Your Valentine Link
              <Heart className="w-5 h-5 group-hover:fill-white" />
            </button>

          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20 flex justify-center gap-8 flex-wrap"
          >
            {["🌹", "💍", "🍫", "🧸", "🤗", "💋", "❤️"].map((emoji, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="text-4xl hover:scale-125 cursor-pointer"
                whileHover={{ scale: 1.3, rotate: 10 }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-100/50 via-transparent to-transparent pointer-events-none" />

      <footer className="relative z-10 border-t border-white/40 bg-white/40 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-primary-700 sm:flex-row">
          <div className="font-medium">
            Created by Abhay · UID: 1253394105
          </div>
          <button
            onClick={() => navigate("/special")}
            className="rounded-full border border-primary/30 bg-white/70 px-4 py-2 font-semibold text-primary transition hover:bg-white"
          >
            Special Page
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
