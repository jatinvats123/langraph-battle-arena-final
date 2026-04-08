import { useEffect, useRef } from 'react';

export default function ScoreRing({ score = 0, max = 10, size = 86, isWinner = false }) {
  const circleRef = useRef(null);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = score / max;
  const dashOffset = circumference * (1 - progress);

  const strokeColor = isWinner ? '#c8c8c8' : '#555555';

  useEffect(() => {
    if (!circleRef.current) return;
    circleRef.current.style.strokeDashoffset = circumference;
    const raf = requestAnimationFrame(() => {
      setTimeout(() => {
        if (circleRef.current) {
          circleRef.current.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(0.4,0,0.2,1)';
          circleRef.current.style.strokeDashoffset = dashOffset;
        }
      }, 200);
    });
    return () => cancelAnimationFrame(raf);
  }, [score, dashOffset, circumference]);

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle cx="45" cy="45" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
        {/* Progress */}
        <circle
          ref={circleRef}
          cx="45" cy="45" r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </svg>
      {/* Score text */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: size > 80 ? '1.375rem' : '1.125rem',
          lineHeight: 1,
          color: isWinner ? '#e8e8e8' : '#888',
        }}>
          {score}
        </span>
        <span style={{
          fontSize: '0.575rem',
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginTop: 1,
        }}>
          /{max}
        </span>
      </div>
    </div>
  );
}
