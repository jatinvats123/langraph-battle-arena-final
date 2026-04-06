export default function ProblemCard({ problem }) {
  return (
    <div
      id="problem-card"
      style={{
        background: 'var(--surface-mid)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem 2rem',
        border: '1px solid rgba(73,68,84,0.3)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        animation: 'fadeInUp 0.5s ease both',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top glow line */}
      <div style={{
        position: 'absolute',
        top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(76,215,246,0.5), rgba(208,188,255,0.5), transparent)',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
        {/* Icon */}
        <div style={{
          width: 42,
          height: 42,
          borderRadius: 'var(--radius-md)',
          background: 'rgba(76,215,246,0.1)',
          border: '1px solid rgba(76,215,246,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4cd7f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
          </svg>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#4cd7f6',
              fontFamily: 'var(--font-body)',
            }}>
              Problem Statement
            </span>
            <div style={{
              height: 1,
              flex: 1,
              background: 'linear-gradient(90deg, rgba(76,215,246,0.3), transparent)',
            }} />
          </div>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: '1.0625rem',
            color: 'var(--on-surface)',
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
          }}>
            {problem}
          </p>
        </div>
      </div>
    </div>
  );
}
