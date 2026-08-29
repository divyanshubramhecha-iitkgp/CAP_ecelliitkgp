"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  const handleEnter = () => {
    setIsEntering(true);
  };

  useEffect(() => {
    if (isEntering) {
      const timer = setTimeout(() => {
        setShowLogo(true);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onEnter();
          }, 3000);
        }, 1000);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isEntering, onEnter]);

  return (
    <div
      onClick={() => {
        if (!isEntering) handleEnter();
      }}
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-all duration-[3000ms] overflow-hidden cursor-pointer ${
        isExiting ? 'opacity-0 pointer-events-none scale-110' : 'opacity-100'
      }`}
    >
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/submit-to-dom.webp')] bg-cover bg-center bg-no-repeat z-0"></div>
      
      {/* Dark gradient overlay to ensure text visibility but keep image clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-0"></div>

      {isEntering ? (
        <>
          {/* Black background for logo presentation */}
          <div className={`absolute inset-0 bg-black z-10 transition-opacity duration-1000 ${showLogo ? 'opacity-100' : 'opacity-0'}`}></div>
          
          <img
            src="/CAP_1.png"
            alt="Intro"
            className={`absolute top-1/2 left-1/2 w-full h-full object-cover z-20 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${showLogo ? 'opacity-0' : 'opacity-100'}`}
          />
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut"
                }}
                className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
              >
                <motion.div 
                  animate={{
                    filter: [
                      "drop-shadow(0 0 25px rgba(16,185,129,0.4))", 
                      "drop-shadow(0 0 50px rgba(16,185,129,0.9))", 
                      "drop-shadow(0 0 25px rgba(16,185,129,0.4))"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-80 h-80 md:w-[28rem] md:h-[28rem]"
                >
                  <Image
                    src="/e_cell_logo.png"
                    alt="E-Cell IIT KGP Logo"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-center select-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEnter();
            }}
            className="group relative flex flex-col items-center justify-center focus:outline-none cursor-pointer"
            aria-label="Tap to Enter"
          >
            {/* Green Circle Ring */}
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-[3px] border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)] group-hover:bg-emerald-500/15 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.9)] transition-all duration-300 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-emerald-500 duration-1000"></div>
            </div>

            {/* Green Text */}
            <span className="mt-4 text-emerald-500 font-extrabold tracking-[0.2em] text-xs md:text-sm uppercase drop-shadow-[0_0_10px_rgba(16,185,129,0.9)] group-hover:text-emerald-400 transition-colors">
              TAP TO ENTER
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
