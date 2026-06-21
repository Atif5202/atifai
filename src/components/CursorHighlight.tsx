import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CursorHighlight() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Motion values to keep track of mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics variables for organic, delayed smooth-following behavior
  const springConfig = { damping: 32, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Completely disable on mobile/touch interfaces (where no pointer is present)
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    if (mediaQuery.matches) return;

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Global delegation observer to identify hover states on target interactive nodes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest(".interactive-hover") ||
        target.closest(".rounded-2xl") || // Cards
        target.closest(".rounded-3xl") || // Cards
        target.closest("[onClick]");

      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      id="custom-premium-cursor"
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* 1. Ambient Background Glow Aura (Without any solid center dot) */}
      <motion.div
        className="absolute rounded-full bg-blue-500/5 dark:bg-cyan-500/5 blur-[12px]"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: isClicking ? 0.7 : isHovered ? 2.2 : 1.2,
          opacity: isHovered ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: "40px",
          height: "40px",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%"
        }}
      />

      {/* 2. Premium Reticle Frame (4 bracket corners) */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          width: isClicking ? "20px" : isHovered ? "36px" : "28px",
          height: isClicking ? "20px" : isHovered ? "36px" : "28px",
          rotate: isClicking ? -45 : isHovered ? 90 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
      >
        {/* Top Left Bracket */}
        <motion.span
          className="absolute top-0 left-0 w-2 h-2 border-t border-l"
          animate={{
            borderColor: isHovered
              ? "rgba(14, 165, 233, 0.9)" // Cyan on hover
              : "rgba(59, 130, 246, 0.5)", // Blue normally
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Top Right Bracket */}
        <motion.span
          className="absolute top-0 right-0 w-2 h-2 border-t border-r"
          animate={{
            borderColor: isHovered
              ? "rgba(14, 165, 233, 0.9)"
              : "rgba(59, 130, 246, 0.5)",
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Bottom Left Bracket */}
        <motion.span
          className="absolute bottom-0 left-0 w-2 h-2 border-b border-l"
          animate={{
            borderColor: isHovered
              ? "rgba(14, 165, 233, 0.9)"
              : "rgba(59, 130, 246, 0.5)",
          }}
          transition={{ duration: 0.2 }}
        />
        {/* Bottom Right Bracket */}
        <motion.span
          className="absolute bottom-0 right-0 w-2 h-2 border-b border-r"
          animate={{
            borderColor: isHovered
              ? "rgba(14, 165, 233, 0.9)"
              : "rgba(59, 130, 246, 0.5)",
          }}
          transition={{ duration: 0.2 }}
        />

        {/* 3. Subtle Precision Center cross "+" instead of a classic dot */}
        <motion.div
          className="absolute flex items-center justify-center text-blue-600 dark:text-cyan-400"
          animate={{
            scale: isClicking ? 0 : isHovered ? 1.4 : 1,
            opacity: isClicking ? 0 : 1,
            rotate: isHovered ? -90 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          >
            <path d="M4 1V7M1 4H7" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
