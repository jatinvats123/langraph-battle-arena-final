import { useEffect, useRef } from 'react';

export default function ScoreRing({ score = 0, max = 10, color = '#4cd7f6', size = 90, isWinner = false }) {
  const circleRef = useRef(null);
  const radius = 36;
  const circumference = 2 * Math.PI * radius; // ~226
  const progress = score / max;
  const dashOffset = circumference * (1 - progress);

  useEffect(() => {
    if (!circleRef.current) return;
    // start from full offset (empty), animate to target
    circleRef.current.style.strokeDashoffset = circumference;
    const raf = requestAnimationFrame(() => {
      setTimeout(() => {
        if (circleRef.current) {
          circleRef.current.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)';
          circleRef.current.style.strokeDashoffset = dashOffset;
        }
      }, 200);
    });
    return () => cancelAnimationFrame(raf);
  }, [score, dashOffset, circumference]);

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 90 90"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx="45" cy="45" r={radius}
          fill="none"
          stroke="rgba(73,68,84,0.4)"
          strokeWidth="6"
        />
        {/* Progress */}
        <circle
          ref={circleRef}
          cx="45" cy="45" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          style={{
            filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color})`,
          }}
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
        gap: 0,
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: size > 80 ? '1.5rem' : '1.25rem',
          lineHeight: 1,
          color,
          textShadow: `0 0 12px ${color}`,
        }}>
          {score}
        </span>
        <span style={{
          fontSize: '0.625rem',
          color: 'var(--on-surface-muted)',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          /{max}
        </span>
      </div>

      {/* Winner crown */}
      {isWinner && (
        <div style={{
          position: 'absolute',
          top: -10,
          right: -6,
          background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
          borderRadius: '50%',
          width: 22,
          height: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          boxShadow: '0 0 12px rgba(245,158,11,0.6)',
          animation: 'float 3s ease-in-out infinite',
        }}>
          👑
        </div>
      )}
    </div>
  );
}
