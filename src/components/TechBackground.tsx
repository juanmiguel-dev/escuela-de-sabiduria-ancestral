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
        this.opacity = Math.random() * 0.2 + 0.1;
        this.color = 'rgba(0, 85, 255, '; // Blue for lines
        this.nodeColor = 'rgba(0, 230, 184, '; // Teal for nodes
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
        ctx.strokeStyle = `${this.color}${this.opacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Draw square nodes at the ends with glow
        const nodeSize = 6;
        ctx.shadowColor = this.nodeColor + `0.7)`;
        ctx.shadowBlur = 10;
        
        ctx.strokeStyle = `${this.nodeColor}${this.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(this.x - nodeSize / 2, this.y - nodeSize / 2, nodeSize, nodeSize);
        ctx.strokeRect(endX - nodeSize / 2, endY - nodeSize / 2, nodeSize, nodeSize);

        // Reset shadow for other elements
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
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
      
      // No background glow needed, handled by CSS

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
