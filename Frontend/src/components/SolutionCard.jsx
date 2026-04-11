import { useState, useEffect, useMemo } from 'react';

const ACCENT = {
  1: { label: 'Mistral Response', borderColor: 'rgba(255,255,255,0.12)', headerBg: '#141414' },
  2: { label: 'Cohere Response',  borderColor: 'rgba(255,255,255,0.08)', headerBg: '#111111' },
};

// Theme detection
const isDarkMode = () => {
  const html = document.documentElement;
  const theme = html.getAttribute('data-theme');
  return !theme || theme === 'dark';
};

function StreamingCodeBlock({ code, isDark = true, isStreaming = false }) {
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
      background: isDark ? '#0a0a0a' : '#F4F4ED',
      borderRadius: 'var(--radius-md)',
      border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid #e5e5e5',
      overflow: 'hidden',
      animation: isStreaming ? (isDark ? 'streamingGlowDark 2s ease-in-out infinite' : 'streamingGlowLight 2s ease-in-out infinite') : 'none',
    }}>
      {/* Code header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        background: isDark ? '#111111' : '#FAFAF9',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #E5E5E5',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {isDark ? 
            ['#444','#3a3a3a','#333'].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))
            :
            ['#e0e0e0','#d5d5d5','#e8e8e8'].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))
          }
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {isStreaming && (
            <div style={{
              fontSize: '0.65rem',
              color: '#C96443',
              fontFamily: 'var(--font-body)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              <div style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#C96443',
                animation: 'pulse 2s infinite',
              }} />
              Streaming...
            </div>
          )}
          <button
            onClick={handleCopy}
            style={{
              background: isDark ? 'var(--button-bg, rgba(255,255,255,0.1))' : '#e5e5e5',
              border: 'none',
              color: isDark ? 'var(--button-text, var(--text-tertiary))' : '#333',
              fontSize: '0.6875rem',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.04em',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <pre style={{
        padding: '1rem',
        fontSize: '0.8125rem',
        lineHeight: 1.7,
        color: isDark ? '#b0b0b0' : '#333',
        overflowX: 'auto',
        maxHeight: 400,
        overflowY: 'auto',
        margin: 0,
        fontFamily: 'monospace',
      }}>
        <code style={{
          wordWrap: 'break-word',
          whiteSpace: 'pre-wrap',
        }}>
          {code}
          {isStreaming && <span style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            background: isDark ? 'rgba(176, 176, 176, 0.8)' : '#333',
            marginLeft: '2px',
            animation: 'cursorBlink 1s infinite',
            verticalAlign: 'text-bottom',
          }} />}
        </code>
      </pre>
    </div>
  );
}

export default function SolutionCard({ number = 1, solution, isWinner, isStreaming = false }) {
  const [isDark, setIsDark] = useState(isDarkMode());
  const accent = ACCENT[number];
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsDark(isDarkMode());
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Add streaming animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes cursorBlink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      
      @keyframes streamingGlowDark {
        0%, 100% { 
          border-color: rgba(255,255,255,0.07);
          box-shadow: 0 0 0 0 rgba(201, 100, 67, 0);
        }
        50% { 
          border-color: rgba(201, 100, 67, 0.3);
          box-shadow: 0 0 8px rgba(201, 100, 67, 0.2);
        }
      }
      
      @keyframes streamingGlowLight {
        0%, 100% { 
          border-color: #e5e5e5;
          box-shadow: 0 0 0 0 rgba(201, 100, 67, 0);
        }
        50% { 
          border-color: #C96443;
          box-shadow: 0 0 8px rgba(201, 100, 67, 0.15);
        }
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      @keyframes slideInLeft {
        from { 
          opacity: 0;
          transform: translateX(-20px);
        }
        to { 
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideInRight {
        from { 
          opacity: 0;
          transform: translateX(20px);
        }
        to { 
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  const isCode = solution && (
    solution.includes('def ') ||
    solution.includes('function ') ||
    solution.includes('```') ||
    solution.includes('return ') ||
    solution.includes('const ') ||
    solution.includes('class ') ||
    solution.includes('async ') ||
    solution.includes('=>') ||
    solution.includes('import ') ||
    solution.includes('export ')
  );

  const cleanCode = useMemo(() => {
    return solution?.replace(/```[\w]*/g, '').replace(/```/g, '').trim() || '';
  }, [solution]);

  return (
    <div
      id={`solution-card-${number}`}
      style={{
        background: isDark ? '#111111' : '#FAFAF9',
        borderRadius: 'var(--radius-lg)',
        border: isDark ? `1px solid ${accent.borderColor}` : '1px solid #E5E5E5',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        animation: number === 1 ? 'slideInLeft 0.5s ease both' : 'slideInRight 0.5s ease both',
        transition: 'border-color 0.2s',
        flex: 1,
        minWidth: 0,
        boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.20)' : '#d5d5d5';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = isDark ? accent.borderColor : '#e5e5e5';
      }}
    >
      {/* Top accent line — white for winner, subtle for loser */}
      <div style={{
        height: 2,
        background: isWinner 
          ? (isDark ? 'rgba(255,255,255,0.5)' : '#C96443')
          : (isDark ? 'rgba(255,255,255,0.08)' : '#e5e5e5'),
        flexShrink: 0,
        transition: 'background 0.3s',
      }} />

      {/* Winner label — top right corner tag */}
      {isWinner && (
        <div style={{
          position: 'absolute',
          top: 12,
          right: 0,
          background: isDark ? 'rgba(255,255,255,0.10)' : '#F4F4ED',
          border: isDark ? '1px solid rgba(255,255,255,0.18)' : '1px solid #e5e5e5',
          borderRight: 'none',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 'var(--radius-sm)',
          borderBottomLeftRadius: 'var(--radius-sm)',
          color: isDark ? '#e0e0e0' : '#333',
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
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid #e5e5e5',
        background: isDark ? accent.headerBg : '#FAFAF9',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 'var(--radius-md)',
            background: isDark ? '#1a1a1a' : '#F4F4ED',
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E5E5E5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#888" : "#999"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                color: isDark ? 'var(--text-tertiary)' : '#666',
                background: isDark ? 'var(--surface-3)' : '#F4F4ED',
                border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #E5E5E5',
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
                  color: isDark ? '#d0d0d0' : '#333',
                  background: isDark ? 'rgba(255,255,255,0.08)' : '#F4F4ED',
                  border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid #E5E5E5',
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
      <div style={{ padding: '1.125rem 1.5rem', flex: 1, overflowY: 'auto' }}>
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
              Code Solution {isStreaming && <span style={{ opacity: 0.6 }}>(streaming)</span>}
            </div>
            <StreamingCodeBlock code={cleanCode} isDark={isDark} isStreaming={isStreaming} />
          </>
        ) : (
          <>
            <div style={{
              fontSize: '0.9rem',
              lineHeight: 1.75,
              color: isDark ? 'rgba(135, 134, 127, 0.7)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              position: 'relative',
            }}>
              {expanded || !solution || solution.length <= 300
                ? solution
                : solution.slice(0, 300) + '…'}
              {isStreaming && (
                <span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1em',
                  background: isDark ? 'rgba(201, 100, 67, 0.8)' : '#C96443',
                  marginLeft: '2px',
                  marginRight: '2px',
                  animation: 'cursorBlink 1s infinite',
                  verticalAlign: 'text-bottom',
                }} />
              )}
            </div>
          </>
        )}
        
        {/* Streaming indicator */}
        {isStreaming && !isCode && (
          <div style={{
            marginTop: '0.75rem',
            fontSize: '0.75rem',
            color: isDark ? 'var(--text-tertiary)' : '#999',
            fontFamily: 'var(--font-body)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#C96443',
              animation: 'pulse 2s infinite',
            }} />
            <span>Streaming solution…</span>
          </div>
        )}

        {!isCode && solution && solution.length > 300 && !isStreaming && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              marginTop: '0.75rem',
              background: 'transparent',
              border: 'none',
              color: isDark ? 'var(--text-secondary)' : '#555',
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
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            {expanded ? '▼ Show less' : '▶ Read more'}
          </button>
        )}
      </div>
    </div>
  );
}

