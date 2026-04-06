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
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '1px solid rgba(245,158,11,0.2)',
        boxShadow: '0 0 0 1px rgba(245,158,11,0.08), 0 16px 64px rgba(0,0,0,0.5), 0 0 100px rgba(245,158,11,0.04)',
        animation: 'scaleIn 0.7s ease 0.3s both',
        position: 'relative',
      }}
    >
      {/* Ambient background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{
        background: 'rgba(27,27,32,0.95)',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid rgba(245,158,11,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          {/* Judge icon */}
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))',
            border: '1px solid rgba(245,158,11,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(245,158,11,0.15)',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.125rem',
              color: 'var(--on-surface)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}>
              Judge Verdict
            </h2>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--on-surface-muted)',
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
          background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))',
          border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: 'var(--radius-full)',
          padding: '8px 16px',
          boxShadow: '0 0 20px rgba(245,158,11,0.1)',
        }}>
          <span style={{ fontSize: '1.125rem' }}>🏆</span>
          <div>
            <div style={{
              fontSize: '0.6875rem',
              color: '#F59E0B',
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
              fontSize: '0.9375rem',
              color: 'white',
              lineHeight: 1.2,
            }}>
              Solution {winner}
              <span style={{ color: '#4cd7f6', marginLeft: 4 }}>+{scoreDiff}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Score comparison bar */}
      <div style={{
        background: 'var(--surface-low)',
        padding: '1.25rem 2rem',
        borderBottom: '1px solid rgba(73,68,84,0.2)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          {/* S1 Score */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1 }}>
            <ScoreRing
              score={solution_1_score}
              color="#4cd7f6"
              size={86}
              isWinner={winner === 1}
            />
            <div>
              <div style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#4cd7f6',
                fontFamily: 'var(--font-body)',
                marginBottom: 4,
              }}>
                Solution 1 · Alpha
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.5rem',
                color: 'var(--on-surface)',
                letterSpacing: '-0.02em',
              }}>
                {solution_1_score}<span style={{ fontSize: '0.875rem', color: 'var(--on-surface-muted)', fontWeight: 400 }}>/10</span>
              </div>
              <ScoreBar score={solution_1_score} color="#4cd7f6" />
            </div>
          </div>

          {/* VS Divider */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            flexShrink: 0,
          }}>
            <div style={{ width: 1, height: 20, background: 'rgba(73,68,84,0.4)' }} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'var(--on-surface-muted)',
            }}>VS</span>
            <div style={{ width: 1, height: 20, background: 'rgba(73,68,84,0.4)' }} />
          </div>

          {/* S2 Score */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', flex: 1, justifyContent: 'flex-end' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#d0bcff',
                fontFamily: 'var(--font-body)',
                marginBottom: 4,
              }}>
                Solution 2 · Beta
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.5rem',
                color: 'var(--on-surface)',
                letterSpacing: '-0.02em',
              }}>
                {solution_2_score}<span style={{ fontSize: '0.875rem', color: 'var(--on-surface-muted)', fontWeight: 400 }}>/10</span>
              </div>
              <ScoreBar score={solution_2_score} color="#d0bcff" align="right" />
            </div>
            <ScoreRing
              score={solution_2_score}
              color="#d0bcff"
              size={86}
              isWinner={winner === 2}
            />
          </div>
        </div>
      </div>

      {/* Reasoning */}
      <div style={{
        background: 'var(--surface-mid)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
      }}>
        <ReasoningPanel
          number={1}
          color="#4cd7f6"
          bg="rgba(76,215,246,0.04)"
          reasoning={solution_1_reasoning}
          isWinner={winner === 1}
          borderRight
        />
        <ReasoningPanel
          number={2}
          color="#d0bcff"
          bg="rgba(208,188,255,0.04)"
          reasoning={solution_2_reasoning}
          isWinner={winner === 2}
        />
      </div>
    </div>
  );
}

function ScoreBar({ score, color, align = 'left' }) {
  return (
    <div style={{
      marginTop: 6,
      height: 4,
      width: 120,
      background: 'rgba(73,68,84,0.3)',
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
      marginLeft: align === 'right' ? 'auto' : undefined,
    }}>
      <div style={{
        height: '100%',
        width: `${(score / 10) * 100}%`,
        background: `linear-gradient(90deg, ${color}, ${color}88)`,
        borderRadius: 'var(--radius-full)',
        boxShadow: `0 0 6px ${color}`,
        transition: 'width 1s cubic-bezier(0.4,0,0.2,1) 0.5s',
      }} />
    </div>
  );
}

function ReasoningPanel({ number, color, bg, reasoning, isWinner, borderRight }) {
  return (
    <div style={{
      padding: '1.5rem',
      background: bg,
      borderRight: borderRight ? '1px solid rgba(73,68,84,0.2)' : undefined,
      position: 'relative',
    }}>
      {isWinner && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, #F59E0B, transparent)`,
        }} />
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: '0.875rem',
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 8px ${color}`,
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color,
          fontFamily: 'var(--font-body)',
        }}>
          Solution {number} Reasoning
        </span>
        {isWinner && (
          <span style={{
            fontSize: '0.625rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
            color: '#1a0e00',
            borderRadius: 'var(--radius-full)',
            padding: '1px 7px',
            fontFamily: 'var(--font-body)',
          }}>
            WINNER
          </span>
        )}
      </div>

      <p style={{
        fontSize: '0.875rem',
        lineHeight: 1.75,
        color: 'var(--on-surface-muted)',
        fontFamily: 'var(--font-body)',
      }}>
        {reasoning}
      </p>
    </div>
  );
}
