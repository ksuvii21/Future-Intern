"use client";

import React, { useRef, useEffect } from "react";

export default function Squares() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const mouse = { x: 0, y: 0 };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      // FIX BLUR ON HIGH DPI SCREENS
      const dpr = window.devicePixelRatio || 1;
      
      // SET REAL CANVAS RESOLUTION
      canvas.width = parent.offsetWidth * dpr;
      canvas.height = parent.offsetHeight * dpr;

      canvas.style.width = parent.offsetWidth + "px";
      canvas.style.height = parent.offsetHeight + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const squareSize = 35; // For premium hero use

    let animationFrameId;
    function draw() {
      const logicalWidth = canvas.offsetWidth;
      const logicalHeight = canvas.offsetHeight;
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      for (let x = 0; x < logicalWidth; x += squareSize) {
        for (let y = 0; y < logicalHeight; y += squareSize) {

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const opacity = Math.max(0.1, 1 - dist / 200);

          ctx.strokeStyle = `rgba(59,130,246,${opacity * 0.5})`;
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
      }}
    />
  );
}
