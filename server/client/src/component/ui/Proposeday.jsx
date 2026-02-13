import React, { useMemo, useState } from "react";
import Lottie from "lottie-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { HeartHandshake } from "lucide-react";
import { BackgroundBeams } from "./BackgroundBeams";
import confettiAnimation from "../../assets/lottie/confetti.json";
import teddyAnimation from "../../assets/lottie/teddy.lottie";
import roseAnimation from "../../assets/lottie/rose.lottie";

const NO_MESSAGES = [
  "Hey, give it a chance 💖",
  "Come on, you know I care 💘",
  "That is not a real no 🫶",
  "Let me try again 🌹",
  "I will wait for your yes 💍",
];

const DEFAULT_MESSAGE = "Will you be mine forever? 💍💞";

const Proposeday = ({ data }) => {
  const receiverName = data?.receiverName || "Someone Special";
  const senderName = data?.senderName || "Someone";
  const message = data?.message || "I Love U 💖"

  const [sliderValue, setSliderValue] = useState(0);
  const [noIndex, setNoIndex] = useState(0);
  const [showNoMessage, setShowNoMessage] = useState(false);
  const [shake, setShake] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const noMessage = useMemo(() => NO_MESSAGES[noIndex], [noIndex]);

  const triggerNo = () => {
    setShowNoMessage(true);
    setNoIndex((prev) => (prev + 1) % NO_MESSAGES.length);
    setShake(true);
    if ("vibrate" in navigator) navigator.vibrate(60);
    setTimeout(() => setShake(false), 360);
    setSliderValue(0);
  };

  const handleSlideEnd = () => {
    if (accepted) return;
    if (sliderValue <= -35) {
      triggerNo();
      return;
    }
    if (sliderValue >= 35) {
      setAccepted(true);
      return;
    }
    setSliderValue(0);
  };

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-secondary">
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
        input[type="range"].propose-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 16px;
          border-radius: 999px;
          background: linear-gradient(90deg, #fecdd3 0%, #fff 50%, #fda4af 100%);
          outline: none;
        }
        input[type="range"].propose-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 52px;
          height: 52px;
          border-radius: 999px;
          background: #e11d48;
          box-shadow: 0 12px 25px rgba(225, 29, 72, 0.35);
          border: 4px solid #fff1f2;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 21s-8-4.35-8-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.65-8 10-8 10z"/></svg>');
          background-repeat: no-repeat;
          background-position: center;
        }
        input[type="range"].propose-slider::-moz-range-thumb {
          width: 52px;
          height: 52px;
          border: 4px solid #fff1f2;
          border-radius: 999px;
          background: #e11d48;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 21s-8-4.35-8-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.65-8 10-8 10z"/></svg>');
          background-repeat: no-repeat;
          background-position: center;
        }
      `}</style>

      <BackgroundBeams className="opacity-60" />

      {accepted && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <Lottie
            animationData={confettiAnimation}
            loop
            className="h-full w-full"
          />
        </div>
      )}

      <div className="relative z-20 mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-16">
        <div
          className={`w-full rounded-[2.8rem] border border-primary/15 bg-white/85 p-8 text-center shadow-2xl shadow-primary/20 backdrop-blur-xl sm:p-12 ${
            shake ? "animate-[shake_0.36s_ease]" : ""
          }`}
          style={shake ? { animation: "shake 0.36s ease" } : undefined}
        >
          {accepted ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl text-black bg-red-200 ">
                  {message}
                </div>
              <div className="flex justify-center">
                
                <div className="w-56 sm:w-72">
                  <DotLottieReact src={teddyAnimation} loop autoplay />
                </div>
              </div>
              <p className="text-2xl font-mono text-primary-700">
                {senderName} 💘 {receiverName}
              </p>
            </div>
          ) : (
            <>
              {showNoMessage && (
                <p className="mb-3 text-sm font-semibold text-primary-600/90">
                  {receiverName}, {noMessage}
                </p>
              )}

              <div className="flex justify-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary-700">
                  <HeartHandshake className="h-4 w-4" />
                  Proposeday
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading text-primary-700">
                Hey <span className="font-accent font-bold ">{receiverName}...</span> 💌
              </h2>
              <p className="mt-2 text-sm sm:text-base font-body text-primary-600/80">
                I have something for you 💞
              </p>

              <div className="mt-6">
                <p className="text-3xl sm:text-4xl text-primary-800">
                  Will you be mine forever 💍
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <div className="w-36 h-36 sm:w-44 sm:h-44">
                    <DotLottieReact src={roseAnimation} loop autoplay />
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center justify-between text-xs font-semibold text-primary-500">
                  <span>No</span>
                  <span>Yes</span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  step="1"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  onMouseUp={handleSlideEnd}
                  onTouchEnd={handleSlideEnd}
                  className="propose-slider mt-3"
                />
              </div>

              <p className="mt-6 text-xs font-body text-primary-500/70">
                Slide the heart to choose.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proposeday;
