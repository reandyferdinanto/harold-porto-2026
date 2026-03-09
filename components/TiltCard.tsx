'use client';

import { useRef, useCallback, ReactNode, MouseEvent } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  scale?: number;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 12,
  glareOpacity = 0.15,
  scale = 1.02,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const glare = glareRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

      if (glare) {
        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;
        glare.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`;
        glare.style.opacity = '1';
      }
    },
    [maxTilt, glareOpacity, scale],
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (card) card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glare) glare.style.opacity = '0';
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={glareRef} className="tilt-card-glare" />
      {children}
    </div>
  );
}
