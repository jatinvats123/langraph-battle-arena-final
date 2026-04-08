import { useState } from 'react';

const ACCENT = {
  1: { label: 'Mistral Response', borderColor: 'rgba(255,255,255,0.12)', headerBg: '#141414' },
  2: { label: 'Cohere Response',  borderColor: 'rgba(255,255,255,0.08)', headerBg: '#111111' },
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
      background: '#0a0a0a',
      borderRadius: 'var(--radius-md)',
      border: '1px solid rgba(255,255,255,0.07)',
      overflow: 'hidden',
    }}>
      {/* Code header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        background: '#111111',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#444','#3a3a3a','#333'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: 'var(--button-bg, rgba(255,255,255,0.1))',
            border: 'none',
            color: 'var(--button-text, var(--text-tertiary))',
            fontSize: '0.6875rem',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.04em',
            transition: 'all 0.2s',
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre style={{
        padding: '1rem',
        fontSize: '0.8125rem',
        lineHeight: 1.7,
        color: '#b0b0b0',
        overflowX: 'auto',
        maxHeight: 300,
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
        background: '#111111',
        borderRadius: 'var(--radius-lg)',
        border: `1px solid ${accent.borderColor}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        animation: number === 1 ? 'slideInLeft 0.5s ease both' : 'slideInRight 0.5s ease both',
        transition: 'border-color 0.2s',
        flex: 1,
        minWidth: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = accent.borderColor;
      }}
    >
      {/* Top accent line — white for winner, subtle for loser */}
      <div style={{
        height: 2,
        background: isWinner ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.08)',
        flexShrink: 0,
        transition: 'background 0.3s',
      }} />

      {/* Winner label — top right corner tag */}
      {isWinner && (
        <div style={{
          position: 'absolute',
          top: 12,
          right: 0,
          background: 'rgba(255,255,255,0.10)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRight: 'none',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 'var(--radius-sm)',
          borderBottomLeftRadius: 'var(--radius-sm)',
          color: '#e0e0e0',
          fontSize: '0.625rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '4px 12px 4px 10px',
          fontFamily: 'var(--font-body)',
          zIndex: 10,
        }}>
          Winner
        </div>
      )}

      {/* Header */}
      <div style={{
        padding: '1.125rem 1.5rem 0.875rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: accent.headerBg,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 'var(--radius-md)',
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M9 9l6 6M15 9l-6 6" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.9375rem',
                color: 'var(--text-primary)',
              }}>
                Solution {number}
              </span>
              <span style={{
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                background: 'var(--surface-3)',
                border: '1px solid rgba(255,255,255,0.08)',
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
                  color: '#d0d0d0',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 'var(--radius-full)',
                  padding: '2px 8px',
                  fontFamily: 'var(--font-body)',
                }}>
                  ✓ Winner
                </span>
              )}
            </div>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              fontFamily: 'var(--font-body)',
            }}>
              AI Model {number === 1 ? 'Alpha' : 'Beta'} Response
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.125rem 1.5rem', flex: 1 }}>
        {isCode ? (
          <>
            <div style={{
              fontSize: '0.6875rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-tertiary)',
              fontFamily: 'var(--font-body)',
              marginBottom: '0.625rem',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            color: 'var(--text-secondary)',
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
              background: 'var(--button-bg, transparent)',
              border: 'none',
              color: 'var(--button-text, var(--text-secondary))',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              padding: '6px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              borderRadius: 'var(--radius-full)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  );
}
