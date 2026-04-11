import { useState, useEffect } from 'react';
import ScoreRing from './ScoreRing';

// Theme detection
const isDarkMode = () => {
  const html = document.documentElement;
  const theme = html.getAttribute('data-theme');
  return !theme || theme === 'dark';
};

export default function JudgeVerdict({ judge }) {
  const [isDark, setIsDark] = useState(isDarkMode());
  
  useEffect(() => {
    const checkTheme = () => setIsDark(isDarkMode());
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Handle case when judge is not yet available
  if (!judge) {
    return null;
  }

  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;
  
  // Handle incomplete judge data
  if (solution_1_score === undefined || solution_2_score === undefined) {
    return (
      <div
        id="judge-verdict"
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid #E5E5E5',
          padding: '2rem',
          textAlign: 'center',
          background: isDark ? '#101010' : '#FAFAF9',
          boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#C96443',
            animation: 'pulse 2s infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            letterSpacing: '-0.01em',
          }}>
            Judge verdict pending…
          </span>
        </div>
      </div>
    );
  }

  const winner = solution_1_score >= solution_2_score ? 1 : 2;
  const winnerScore = Math.max(solution_1_score, solution_2_score);
  const loserScore = Math.min(solution_1_score, solution_2_score);
  const scoreDiff = winnerScore - loserScore;

  return (
    <div
      id="judge-verdict"
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid #E5E5E5',
        animation: 'scaleIn 0.6s ease 0.3s both',
        boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)',
      }}
    >
      {/* Header */}
      <div style={{
        background: isDark ? '#131313' : '#FAFAF9',
        padding: '1.125rem 1.75rem',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid #E5E5E5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Judge icon */}
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-md)',
            background: isDark ? '#1c1c1c' : '#F4F4ED',
            border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid #E5E5E5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#888" : "#999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}>
              Judge Verdict
            </h2>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              fontFamily: 'var(--font-body)',
            }}>
              AI-powered comparative evaluation
            </span>
          </div>
        </div>

        {/* Winner badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: isDark ? 'rgba(255,255,255,0.06)' : '#F4F4ED',
          border: isDark ? '1px solid rgba(255,255,255,0.14)' : '1px solid #E5E5E5',
          borderRadius: 'var(--radius-full)',
          padding: '7px 16px',
        }}>
          <span style={{ fontSize: '1rem' }}>✓</span>
          <div>
            <div style={{
              fontSize: '0.6875rem',
              color: 'var(--text-tertiary)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              lineHeight: 1,
            }}>
              Winner
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}>
              Solution {winner}
              <span style={{ color: 'var(--text-tertiary)', marginLeft: 4, fontWeight: 400, fontSize: '0.8rem' }}>+{scoreDiff}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Score row */}
      <div style={{
        background: isDark ? '#101010' : '#FAFAF9',
        padding: '1.25rem 1.75rem',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E5E5E5',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>

          {/* S1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1 }}>
            <ScoreRing score={solution_1_score} size={86} isWinner={winner === 1} />
            <div>
              <div style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-body)',
                marginBottom: 4,
              }}>
                Solution 1 · Alpha
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.5rem',
                color: winner === 1 ? '#e0e0e0' : '#666',
                letterSpacing: '-0.02em',
              }}>
                {solution_1_score}
                <span style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: 400 }}>/10</span>
              </div>
              <ScoreBar score={solution_1_score} isWinner={winner === 1} isDark={isDark} />
            </div>
          </div>

          {/* VS */}
          <div style={{ flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0, display: 'flex' }}>
            <div style={{ width: 1, height: 18, background: isDark ? 'rgba(255,255,255,0.07)' : '#E5E5E5' }} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.8125rem',
              color: 'var(--text-tertiary)',
            }}>VS</span>
            <div style={{ width: 1, height: 18, background: isDark ? 'rgba(255,255,255,0.07)' : '#E5E5E5' }} />
          </div>

          {/* S2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1, justifyContent: 'flex-end' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-body)',
                marginBottom: 4,
              }}>
                Solution 2 · Beta
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.5rem',
                color: winner === 2 ? '#e0e0e0' : '#666',
                letterSpacing: '-0.02em',
              }}>
                {solution_2_score}
                <span style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: 400 }}>/10</span>
              </div>
              <ScoreBar score={solution_2_score} isWinner={winner === 2} align="right" isDark={isDark} />
            </div>
            <ScoreRing score={solution_2_score} size={86} isWinner={winner === 2} />
          </div>

        </div>
      </div>

      {/* Reasoning */}
      <div style={{ background: isDark ? '#0f0f0f' : '#FAFAF9', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <ReasoningPanel number={1} reasoning={solution_1_reasoning} isWinner={winner === 1} borderRight isDark={isDark} />
        <ReasoningPanel number={2} reasoning={solution_2_reasoning} isWinner={winner === 2} isDark={isDark} />
      </div>
    </div>
  );
}

function ScoreBar({ score, isWinner, align = 'left', isDark = true }) {
  return (
    <div style={{
      marginTop: 6,
      height: 3,
      width: 110,
      background: isDark ? 'rgba(255,255,255,0.06)' : '#e5e5e5',
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
      marginLeft: align === 'right' ? 'auto' : undefined,
    }}>
      <div style={{
        height: '100%',
        width: `${(score / 10) * 100}%`,
        background: isWinner ? (isDark ? 'rgba(255,255,255,0.55)' : '#C96443') : (isDark ? 'rgba(255,255,255,0.18)' : '#d5d5d5'),
        borderRadius: 'var(--radius-full)',
        transition: 'width 1s cubic-bezier(0.4,0,0.2,1) 0.5s',
      }} />
    </div>
  );
}

function ReasoningPanel({ number, reasoning, isWinner, borderRight, isDark = true }) {
  return (
    <div style={{
      padding: '1.25rem 1.5rem',
      background: isWinner ? (isDark ? 'rgba(255,255,255,0.02)' : '#F4F4ED') : 'transparent',
      borderRight: borderRight ? (isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid #E5E5E5') : undefined,
      position: 'relative',
    }}>
      {/* Top accent line for winner */}
      {isWinner && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 1,
          background: isDark ? 'rgba(255,255,255,0.15)' : '#E5E5E5',
        }} />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
        <div style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: isWinner ? (isDark ? '#aaa' : '#999') : (isDark ? '#444' : '#d5d5d5'),
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: isWinner ? (isDark ? '#999' : '#666') : 'var(--text-tertiary)',
          fontFamily: 'var(--font-body)',
        }}>
          Solution {number} Reasoning
        </span>
        {isWinner && (
          <span style={{
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: isDark ? '#aaa' : '#666',
            background: isDark ? 'rgba(255,255,255,0.08)' : '#F4F4ED',
            border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid #E5E5E5',
            borderRadius: 'var(--radius-full)',
            padding: '1px 7px',
            fontFamily: 'var(--font-body)',
            textTransform: 'uppercase',
          }}>
            Winner
          </span>
        )}
      </div>

      <p style={{
        fontSize: '0.875rem',
        lineHeight: 1.75,
        color: isDark ? 'rgba(135, 134, 127, 0.7)' : 'var(--text-secondary)',
        fontFamily: 'var(--font-body)',
      }}>
        {reasoning}
      </p>
    </div>
  );
}
