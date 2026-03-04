"use client";

import React, { useEffect, useRef } from 'react';

export const TechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let scrollOffset = 0;
    const speed = 0.25;
    const gridSize = 45;
    const dotSize = 1.3;
    const lineOpacity = 0.08;
    const dotOpacity = 0.15;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      scrollOffset = (scrollOffset + speed) % gridSize;

      for (let y = -gridSize; y < canvas.height + gridSize; y += gridSize) {
        const yPos = y - scrollOffset;
        const perspective = Math.max(0, yPos / canvas.height);

        for (let x = -gridSize; x < canvas.width + gridSize; x += gridSize) {
          // Dibuja los puntos
          ctx.beginPath();
          ctx.arc(x, yPos, dotSize * perspective, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 85, 255, ${dotOpacity + perspective * 0.4})`;
          ctx.fill();

          // Dibuja las líneas horizontales
          if (x < canvas.width) {
            ctx.beginPath();
            ctx.moveTo(x, yPos);
            ctx.lineTo(x + gridSize, yPos);
            ctx.strokeStyle = `rgba(0, 85, 255, ${lineOpacity + perspective * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Dibuja las líneas verticales
          if (y < canvas.height) {
            ctx.beginPath();
            ctx.moveTo(x, yPos);
            ctx.lineTo(x, yPos + gridSize);
            ctx.strokeStyle = `rgba(0, 85, 255, ${lineOpacity + perspective * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};
