import { ReactNode, useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export const Reveal = ({ children, direction = 'up', delay = 0 }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasRevealed(true);
    }
  }, [isInView]);

  const getTransform = () => {
    if (hasRevealed) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up': return 'translate3d(0, 40px, 0)';
      // Añadir otros casos si es necesario
      default: return 'translate3d(0, 40px, 0)';
    }
  };

  return (
    <div ref={ref} style={{ transform: getTransform(), opacity: hasRevealed ? 1 : 0, transition: `all 1s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms` }}>
      {children}
    </div>
  );
};