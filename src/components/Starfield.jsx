import { useMemo } from 'react';
import './Starfield.css';

const COUNT = 150;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: COUNT }, (_, i) => {
      const maxOpacity = rand(0.1, 0.5);
      return {
        id: i,
        left: `${rand(0, 100)}%`,
        top: `${rand(0, 100)}%`,
        size: rand(1, 1.5),
        duration: `${rand(2, 6).toFixed(2)}s`,
        delay: `-${rand(0, 6).toFixed(2)}s`,
        maxOpacity: maxOpacity.toFixed(2),
        minOpacity: (maxOpacity * 0.15).toFixed(2),
      };
    });
  }, []);

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: s.duration,
            animationDelay: s.delay,
            '--max-opacity': s.maxOpacity,
            '--min-opacity': s.minOpacity,
          }}
        />
      ))}
    </div>
  );
}
