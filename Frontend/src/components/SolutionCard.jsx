import { useState } from 'react';

const ACCENT = {
  1: { color: '#4cd7f6', bg: 'rgba(76,215,246,0.07)', border: 'rgba(76,215,246,0.18)', label: 'Alpha' },
  2: { color: '#d0bcff', bg: 'rgba(208,188,255,0.07)', border: 'rgba(208,188,255,0.18)', label: 'Beta' },
};

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{
      position: 'relative',
      background: 'var(--bg)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid rgba(73,68,84,0.3)',
      overflow: 'hidden',
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 14px',
        background: 'rgba(73,68,84,0.15)',
        borderBottom: '1px solid rgba(73,68,84,0.2)',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: 'none',
            border: '1px solid rgba(73,68,84,0.4)',
            color: copied ? '#4ade80' : 'var(--on-surface-muted)',
            fontSize: '0.6875rem',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.04em',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {copied ? '✓ Copied' : '⎘ Copy'}
        </button>
      </div>
      <pre style={{
        padding: '1rem',
        fontSize: '0.8125rem',
        lineHeight: 1.7,
        color: '#cbc3d7',
        overflowX: 'auto',
        maxHeight: 320,
        overflowY: 'auto',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function SolutionCard({ number = 1, solution, isWinner }) {
  const accent = ACCENT[number];
  const [expanded, setExpanded] = useState(false);

  const isCode = solution && (
    solution.includes('def ') ||
    solution.includes('function ') ||
    solution.includes('```') ||
    solution.includes('return ') ||
    solution.includes('const ') ||
    solution.includes('class ')
  );

  const cleanCode = solution?.replace(/```[\w]*/g, '').replace(/```/g, '').trim();

  return (
    <div
      id={`solution-card-${number}`}
      style={{
        background: 'var(--surface-high)',
        borderRadius: 'var(--radius-xl)',
        padding: '0',
        border: `1px solid ${accent.border}`,
        boxShadow: number === 1
          ? '0 0 0 1px rgba(76,215,246,0.08), 0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(76,215,246,0.04)'
          : '0 0 0 1px rgba(208,188,255,0.08), 0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(208,188,255,0.04)',
        animation: number === 1 ? 'slideInLeft 0.6s ease both' : 'slideInRight 0.6s ease both',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease',
        flex: 1,
        minWidth: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = number === 1
          ? '0 0 0 1px rgba(76,215,246,0.25), 0 12px 48px rgba(0,0,0,0.5), 0 0 80px rgba(76,215,246,0.08)'
          : '0 0 0 1px rgba(208,188,255,0.25), 0 12px 48px rgba(0,0,0,0.5), 0 0 80px rgba(208,188,255,0.08)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = number === 1
          ? '0 0 0 1px rgba(76,215,246,0.08), 0 8px 32px rgba(0,0,0,0.4)'
          : '0 0 0 1px rgba(208,188,255,0.08), 0 8px 32px rgba(0,0,0,0.4)';
      }}
    >
      {/* Top colored bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${accent.color}, transparent)`,
        flexShrink: 0,
      }} />

      {/* Winner ribbon */}
      {isWinner && (
        <div style={{
          position: 'absolute',
          top: 16,
          right: -28,
          background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
          color: '#1a0e00',
          fontSize: '0.625rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '4px 36px',
          transform: 'rotate(45deg)',
          transformOrigin: 'center',
          boxShadow: '0 4px 12px rgba(245,158,11,0.5)',
          fontFamily: 'var(--font-body)',
          zIndex: 10,
        }}>
          Winner
        </div>
      )}

      {/* Header */}
      <div style={{
        padding: '1.25rem 1.5rem 1rem',
        borderBottom: `1px solid ${accent.border}`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-md)',
            background: accent.bg,
            border: `1px solid ${accent.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M9 9l6 6M15 9l-6 6" />
            </svg>
          </div>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--on-surface)',
              }}>
                Solution {number}
              </span>
              <span style={{
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: accent.color,
                background: accent.bg,
                border: `1px solid ${accent.border}`,
                borderRadius: 'var(--radius-full)',
                padding: '2px 8px',
                fontFamily: 'var(--font-body)',
              }}>
                {accent.label}
              </span>
              {isWinner && (
                <span style={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#1a0e00',
                  background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
                  borderRadius: 'var(--radius-full)',
                  padding: '2px 8px',
                  fontFamily: 'var(--font-body)',
                  boxShadow: '0 0 10px rgba(245,158,11,0.4)',
                }}>
                  🏆 Winner
                </span>
              )}
            </div>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--on-surface-muted)',
              fontFamily: 'var(--font-body)',
            }}>
              AI Model {number === 1 ? 'Alpha' : 'Beta'} Response
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem 1.5rem', flex: 1 }}>
        {isCode ? (
          <>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--on-surface-muted)',
              fontFamily: 'var(--font-body)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Code Solution
            </div>
            <CodeBlock code={cleanCode} />
          </>
        ) : (
          <p style={{
            fontSize: '0.9rem',
            lineHeight: 1.75,
            color: 'var(--on-surface-muted)',
            fontFamily: 'var(--font-body)',
          }}>
            {expanded || !solution || solution.length <= 300
              ? solution
              : solution.slice(0, 300) + '…'}
          </p>
        )}

        {!isCode && solution && solution.length > 300 && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              marginTop: '0.75rem',
              background: 'none',
              border: 'none',
              color: accent.color,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {expanded ? '↑ Show less' : '↓ Read more'}
          </button>
        )}
      </div>
    </div>
  );
}
