"use client";

import { useEffect, useRef } from "react";

interface RomanticCanvasProps {
  activeGame?: "task1" | "none";
  onTask1HeartCaught?: () => void;
  successBlastTrigger?: number;
  customBurstTrigger?: { x: number; y: number; isGold?: boolean } | null;
}

export function RomanticCanvas({
  activeGame = "none",
  onTask1HeartCaught,
  successBlastTrigger = 0,
  customBurstTrigger = null,
}: RomanticCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Use refs to pass values into the animation loop without restarting useEffect
  const activeGameRef = useRef(activeGame);
  activeGameRef.current = activeGame;

  const onTask1HeartCaughtRef = useRef(onTask1HeartCaught);
  onTask1HeartCaughtRef.current = onTask1HeartCaught;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles: HeartParticle[] = [];
    let targets: TargetHeart[] = [];

    // Track mouse
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    class HeartParticle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      life: number;
      decay: number;
      isBurst: boolean;
      isGold: boolean;
      color: string;
      shadowColor: string;
      shadowBlur: number;

      constructor(x?: number, y?: number, isBurst = false, isGold = false) {
        this.x = x ?? Math.random() * width;
        this.y = y ?? Math.random() * height + height;
        this.size = Math.random() * 15 + 5;
        this.speedY = Math.random() * -2 - 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.life = 1;
        this.decay = isBurst ? Math.random() * 0.03 + 0.01 : 0;
        this.isBurst = isBurst;
        this.isGold = isGold;

        if (isBurst) {
          this.speedY = (Math.random() - 0.5) * 16;
          this.speedX = (Math.random() - 0.5) * 16;
        }

        if (isGold) {
          this.color = "rgba(255, 215, 0, 1)";
          this.shadowColor = "#ffd700";
          this.shadowBlur = 20;
        } else {
          const r = 255;
          const g = Math.floor(Math.random() * 80 + 20);
          const b = Math.floor(Math.random() * 100 + 120);
          this.color = `rgba(${r}, ${g}, ${b}, 0.85)`;
          this.shadowColor = "#ff3366";
          this.shadowBlur = 10;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.life;
        c.fillStyle = this.color;
        c.shadowColor = this.shadowColor;
        c.shadowBlur = this.shadowBlur;
        c.beginPath();
        const d = this.size;
        c.moveTo(this.x, this.y + d / 4);
        c.quadraticCurveTo(this.x, this.y, this.x + d / 4, this.y);
        c.quadraticCurveTo(this.x + d / 2, this.y, this.x + d / 2, this.y + d / 4);
        c.quadraticCurveTo(this.x + d / 2, this.y + d / 2, this.x, this.y + d);
        c.quadraticCurveTo(this.x - d / 2, this.y + d / 2, this.x - d / 2, this.y + d / 4);
        c.quadraticCurveTo(this.x - d / 2, this.y, this.x - d / 4, this.y);
        c.quadraticCurveTo(this.x, this.y, this.x, this.y + d / 4);
        c.fill();
        c.restore();
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (!this.isBurst) {
          const dx = mouseX - this.x;
          this.x += dx * 0.001;
        }
        this.life -= this.decay;
        if (this.y < -50 && !this.isBurst) {
          this.y = height + 50;
          this.x = Math.random() * width;
        }
      }
    }

    class TargetHeart {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.size = 30;
        this.x = Math.random() * (width - 100) + 50;
        this.y = Math.random() * (height - 100) + 50;
        this.speedX = (Math.random() - 0.5) * 6;
        this.speedY = (Math.random() - 0.5) * 6;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        const pulse = Math.sin(Date.now() / 150) * 5;
        c.fillStyle = "#FFD700";
        c.shadowColor = "#FFFFFF";
        c.shadowBlur = 25 + pulse;
        c.beginPath();
        const d = this.size + (pulse > 0 ? pulse : 0);
        c.moveTo(this.x, this.y + d / 4);
        c.quadraticCurveTo(this.x, this.y, this.x + d / 4, this.y);
        c.quadraticCurveTo(this.x + d / 2, this.y, this.x + d / 2, this.y + d / 4);
        c.quadraticCurveTo(this.x + d / 2, this.y + d / 2, this.x, this.y + d);
        c.quadraticCurveTo(this.x - d / 2, this.y + d / 2, this.x - d / 2, this.y + d / 4);
        c.quadraticCurveTo(this.x - d / 2, this.y, this.x - d / 4, this.y);
        c.quadraticCurveTo(this.x, this.y, this.x, this.y + d / 4);
        c.fill();
        c.restore();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 20 || this.x > width - 20) this.speedX *= -1;
        if (this.y < 20 || this.y > height - 20) this.speedY *= -1;
      }
    }

    // Populate ambient particles
    for (let i = 0; i < 40; i++) {
      particles.push(new HeartParticle());
    }

    // Populate targets if task1 is active
    const syncTargets = () => {
      if (activeGameRef.current === "task1") {
        if (targets.length === 0) {
          for (let i = 0; i < 3; i++) {
            targets.push(new TargetHeart());
          }
        }
      } else {
        targets = [];
      }
    };
    syncTargets();

    const createBurst = (x: number, y: number, amount: number, isGold = false) => {
      for (let i = 0; i < amount; i++) {
        particles.push(new HeartParticle(x, y, true, isGold));
      }
    };

    const handleWindowClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        // Skip bursting on interactive buttons or UI blocks
        if (
          e.target.closest("button") ||
          e.target.closest("input") ||
          e.target.closest(".interactive-ui") ||
          e.target.id === "giant-heart"
        ) {
          return;
        }
      }

      createBurst(e.clientX, e.clientY, 12, false);

      if (activeGameRef.current === "task1") {
        for (let i = targets.length - 1; i >= 0; i--) {
          const t = targets[i];
          const dist = Math.hypot(e.clientX - t.x, e.clientY - t.y);
          if (dist < t.size + 40) {
            createBurst(t.x, t.y, 40, true);
            targets.splice(i, 1);
            onTask1HeartCaughtRef.current?.();
            break;
          }
        }
      }
    };
    window.addEventListener("click", handleWindowClick);

    const handleRomanticBlast = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) return;
      createBurst(detail.x, detail.y, detail.amount, detail.isGold);
    };
    window.addEventListener("romantic-blast", handleRomanticBlast);

    // Expose a way to fire bursts from triggers
    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Sync targets state
      syncTargets();

      // Update & Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Update & Draw targets (task 1 golden hearts)
      if (activeGameRef.current === "task1") {
        for (let i = 0; i < targets.length; i++) {
          targets[i].update();
          targets[i].draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleWindowClick);
      window.removeEventListener("romantic-blast", handleRomanticBlast);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle successBlastTrigger and customBurstTrigger in another effect
  useEffect(() => {
    if (successBlastTrigger > 0 && canvasRef.current) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const event = new CustomEvent("romantic-blast", {
        detail: { x: width / 2, y: height / 2, amount: 250, isGold: true },
      });
      window.dispatchEvent(event);
    }
  }, [successBlastTrigger]);

  useEffect(() => {
    if (customBurstTrigger && canvasRef.current) {
      const event = new CustomEvent("romantic-blast", {
        detail: {
          x: customBurstTrigger.x,
          y: customBurstTrigger.y,
          amount: 15,
          isGold: customBurstTrigger.isGold ?? false,
        },
      });
      window.dispatchEvent(event);
    }
  }, [customBurstTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
