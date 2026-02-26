import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from "framer-motion";

const GridBackground = () => {
  const gridRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      // For parallax
      mouseX.set((clientX - window.innerWidth / 2) / 20);
      mouseY.set((clientY - window.innerHeight / 2) / 20);

      // For radial glow
      if (gridRef.current) {
        gridRef.current.style.setProperty("--x", `${clientX}px`);
        gridRef.current.style.setProperty("--y", `${clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={gridRef}
      className="interactive-grid-background"
      style={{
        x: smoothX,
        y: smoothY,
        backgroundImage: `
          radial-gradient(circle at var(--x) var(--y), rgba(59, 130, 246, 0.15), transparent 300px),
          linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
};

export default GridBackground;