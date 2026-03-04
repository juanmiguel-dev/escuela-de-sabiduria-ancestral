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
    const vectors: Vector[] = [];
    const vectorCount = 40;
    const maxLineLength = 200;

    class Vector {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      angle: number;
      opacity: number;
      color: string;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.length = Math.random() * maxLineLength + 50;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.color = Math.random() > 0.8 ? 'rgba(255, 153, 0, ' : 'rgba(0, 85, 255, '; // Mix of Blue and Orange
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around
        if (this.x < -maxLineLength) this.x = width + maxLineLength;
        if (this.x > width + maxLineLength) this.x = -maxLineLength;
        if (this.y < -maxLineLength) this.y = height + maxLineLength;
        if (this.y > height + maxLineLength) this.y = -maxLineLength;
        
        // Slightly rotate over time
        this.angle += 0.001;
      }

      draw() {
        if (!ctx) return;
        const endX = this.x + Math.cos(this.angle) * this.length;
        const endY = this.y + Math.sin(this.angle) * this.length;

        // Draw the main line
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `${this.color}${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw nodes at the ends
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.opacity * 2})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(endX, endY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.opacity * 2})`;
        ctx.fill();

        // Add a subtle cross at one end
        if (this.opacity > 0.15) {
          const crossSize = 4;
          ctx.beginPath();
          ctx.moveTo(this.x - crossSize, this.y);
          ctx.lineTo(this.x + crossSize, this.y);
          ctx.moveTo(this.x, this.y - crossSize);
          ctx.lineTo(this.x, this.y + crossSize);
          ctx.strokeStyle = `${this.color}${this.opacity * 1.5})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      vectors.length = 0;
      for (let i = 0; i < vectorCount; i++) {
        vectors.push(new Vector(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.5
      );
      gradient.addColorStop(0, 'rgba(0, 51, 160, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      vectors.forEach(v => {
        v.update(canvas.width, canvas.height);
        v.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
