import ScoreRing from './ScoreRing';

export default function JudgeVerdict({ judge }) {
  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;
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
        border: '1px solid rgba(255,255,255,0.10)',
        animation: 'scaleIn 0.6s ease 0.3s both',
      }}
    >
      {/* Header */}
      <div style={{
        background: '#131313',
        padding: '1.125rem 1.75rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
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
            background: '#1c1c1c',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.14)',
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
        background: '#101010',
        padding: '1.25rem 1.75rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
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
              <ScoreBar score={solution_1_score} isWinner={winner === 1} />
            </div>
          </div>

          {/* VS */}
          <div style={{ flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0, display: 'flex' }}>
            <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.07)' }} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.8125rem',
              color: 'var(--text-tertiary)',
            }}>VS</span>
            <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.07)' }} />
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
              <ScoreBar score={solution_2_score} isWinner={winner === 2} align="right" />
            </div>
            <ScoreRing score={solution_2_score} size={86} isWinner={winner === 2} />
          </div>

        </div>
      </div>

      {/* Reasoning */}
      <div style={{ background: '#0f0f0f', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <ReasoningPanel number={1} reasoning={solution_1_reasoning} isWinner={winner === 1} borderRight />
        <ReasoningPanel number={2} reasoning={solution_2_reasoning} isWinner={winner === 2} />
      </div>
    </div>
  );
}

function ScoreBar({ score, isWinner, align = 'left' }) {
  return (
    <div style={{
      marginTop: 6,
      height: 3,
      width: 110,
      background: 'rgba(255,255,255,0.06)',
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
      marginLeft: align === 'right' ? 'auto' : undefined,
    }}>
      <div style={{
        height: '100%',
        width: `${(score / 10) * 100}%`,
        background: isWinner ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.18)',
        borderRadius: 'var(--radius-full)',
        transition: 'width 1s cubic-bezier(0.4,0,0.2,1) 0.5s',
      }} />
    </div>
  );
}

function ReasoningPanel({ number, reasoning, isWinner, borderRight }) {
  return (
    <div style={{
      padding: '1.25rem 1.5rem',
      background: isWinner ? 'rgba(255,255,255,0.02)' : 'transparent',
      borderRight: borderRight ? '1px solid rgba(255,255,255,0.05)' : undefined,
      position: 'relative',
    }}>
      {/* Top accent line for winner */}
      {isWinner && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 1,
          background: 'rgba(255,255,255,0.15)',
        }} />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
        <div style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: isWinner ? '#aaa' : '#444',
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: isWinner ? '#999' : 'var(--text-tertiary)',
          fontFamily: 'var(--font-body)',
        }}>
          Solution {number} Reasoning
        </span>
        {isWinner && (
          <span style={{
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#aaa',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
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
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-body)',
      }}>
        {reasoning}
      </p>
    </div>
  );
}
